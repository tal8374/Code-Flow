import { BodyDeclaration } from './body-declaration-handler';

class facadeDeclaration {

    constructor(parsedCode) {
        this.parsedCode = parsedCode;
    }

    createPayloads() {

        this.handler = new BodyDeclaration(this.parsedCode.body, null, 1);

        this.handler.init();
    }

    getPayloads() {
        return this.handler.getPayloads();
    }

}

export { facadeDeclaration };
