import { BodyDeclaration } from './body-declaration-handler';
import { ExpressionStatement } from './expression-handler';

class FunctionDeclaration {

    constructor(body, wrapper, lineNumber) {
        this.wrapper = wrapper;
        this.body = body;
        this.lineNumber = lineNumber;
        let params = [];

        for (let i = 0; i < body.params.length; i++) {
            let expression = new ExpressionStatement(body.params[i]);
            if (expression.payload.value)
                params.push(expression.payload.value);
        }
        this.payload = { lineNumber: this.lineNumber, type: this.body.type, name: this.body.id.name, params: params, body: [] };
        this.payload.body = new BodyDeclaration(body.body.body, this, this.lineNumber).payloads;
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper)
            this.wrapper.increaseLineNumber();
    }

}

export { FunctionDeclaration };
