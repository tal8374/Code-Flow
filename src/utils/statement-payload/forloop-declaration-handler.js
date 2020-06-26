import { BodyDeclaration } from './body-declaration-handler';
import { ExpressionStatement } from './expression-handler';

class ForloopDeclaration {

    constructor(body, wrapper, lineNumber) {
        this.wrapper = wrapper;
        this.body = body;
        this.lineNumber = lineNumber;
        this.payload = {
            type: body.type,
            init: new BodyDeclaration([body.init], null, this.lineNumber - 1).payloads,
            test: new ExpressionStatement(body.test).payload.value.toString(),
            update: body.update.type === 'SequenceExpression' ? new ExpressionStatement(body.update).payload.value : [new ExpressionStatement(body.update).payload.value],
            lineNumber: this.lineNumber,
            body: []
        };
        this.payload.body = new BodyDeclaration(body.body.body ? body.body.body : [body.body], this, this.lineNumber).payloads;
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper)
            this.wrapper.increaseLineNumber();
    }

}

export { ForloopDeclaration };
