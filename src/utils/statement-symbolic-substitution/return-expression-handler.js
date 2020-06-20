import { ExpressionStatement } from './expression-handler';

function ReturnExpression(body, wrapper, lineNumber) {
    this.wrapper = wrapper;
    this.body = body;
    this.lineNumber = lineNumber;
    this.payload = {
        type: body.type,
        lineNumber: this.lineNumber,
        argument: new ExpressionStatement(body.argument).payload.value
    };
}

export { ReturnExpression };
