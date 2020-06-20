import {BodyDeclaration} from './body-declaration-handler';

function ElseExpression(expression, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [{}];
}

ElseExpression.prototype.init = function () {
    this.handleDeclaration();

    this.handleBody();

    this.increaseLineNumber();

    return 'Initialization done';
};

ElseExpression.prototype.handleBody = function () {
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
};

ElseExpression.prototype.handleDeclaration = function () {
    this.payloads[0].type = this.type ? this.type : this.expression.type;

    return 'Done inserting the payload to the table';
};

ElseExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

ElseExpression.prototype.getPayloads = function () {
    return this.payloads;
};

export {ElseExpression};
