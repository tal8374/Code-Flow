import {SymbolicSubstitutionHandler} from './symbolic-substitution-handler';
import {getGlobalVariables, updateLocalVariable} from '../common';

class IfStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
        this.localVariables = {};
    }

    doSymbolicSubstitution() {
        this.handleDeclaration();
        this.initializeLocalVariables();
        this.testConditionSymbolicSubstitution();
        this.handleElseIf();
    }

    handleElseIf() {
        if(!this.payload.elseIf)
            return;

        let symbolicSubstitution = new SymbolicSubstitutionHandler([this.payload.elseIf], this);
        symbolicSubstitution.doSymbolicSubstitution();
    }

    testConditionSymbolicSubstitution() {
        let globalVariables = this.getGlobalVariables();
        this.payload.subsitutedValues = this.payload.test;
        for(let globalVariable in globalVariables) {
            this.payload.subsitutedValues = this.payload.subsitutedValues.replace(new RegExp(globalVariable, 'g'), globalVariables[globalVariable])
        }
    }

    initializeLocalVariables() {
        let body = this.payload.body;

        for (let i = 0; i < body.length; i++) {
            let payload = body[i];
            let type = payload.type;

            if (this.handlers[type]) {
                updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), this.getParams());
            }
            else {
                let symbolicSubstitution = new SymbolicSubstitutionHandler([payload], this);
                symbolicSubstitution.doSymbolicSubstitution();
            }
        }
    }

    getGlobalVariables() {
        return getGlobalVariables(this.wrapper, this.getParams());
    }

    getLocalVariables() {
        return this.localVariables;
    }

    getWrapperParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

    getParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

    handleDeclaration() {
        if (!this.payload.declaration || !this.payload.declaration.condition)
            return;
        let payload = {};
        payload.value = this.payload.declaration.condition;
        updateLocalVariable(payload, Object.assign({}, this.localVariables), this.getGlobalVariables(), this.getParams());
        this.payload.declaration.originalCondition = this.payload.declaration.condition;
        this.payload.declaration.condition = payload.value;
    }

}

IfStatement.prototype.handlers = {
    'VariableDeclaration': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

export {IfStatement};
