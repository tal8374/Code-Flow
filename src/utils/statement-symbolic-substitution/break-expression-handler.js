class BreakStatementExpression {

    constructor(body, wrapper, lineNumber) {
        this.wrapper = wrapper;
        this.body = body;
        this.lineNumber = lineNumber;
        this.payload = {
            type: body.type,
            lineNumber: lineNumber
        };
    }

}

export { BreakStatementExpression };
