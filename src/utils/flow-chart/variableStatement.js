import { v4 as uuidv4 } from 'uuid';

class VariableStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
    }

    createFlowChartObjects() {
        let obj = {
            objectType: this.payload.type,
            type: 'crossSection',
            id: uuidv4(),
            label: [],
            state: 'highlighted',
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

    connect(payloads, index, next) {
        payloads[index].connection = {
            id: next.id,
            position: 'bottom',
        }
    }
}

export { VariableStatement };
