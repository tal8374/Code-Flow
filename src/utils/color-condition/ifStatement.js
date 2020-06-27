import { colorCondition } from '../common';
import { ColorHandler } from './color-handler';

class IfStatement {

    constructor(wrapper, payload, input, isMarked) {
        this.wrapper = wrapper;
        this.payload = payload;
        this.input = input;
        this.isMarked = isMarked;
    }

    colorCode() {
        this.colorCondition();

        this.handleBody();
    }

    colorCondition() {
        let condition = this.payload.declaration.condition;
        colorCondition(this.payload, this.getParams(), condition, this.input);
        this.isMarked.isMarked = this.payload.style.backgroundColor === '#7FFF00';
    }

    handleBody() {
        let bodyCode = this.payload.body;
        let colorCreator = new ColorHandler(bodyCode, this, this.input, this.isMarked);
        colorCreator.colorCode();
    }

    getParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

}

export { IfStatement };
