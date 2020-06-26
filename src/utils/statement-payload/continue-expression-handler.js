import { Expression } from './expression-handler';

class ContinueStatementExpression {

    constructor(expression, wrapper, lineNumber, type) {
        this.wrapper = wrapper;
        this.expression = expression;
        this.lineNumber = lineNumber;
        this.type = type;
        this.payloads = [];
    }

    init() {
        this.handleBreakStatement();

        this.increaseLineNumber();

        return 'Initialization done';
    }

    handleBreakStatement() {
        let name = new Expression(this.expression.label);

        let breakPayload = {
            lineNumber: this.lineNumber,
            type: this.type ? this.type : this.expression.type,
            name: name.getExpression(),
        };

        this.payloads.push(breakPayload);
    }

    increaseLineNumber() {
        this.lineNumber += 1;

        if (this.wrapper) {
            this.wrapper.increaseLineNumber();
        }
    }

    getPayloads() {
        return this.payloads;
    }

}

export { ContinueStatementExpression };
