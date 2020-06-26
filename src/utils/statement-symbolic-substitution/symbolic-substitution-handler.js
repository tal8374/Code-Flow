import {FunctionStatement} from './functionStatement';
import {WhileStatement} from './whileStatement';
import {ElseIfStatement} from './elseIfStatement';
import {ReturnStatement} from './returnStatement';
import {getGlobalVariables, updateLocalVariable} from '../common';
import {IfStatement} from './ifStatement';

class SymbolicSubstitutionHandler {

    constructor(payload, wrapper = null) {
        this.payload = payload;
        this.wrapper = wrapper;
        this.localVariables = {};
    }

    doSymbolicSubstitution() {
        this.initializeLocalVariables();

        for (let i = 0; i < this.payload.length; i++) {
            let payload = this.payload[i];
            let codeType = payload.type;
            if (!this.handlers[codeType])
                continue;

            let symbolicSubstitutionHandler = new this.handlers[codeType](this, payload);
            symbolicSubstitutionHandler.doSymbolicSubstitution();
        }
    }

    initializeLocalVariables() {
        for (let i = 0; i < this.payload.length; i++) {
            if (!this.localVariablesHandlers[this.payload[i].type])
                continue;
            console.log(this.payload[i].type);


            updateLocalVariable(this.payload[i], this.localVariables, this.getGlobalVariables(), this.getParams());
        }
    }

    getGlobalVariables() {
        return getGlobalVariables(this.wrapper, this.getParams());
    }

    getWrapperParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams;
    }

    getParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

    getLocalVariables() {
        return this.localVariables;
    }

}

SymbolicSubstitutionHandler.prototype.handlers = {
    // 'VariableDeclaration': VariableStatement,
    'FunctionDeclaration': FunctionStatement,
    'WhileStatement': WhileStatement,
    // 'AssignmentExpression': AssignmentStatement,
    'IfStatement': IfStatement,
    'ElseIfStatement': ElseIfStatement,
    'ReturnStatement': ReturnStatement,
};

SymbolicSubstitutionHandler.prototype.localVariablesHandlers = {
    'VariableDeclaration': updateLocalVariable,
    'ExpressionStatement': updateLocalVariable,
};

export {SymbolicSubstitutionHandler};
