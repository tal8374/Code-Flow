import { ColorHandler } from './color-handler';
import { colorCondition } from '../common';

class WhileStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
    }

    colorCode() {
        if (!!eval(this.payload.subsitutedValues) == false)
            return;
        let colorCreator = new ColorHandler(this.payload.body, this);
        colorCreator.colorCode();
    }

    getParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

    colorCondition() {
        let condition = this.payload.declaration.condition;
        colorCondition(this.payload, this.getParams(), condition, this.input);
    }

}

export { WhileStatement };
