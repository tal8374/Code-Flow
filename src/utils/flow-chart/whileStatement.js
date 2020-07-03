import { FlowChartHandler } from './flow-chart-handler';
import { v4 as uuidv4 } from 'uuid';

class WhileStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
    }

    createFlowChartObjects() {
        return {
            objectType: this.payload.type,
            type: 'condition',
            state: this.payload.hasReached ? 'trueTest': 'falseTest',
            id: uuidv4(),
            label: `${this.payload.test}`,
            body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
        };
    }

    connect(payloads, index, next = {}) {
        let connections = [];
        payloads[index].connections = {};
        if (payloads[index].body.length > 0) {
            payloads[index].connections.yes = {
                id: payloads[index].body[0].id,
                position: 'right',
            }
        } else {
            payloads[index].connections.yes = {
                id: next.id,
                position: 'right',
            }
        }

        payloads[index].connections.no = {
            id: next.id,
            position: 'bottom',
        }
        for (let i = 0; i < payloads[index].body.length; i++) {
            if (i < payloads[index].body.length - 1) {
                payloads[index].body[i].connection = {
                    id: payloads[index].body[i + 1].id,
                    position: 'right',
                }
            }
        }
        if (payloads[index].body.length > 0) {
            payloads[index].body[payloads[index].body.length - 1].connection = {
                id: payloads[index].id,
                position: 'right',
            }
        }

        connections.push(payloads[index]);
        connections.push(...payloads[index].body);

        return connections;
    }
}

export { WhileStatement };
