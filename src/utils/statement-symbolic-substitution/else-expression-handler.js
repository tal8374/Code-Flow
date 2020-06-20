import { BodyDeclaration } from './body-declaration-handler';

class ElseExpression {

    constructor(expression, wrapper, lineNumber, type) {
        this.wrapper = wrapper;
        this.expression = expression;
        this.lineNumber = lineNumber;
        this.type = type;
        this.payloads = [{}];
    }

    init() {
        this.handleDeclaration();

        this.handleBody();

        this.increaseLineNumber();

        return 'Initialization done';
    }

    handleBody() {
        let body = [this.expression];
        if (this.expression.body) {
            body = this.expression.body;
        }

        let bodyExpression = new BodyDeclaration(body, this, this.lineNumber + 1);
        bodyExpression.init();

        let payloads = bodyExpression.getPayloads();

        this.payloads[0].body = [];

        for (let i = 0; i < payloads.length; i++) {
            this.payloads[0].body.push(payloads[i]);
        }

        return 'Body statement is handled';
    }

    handleDeclaration() {
        this.payloads[0].type = this.type ? this.type : this.expression.type;

        return 'Done inserting the payload to the table';
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

export { ElseExpression };
