import { ColorHandler } from './color-handler';

class FunctionStatement {

    constructor(wrapper, payloads, input, isMarked) {
        this.payloads = payloads;
        this.wrapper = wrapper;
        this.input = input;
        this.isMarked = isMarked;
    }

    colorCode() {
        let bodyCode = this.payloads.body;

        let colorCreator = new ColorHandler(bodyCode, this, this.input, this.isMarked);
        colorCreator.colorCode();
    }

    getWrapperParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

    getParams() {
        let params = this.payloads.params;
        let wrapperParams = this.getWrapperParams();

        return [...params, ...wrapperParams];
    }

}

export { FunctionStatement };
