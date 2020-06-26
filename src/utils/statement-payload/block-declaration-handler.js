import { BodyDeclaration } from './body-declaration-handler';

class BlockDeclaration {

    constructor(expression, wrapper, lineNumber, type) {
        this.expression = expression;
        this.lineNumber = lineNumber;
        this.wrapper = wrapper;
        this.type = type;
        this.payloads = [];
    }

    init() {
        let body = new BodyDeclaration(this.expression.body, this, this.lineNumber);

        body.init();

        let payloads = body.getPayloads();

        for (let i = 0; i < payloads.length; i++) {
            this.payloads.push(payloads[i]);
        }

        return 'Success';
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper) {
            this.wrapper.increaseLineNumber();
        }
    }

    getPayloads() {
        return this.payloads;
    }

}




export { BlockDeclaration };
