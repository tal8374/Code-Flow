import {SymbolicSubstitutionHandler} from './symbolic-substitution-handler';
import {getGlobalVariables, updateLocalVariable} from '../common';

class FunctionStatement {

    constructor(wrapper, payload) {
        this.payload = payload;
        this.wrapper = wrapper;
        this.localVariables = {};
    }

    doSymbolicSubstitution() {
        this.initializeLocalVariables();
    }

    initializeLocalVariables() {
        let body = this.payload.body;

        for (let i = 0; i < body.length; i++) {
            let type = body[i].type;
            let payload = body[i];
            console.log(type)
            console.log(this.handlers[type])
            if (this.handlers[type]) {
                updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), this.getParams());
            }
            else {
                let symbolicSubstitution = new SymbolicSubstitutionHandler([payload], this);
                symbolicSubstitution.doSymbolicSubstitution();
            }
        }
        console.log(this.localVariables);
    }

    getWrapperParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

    getParams() {
        let params = this.payload.params;
        let wrapperParams = this.getWrapperParams();

        return [...params, ...wrapperParams];
    }

    getGlobalVariables() {
        return getGlobalVariables(this.wrapper, this.getParams());
    }

    getLocalVariables() {
        return this.localVariables;
    }

}

FunctionStatement.prototype.handlers = {
    'VariableDeclaration': updateLocalVariable,
    'AssignmentExpression': updateLocalVariable,
};

export {FunctionStatement};
