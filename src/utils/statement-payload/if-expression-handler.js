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
        if (wrapper.wrapper == null || wrapper.wrapper.payload.type != 'IfStatement')
            this.payload.ifElses = [];

        if (body.alternate && body.alternate.type === 'IfStatement') {
            let result = new BodyDeclaration([body.alternate], this, this.lineNumber).payloads[0];
            let elseIfObject = {
                type: 'ElseIfStatement',
                lineNumber: this.lineNumber,
                body: result.body,
                test: result.test
            };

            if (this.payload.ifElses != null) {
                this.payload.ifElses.push(elseIfObject);
            } else {
                this.setElseIfStatement(elseIfObject);
            }
        }

        if (body.alternate && body.alternate.type !== 'IfStatement' && body.alternate.type !== 'ElseIfStatement') {
            this.increaseLineNumber();
            this.wrapper.wrapper.setElseStatement({
                type: 'ElseStatement',
                lineNumber: this.lineNumber,
                body: new BodyDeclaration(body.alternate.body ? body.alternate.body : [body.alternate], this, this.lineNumber).payloads
            });
        }

        if (this.payload.ifElses)
            this.payload.ifElses = this.payload.ifElses.reverse();
    }

    setElseIfStatement(ElseIfStatement) {
        if (this.wrapper && this.wrapper.wrapper && this.wrapper.wrapper.payload.ifElses)
            this.wrapper.wrapper.payload.ifElses.push(ElseIfStatement);
        else
            this.wrapper.wrapper.setElseStatement(ElseIfStatement);
    }

    setElseStatement(ElseStatement) {
        if (!this.wrapper || !this.wrapper.wrapper || !this.wrapper.wrapper.setElseStatement) {
            this.payload.else = ElseStatement;
        } else {
            this.wrapper.wrapper.setElseStatement(ElseStatement);
        }
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper)
            this.wrapper.increaseLineNumber();
    }

}

export { IfExpression };
