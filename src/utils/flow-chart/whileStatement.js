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
            type: 'whileCondition',
            id: uuidv4(),
            label: `${this.payload.test}`,
            body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
        };
    }

    connect(payloads, index, next) {
        payloads[index].connection = {
            id: next.id,
            position: 'bottom',
        }
        for (let i = 0; i < payloads[index].body.length; i++) {
            if (i < payloads[index].body.length - 1) {
                payloads[index].body[i].connection = {
                    id: payloads[index].body[i + 1].id,
                    position: 'bottom',
                }
            }
        }
        if(payloads[index].body.length > 0) {
            payloads[index].body[payloads[index].body.length - 1].connection = {
                id: payloads[index].id,
                position: 'bottom',
            }
        }
    }
}

export { WhileStatement };
