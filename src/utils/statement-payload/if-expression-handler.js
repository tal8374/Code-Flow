import { BodyDeclaration } from './body-declaration-handler';
import { ExpressionStatement } from './expression-handler';

class IfExpression {

    constructor(body, wrapper, lineNumber) {
        this.wrapper = wrapper;
        this.expression = body;
        this.lineNumber = lineNumber;

        this.payload = {
            type: body.type,
            test: new ExpressionStatement(body.test).payload.value,
            lineNumber: this.lineNumber,
            body: [],
        };
        this.payload.body = new BodyDeclaration(body.consequent.body ? body.consequent.body : [body.consequent], this, this.lineNumber).payloads;

        if (body.alternate && body.alternate.type === 'IfStatement') {
            body.alternate.type = 'ElseIfStatement';
            this.payload.elseIf = new BodyDeclaration([body.alternate], this, this.lineNumber).payloads[0];
        }

        if (body.alternate && body.alternate.type !== 'IfStatement' && body.alternate.type !== 'ElseIfStatement') {
            this.increaseLineNumber();
            this.payload.else = { type: 'ElseStatement', lineNumber: this.lineNumber, body: new BodyDeclaration(body.alternate.body, this, this.lineNumber).payloads };
        }
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper)
            this.wrapper.increaseLineNumber();
    }

}

export { IfExpression };
