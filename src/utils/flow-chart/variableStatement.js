import { v4 as uuidv4 } from 'uuid';

class VariableStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
    }

    createFlowChartObjects() {
        let obj = {
            objectType: this.payload.type,
            type: 'operation',
            id: uuidv4(),
            label: [],
            state: this.payload.hasReached ? 'hasReached': 'hasNotReached',
            connection: {
                id: 'my_condition_node',
                position: 'bottom',
            },
        };

        for (let i = 0; i < this.payload.names.length; i++) {
            obj.label.push(`${this.payload.names[i]} = ${this.payload.values[i]}`);
        }
        obj.label = `${this.payload.type == 'AssignmentExpression' ? '' : 'let '}` + obj.label.join(', ') + `;\nlineNumber: ${this.payload.lineNumber}`;
        return obj;
    }

    connect(payloads, index) {
        if (index < payloads.length - 1) {
            payloads[index].connection = {
                id: payloads[index + 1].id,
                position: 'bottom',
            }
        }
        return payloads[index];
    }
}

export { VariableStatement };
