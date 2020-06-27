import { FunctionStatement } from './functionStatement';
import { WhileStatement } from './whileStatement';
import { IfStatement } from './ifStatement';
import { VariableStatement } from './variableStatement';

class ColorHandler {

    constructor(payloads, wrapper) {
        this.payloads = payloads;
        this.wrapper = wrapper;
    }

    colorCode() {
        console.log(this.payloads)
        for (let i = 0; i < this.payloads.length; i++) {
            let codeType = this.payloads[i].type;
            this.payloads[i].hasReached = true;

            if (!this.handlers[codeType])
                continue;

            let codeHandler = new this.handlers[codeType](this.wrapper, this.payloads[i]);
            codeHandler.colorCode();
        }
    }

}

ColorHandler.prototype.handlers = {
    'WhileStatement': WhileStatement,
    'IfStatement': IfStatement,
    'AssignmentExpression': VariableStatement,
    'VariableDeclaration': VariableStatement,
};

export { ColorHandler };
