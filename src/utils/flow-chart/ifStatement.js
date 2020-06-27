import { FlowChartHandler } from './flow-chart-handler';
import { v4 as uuidv4 } from 'uuid';

class IfStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
    }

    createFlowChartObjects() {
        if (this.payload.type == 'IfStatement') {
            return {
                objectType: this.payload.type,
                type: 'ifCondition',
                id: uuidv4(),
                ifElses: this.payload.ifElses.map(ifElse => new FlowChartHandler([ifElse]).createFlowChartObjects())[0],
                else: this.payload.else ? new FlowChartHandler([this.payload.else]).createFlowChartObjects()[0] : null,
                label: `${this.payload.test}`,
                body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
            };
        } else if (this.payload.type == 'ElseIfStatement') {
            return {
                objectType: this.payload.type,
                type: 'ifCondition',
                id: uuidv4(),
                label: `${this.payload.test}`,
                body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
            };
        } else {
            return {
                objectType: this.payload.type,
                type: 'ifCondition',
                id: uuidv4(),
                label: `Else`,
                body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
            };
        }
    }

    connectElseStatement(ifStatement, next) {
        for (let j = 0; j < ifStatement.else.body.length - 1; j++) {
            ifStatement.else.body[j].connection = {
                id: ifStatement.else.body[j + 1].id,
                position: 'bottom',
            }
        }

        ifStatement.else.body[ifStatement.else.body.length - 1].connection = {
            id: next.id,
            position: 'bottom',
        }
    }

    connectIfElseStatement(ifElses, next) { //TODO: connect last else if statement if else is not exists
        for (let i = 0; i < ifElses.length - 1; i++) {
            if (ifElses[i].body.length == 0) {
                ifElses[i].connection = {
                    id: ifElses[i + 1].id,
                    position: 'bottom',
                }
            } else {
                for (let j = 0; j < ifElses[i].body.length - 1; j++) {
                    ifElses[i].body[j].connection = {
                        id: ifElses[i].body[j + 1].id,
                        position: 'bottom',
                    }
                }

                ifElses[i].body[ifElses[i].body.length - 1].connection = {
                    id: ifElses[i + 1].id,
                    position: 'bottom',
                }
            }
        }
    }

    connectIfStatement(ifStatement, ifElses, next) {
        if (ifStatement.body.length > 0) { //point to the first in body
            ifStatement.connection = {
                id: ifStatement.body[0].id,
                position: 'bottom',
            }
        } else if (ifElses.length > 0) { //point to the first if else 
            ifStatement.connection = {
                id: ifElses[0].id,
                position: 'bottom',
            }

            if (ifStatement.else) {
                let lastElseIf = ifElses[ifElses.length - 1];
                lastElseIf.body[lastElseIf.body.length - 1].connection = {
                    id: ifStatement.else.id,
                    position: 'bottom',
                }
            }
        } else if (ifStatement.else) { // point to else
            ifStatement.connection = {
                id: ifStatement.else.id,
                position: 'bottom',
            }
        } else {
            ifStatement.connection = {
                id: next.id,
                position: 'bottom',
            }
        }
    }

    connect(payloads, index, next) {
        let ifStatement = payloads[index];
        let ifElses = ifStatement.ifElses;

        for (let j = 0; j < ifStatement.body.length - 1; j++) {
            ifStatement.body[j].connection = {
                id: ifStatement.body[j + 1].id,
                position: 'bottom',
            }
        }
        this.connectIfStatement(ifStatement, ifElses, next);

        if (ifElses.length > 0) {
            this.connectIfElseStatement(ifElses, next);
        } else { //no elseIfs
            if (ifStatement.else.body.length == 0) { //else body is empty
                ifStatement.else.connection = {
                    id: next.id,
                    position: 'bottom',
                }
            }
        }

        if (ifStatement.else)
            this.connectElseStatement(ifStatement, next);

        console.log(ifStatement);
    }
}

export { IfStatement };
