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
                type: 'condition',
                fill: 'lightyellow',
                state: !!eval(this.payload.test) == true ? 'trueTest': 'falseTest',
                id: uuidv4(),
                ifElses: this.payload.ifElses.map(ifElse => new FlowChartHandler([ifElse]).createFlowChartObjects()).map(x => x[0]),
                else: this.payload.else ? new FlowChartHandler([this.payload.else]).createFlowChartObjects()[0] : null,
                label: `${this.payload.test}`,
                body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
            };
        } else if (this.payload.type == 'ElseIfStatement') {
            return {
                objectType: this.payload.type,
                type: 'condition',
                state: !!eval(this.payload.test) == true ? 'trueTest': 'falseTest',
                id: uuidv4(),
                label: `${this.payload.test}`,
                body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
            };
        } else {
            return {
                objectType: this.payload.type,
                state: this.payload.hasReached ? 'trueTest': 'falseTest',
                type: 'condition',
                id: uuidv4(),
                label: `Else`,
                body: new FlowChartHandler(this.payload.body).createFlowChartObjects()
            };
        }
    }

    connectElseStatement(elseStatement, next) {
        if (elseStatement == null)
            return;

        elseStatement.connections = {};
        if (elseStatement.body.length > 0) {
            elseStatement.connections.yes = {
                id: elseStatement.body[0].id,
                position: 'bottom',
            };
        } else {
            elseStatement.connections.yes = {
                id: next.id,
                position: 'bottom',
            };
        }

        for (let j = 0; j < elseStatement.body.length - 1; j++) {
            elseStatement.body[j].connection = {
                id: elseStatement.body[j + 1].id,
                position: 'bottom',
            }
        }

        let toConnect = elseStatement.body.length > 0 ? elseStatement.body[elseStatement.body.length - 1] : elseStatement;
        toConnect.connection = {
            id: next.id,
            position: 'bottom',
        }
    }

    connectIfElseStatement(ifElses, elseStatement, next) {
        if (!ifElses || ifElses.length == 0)
            return;

        for (let i = 0; i < ifElses.length - 1; i++) {
            let currentIfElse = ifElses[i];
            currentIfElse.connections = {};
            if (currentIfElse.body.length > 0) {
                currentIfElse.connections.yes = {
                    id: currentIfElse.body[0].id,
                    position: 'bottom',
                }
            } else {
                currentIfElse.connections.yes = {
                    id: next.id,
                    position: 'bottom',
                }
            }

            if(ifElses.length > 1) {
                currentIfElse.connections.no = {
                    id: ifElses[i + 1].id,
                    position: 'right',
                }
            } else if (elseStatement != null) {
                currentIfElse.connections.no = {
                    id: elseStatement.id,
                    position: 'right',
                }
            } else {
                currentIfElse.connections.no = {
                    id: next.id,
                    position: 'right',
                }
            }

            // if (elseStatement.length > 0) {
            //     currentIfElse.connections.no = {
            //         id: elseStatement[0].id,
            //         position: 'right',
            //     }
            // } else if (elseStatement != null) {
            //     currentIfElse.connections.no = {
            //         id: elseStatement.id,
            //         position: 'right',
            //     }
            // } else {
            //     currentIfElse.connections.no = {
            //         id: next.id,
            //         position: 'right',
            //     }
            // }

            for (let j = 0; j < currentIfElse.body.length - 1; j++) {
                currentIfElse.body[j].connection = {
                    id: currentIfElse.body[j + 1].id,
                    position: 'bottom',
                }
            }

            let toConnect = currentIfElse.body.length > 0 ? currentIfElse.body[currentIfElse.body.length - 1] : currentIfElse;
            toConnect.connection = {
                id: next.id,
                position: 'bottom',
            }
        }

        let lastIfElse = ifElses[ifElses.length - 1];
        lastIfElse.connections = {};
        if (lastIfElse.body.length > 0) {
            for (let i = 0; i < lastIfElse.body.length - 1; i++) {
                lastIfElse.body[i].connection = {
                    id: lastIfElse.body[i + 1].id,
                    position: 'bottom',
                }
            }

            lastIfElse.connections.yes = {
                id: lastIfElse.body[0].id,
                position: 'bottom',
            }
            lastIfElse.body[lastIfElse.body.length - 1].connection = {
                id: next.id,
                position: 'bottom',
            }
        } else {
            lastIfElse.connections.yes = {
                id: next.id,
                position: 'bottom',
            }
        }

        if (elseStatement != null) {
            lastIfElse.connections.no = {
                id: elseStatement.id,
                position: 'right',
            }
        } else {
            lastIfElse.connections.no = {
                id: next.id,
                position: 'right',
            }
        }
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

        for (let i = 0; i < ifStatement.body.length - 1; i++) {
            ifStatement.body[i].connection = {
                id: ifStatement.body[i + 1].id,
                position: 'bottom',
            }
        }

        if(ifStatement.body.length > 0) {
            ifStatement.body[ifStatement.body.length - 1].connection = {
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
        if (ifStatement.body)
        connections.push(...ifStatement.body);
        for (let i = 0; ifElses && i < ifElses.length; i++) {
            connections.push(ifElses[i]);
            connections.push(...ifElses[i].body);
        }
        if (elseStatement) {
            connections.push(elseStatement);
            connections.push(...elseStatement.body);
        }
        return connections;
    }
}

export { IfStatement };
