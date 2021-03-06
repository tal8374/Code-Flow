import { BodyDeclaration } from './body-declaration-handler';
import { ExpressionStatement } from './expression-handler';

class WhileDeclaration {

    constructor(body, wrapper, lineNumber) {
        this.wrapper = wrapper;
        this.body = body;
        this.lineNumber = lineNumber;
        this.payload = {
            type: body.type,
            test: new ExpressionStatement(body.test).payload.value.toString(),
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

export { WhileDeclaration };
