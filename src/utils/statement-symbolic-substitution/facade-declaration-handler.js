import {BodyDeclaration} from './body-declaration-handler';

function facadeDeclaration(parsedCode) {
    this.parsedCode = parsedCode;
}

facadeDeclaration.prototype.createPayloads = function () {
    this.handler = new BodyDeclaration(this.parsedCode.body, null, 1);

    this.handler.init();
};

facadeDeclaration.prototype.getPayloads = function () {
    return this.handler.getPayloads();
};

export {facadeDeclaration};
