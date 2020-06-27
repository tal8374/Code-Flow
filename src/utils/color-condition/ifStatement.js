import { colorCondition } from '../common';
import { ColorHandler } from './color-handler';

class IfStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
    }

    colorCode() {
        if (!!eval(this.payload.subsitutedValues) == true) {
            let colorCreator = new ColorHandler(this.payload.body, this, this.input, this.isMarked);
            colorCreator.colorCode();
            return;
        }


        for (let i = 0; i < this.payload.ifElses.length; i++) {
            this.payload.ifElses[i].hasReached = true;
            if (!!eval(this.payload.ifElses[i].subsitutedValues) == true) {
                let colorCreator = new ColorHandler(this.payload.ifElses[i].body, this, this.input, this.isMarked);
                colorCreator.colorCode();
                return;
            }
        }

        if (this.payload.else) {
            this.payload.else.hasReached = true;
            let colorCreator = new ColorHandler(this.payload.else.body, this);
            colorCreator.colorCode();
        }
    }
}

export { IfStatement };
