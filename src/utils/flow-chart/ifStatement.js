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

    connectElseStatement(elseStatement, next) {
        if (elseStatement == null)
            return;

        let toConnect = elseStatement.body.length > 0 ? elseStatement.body[0] : next;
        elseStatement.connection = {
            id: toConnect.id,
            position: 'bottom',
        }

        for (let j = 0; j < elseStatement.body.length - 1; j++) {
            elseStatement.body[j].connection = {
                id: elseStatement.body[j + 1].id,
                position: 'bottom',
            }
        }

        toConnect = elseStatement.body.length > 0 ? elseStatement.body[elseStatement.body.length - 1] : elseStatement;
        toConnect.connection = {
            id: next.id,
            position: 'bottom',
        }
    }

    connectIfElseStatement(ifElses, elseStatement, next) {
        if (!ifElses || ifElses.length == 0)
            return;

        // if (ifElses.body.length > 0) {
        //     ifElses.connection.yes = {
        //         id: ifElses.body[0].id,
        //         position: 'bottom',
        //     }
        // } else {
        //     ifElses.connection.yes = {
        //         id: next.id,
        //         position: 'bottom',
        //     }
        // }

        // if (elseStatement.length > 0) {
        //     ifElses.connection.no = {
        //         id: elseStatement[0].id,
        //         position: 'right',
        //     }
        // } else if (elseStatement != null) {
        //     ifElses.connection.no = {
        //         id: elseStatement.id,
        //         position: 'right',
        //     }
        // } else {
        //     ifElses.connection.no = {
        //         id: next.id,
        //         position: 'right',
        //     }
        // }

        for (let i = 0; i < ifElses.length - 1; i++) {
            ifElses[i].conncections = {};
            if (ifElses.body.length > 0) {
                ifElses[i].conncections.yes = {
                    id: ifElses.body[0].id,
                    position: 'bottom',
                }
            } else {
                ifElses[i].conncections.yes = {
                    id: next.id,
                    position: 'bottom',
                }
            }

            if (elseStatement.length > 0) {
                ifElses[i].conncections.no = {
                    id: elseStatement[0].id,
                    position: 'right',
                }
            } else if (elseStatement != null) {
                ifElses[i].conncections.no = {
                    id: elseStatement.id,
                    position: 'right',
                }
            } else {
                ifElses[i].conncections.no = {
                    id: next.id,
                    position: 'right',
                }
            }

            for (let j = 0; j < ifElses[i].body.length - 1; j++) {
                ifElses[i].body[j].connection = {
                    id: ifElses.body[j + 1].id,
                    position: 'bottom',
                }
            }

            let toConnect = ifElses[i].body.length > 0 ? ifElses[i].body[ifElses[i].body.length - 1] : ifElses[i];
            toConnect.connection = {
                id: next.id,
                position: 'bottom',
            }
        }

        ifElses[ifElses.length - 1].conncections = {};
        if (ifElses[ifElses.length - 1].body.length > 0) {
            ifElses[ifElses.length - 1].conncections.yes = {
                id: ifElses[ifElses.length - 1].body[0].id,
                position: 'bottom',
            }
        } else {
            ifElses[ifElses.length - 1].conncections.yes = {
                id: next.id,
                position: 'bottom',
            }
        }

        if (elseStatement.length > 0) {
            ifElses[ifElses.length - 1].conncections.no = {
                id: elseStatement[0].id,
                position: 'right',
            }
        } else if (elseStatement != null) {
            ifElses[ifElses.length - 1].conncections.no = {
                id: elseStatement.id,
                position: 'right',
            }
        } else {
            ifElses[ifElses.length - 1].conncections.no = {
                id: next.id,
                position: 'right',
            }
        }


        // let toConnect = ifElses[ifElses.length - 1].body.length > 0 ?
        //     ifElses[ifElses.length - 1].body[ifElses[ifElses.length - 1].body.length - 1] :
        //     ifElses[ifElses.length - 1];

        // if (ifElses != null) {
        //     toConnect.connection = {
        //         id: ifElses.id,
        //         position: 'bottom',
        //     }
        // } else {
        //     toConnect.connection = {
        //         id: next.id,
        //         position: 'bottom',
        //     }
        // }

    }

    connectIfStatement(ifStatement, ifElses, elseStatement, next) {
        ifStatement.connections = {};
        if (ifStatement.body.length > 0) {
            ifStatement.connections.yes = {
                id: ifStatement.body[0].id,
                position: 'bottom',
            }
        } else {
            ifStatement.connections.yes = {
                id: next.id,
                position: 'bottom',
            }
        }

        if (ifElses && ifElses.length > 0) {
            ifStatement.connections.no = {
                id: ifElses[0].id,
                position: 'right',
            }
        } else if (elseStatement != null) {
            ifStatement.connections.no = {
                id: elseStatement.id,
                position: 'right',
            }
        } else {
            ifStatement.connections.no = {
                id: next.id,
                position: 'right',
            }
        }

        for (let j = 0; j < ifStatement.body.length - 1; j++) {
            ifStatement.body[j].connection = {
                id: ifStatement.body[j + 1].id,
                position: 'bottom',
            }
        }

        let toConnect = ifStatement.body.length > 0 ? ifStatement.body[ifStatement.body.length - 1] : ifStatement;
        if (ifElses && ifElses.length > 0) {
            toConnect.connection = {
                id: ifElses.id,
                position: 'bottom',
            }
        } else if (elseStatement != null) {
            toConnect.connection = {
                id: elseStatement.id,
                position: 'bottom',
            }
        } else {
            toConnect.connection = {
                id: next.id,
                position: 'bottom',
            }
        }
    }

    connect(payloads, index, next) {
        let ifStatement = payloads[index];
        let ifElses = ifStatement.ifElses;
        let elseStatement = ifStatement.else;

        this.connectIfStatement(ifStatement, ifElses, elseStatement, next);
        this.connectIfElseStatement(ifElses, elseStatement, next);
        this.connectElseStatement(elseStatement, next);

        let connections = [ifStatement];
        for (let i = 0; ifElses && i < ifElses.length; i++) {
            connections.push(...ifElses[i].body);
        }
        if (elseStatement)
            connections.push(...elseStatement.body);

        return connections;
    }
}

export { IfStatement };
