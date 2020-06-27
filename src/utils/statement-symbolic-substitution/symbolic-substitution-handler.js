import {FunctionStatement} from './functionStatement';
import {WhileStatement} from './whileStatement';
import {ElseIfStatement} from './elseIfStatement';
import {ReturnStatement} from './returnStatement';
import {CallExpression} from './CallExpression';
import {getGlobalVariables, updateLocalVariable} from '../common';
import {IfStatement} from './ifStatement';

class SymbolicSubstitutionHandler {

    constructor(payload, wrapper = null) {
        this.payload = payload;
        this.wrapper = wrapper;
        this.localVariables = {};
    }

    doSymbolicSubstitution() {
        for (let i = 0; i < this.payload.length; i++) {
            let payload = this.payload[i];
            let codeType = payload.type;
            updateLocalVariable(payload, this.localVariables, this.getGlobalVariables(), this.getParams(), this);

            if (!this.handlers[codeType])
                continue;

            let symbolicSubstitutionHandler = new this.handlers[codeType](this, payload);
            symbolicSubstitutionHandler.doSymbolicSubstitution();
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
    'WhileStatement': WhileStatement,
    'IfStatement': IfStatement,
    'ElseIfStatement': ElseIfStatement,
    'ReturnStatement': ReturnStatement,
    'CallExpression': CallExpression,
};

SymbolicSubstitutionHandler.prototype.localVariablesHandlers = {
    'VariableDeclaration': updateLocalVariable,
    'ExpressionStatement': updateLocalVariable,
};

export {SymbolicSubstitutionHandler};
