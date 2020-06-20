import {BodyDeclaration} from './body-declaration-handler';

function BlockDeclaration(expression, wrapper, lineNumber, type) {
    this.expression = expression;
    this.lineNumber = lineNumber;
    this.wrapper = wrapper;
    this.type = type;
    this.payloads = [];
}

BlockDeclaration.prototype.init = function () {
    let body = new BodyDeclaration(this.expression.body, this, this.lineNumber);

    body.init();

    let payloads = body.getPayloads();

    for (let i = 0; i < payloads.length; i++) {
        this.payloads.push(payloads[i]);
    }

    return 'Success';
};

BlockDeclaration.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

BlockDeclaration.prototype.getPayloads = function () {
    return this.payloads;
};

export {BlockDeclaration};
