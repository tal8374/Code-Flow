import { ColorHandler } from './color-handler';
import { colorCondition } from '../common';

class VariableStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
    }

    colorCode() {
        for (let i = 0; i < this.payload.values.length; i++) {
            let value = this.payload.values[i];
            if (value.type == 'CallExpression') {
                let colorCreator = new ColorHandler(value.function.body, this);
                colorCreator.colorCode();
            }
        }

        console.log(this.payload);
    }
}

export { VariableStatement };
