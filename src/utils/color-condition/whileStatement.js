import { ColorHandler } from './color-handler';
import { colorCondition } from '../common';

class WhileStatement {

    constructor(wrapper, payload, input, isMarked) {
        this.wrapper = wrapper;
        this.payload = payload;
        this.input = input;
        this.isMarked = isMarked;
    }

    colorCode() {
        this.colorCondition();

        let bodyCode = this.payload.body;

        let colorCreator = new ColorHandler(bodyCode, this, this.input, this.isMarked);
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
        this.isMarked.isMarked = this.payload.style.backgroundColor === '#7FFF00';
    }

}

export { WhileStatement };
