import { VariableDeclaration } from './variable-declaration-handler';
import { FunctionDeclaration } from './function-declaration-handler';
import { WhileDeclaration } from './while-declaration-handler';
import { ForloopDeclaration } from './forloop-declaration-handler';
import { IfExpression } from './if-expression-handler';
import { ReturnExpression } from './return-expression-handler';
import { BreakStatementExpression } from './break-expression-handler';
import { ExpressionStatement } from './expression-handler';
import { SwitchStatement } from './switchcase-handler';

class BodyDeclaration {

    constructor(body, wrapper = null, lineNumber = 0) {
        this.body = body;
        this.lineNumber = lineNumber;
        this.wrapper = wrapper;
        this.payloads = [];
        this.body = this.body.filter(x => this.bodyDeclarationHandlers[x.type]);

        for (let i = 0; i < this.body.length; i++) {
            this.increaseLineNumber();
            this.payloads.push(new this.bodyDeclarationHandlers[this.body[i].type](this.body[i], this, this.lineNumber).payload);
        }
    }

    getFunction(functionName) {
        let functionObj = this.payloads.find(payload => payload.type == 'FunctionDeclaration' && payload.name == functionName);
        if(!functionObj && this.wrapper)
            return this.wrapper.getFunction(functionName);
        return functionObj;
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper)
            this.wrapper.increaseLineNumber();
    }

}

BodyDeclaration.prototype.bodyDeclarationHandlers = {
    'VariableDeclaration': VariableDeclaration,
    'FunctionDeclaration': FunctionDeclaration,
    'WhileStatement': WhileDeclaration,
    'SwitchStatement': SwitchStatement,
    'ForStatement': ForloopDeclaration,
    'ExpressionStatement': ExpressionStatement,
    'IfStatement': IfExpression,
    'ElseIfStatement': IfExpression,
    'ReturnStatement': ReturnExpression,
    'BreakStatement': BreakStatementExpression,
    'ContinueStatement': BreakStatementExpression,
};

export { BodyDeclaration };
