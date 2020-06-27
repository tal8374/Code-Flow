import { WhileStatement } from './whileStatement';
import { IfStatement } from './ifStatement';
import { VariableStatement } from './variableStatement';

class FlowChartHandler {

    constructor(payloads, wrapper) {
        this.payloads = payloads;
        this.wrapper = wrapper;
        this.flowChartObjects = [];
    }

    createFlowChartObjects() {
        for (let i = 0; i < this.payloads.length; i++) {
            if (!this.handlers[this.payloads[i].type])
                continue;

            let codeHandler = new this.handlers[this.payloads[i].type](this.wrapper, this.payloads[i]);
            let result = codeHandler.createFlowChartObjects();
            this.flowChartObjects.push(result);
        }

        return this.flowChartObjects;
    }

    connect() {
        console.log(this.payloads)
        for(let i = 0; i < this.payloads.length; i++) {
            new this.handlers[this.payloads[i].objectType](this.wrapper, this.payloads[i]).connect(this.payloads, i, this.payloads[i + 1] || {});
        }
    }

}

FlowChartHandler.prototype.handlers = {
    'WhileStatement': WhileStatement,
    'IfStatement': IfStatement,
    'ElseIfStatement': IfStatement,
    'ElseStatement': IfStatement,
    'AssignmentExpression': VariableStatement,
    'VariableDeclaration': VariableStatement,
};

export { FlowChartHandler };
