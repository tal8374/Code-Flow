import { BodyDeclaration } from './body-declaration-handler';
import { ExpressionStatement } from './expression-handler';

class SwitchStatement {

    constructor(body, wrapper, lineNumber) {
        this.wrapper = wrapper;
        this.body = body;
        this.lineNumber = lineNumber;
        this.payload = {
            type: body.type,
            discriminant: new ExpressionStatement(body.discriminant).payload.value.toString(),
            lineNumber: this.lineNumber,
            cases: []
        };

        this.increaseLineNumber();

        for (let i = 0; i < body.cases.length; i++) {
            this.payload.cases.push({
                type: body.cases[i].type,
                test: body.cases[i].test ? new ExpressionStatement(body.cases[i].test).payload.value.toString() : null,
                consequent: [],
                lineNumber: this.lineNumber
            });
            this.payload.cases[i].consequent = new BodyDeclaration(body.cases[i].consequent, this, this.lineNumber).payloads;
            if (i < body.cases.length - 1)
                this.increaseLineNumber();
        }
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper)
            this.wrapper.increaseLineNumber();
    }

}

export { SwitchStatement };
