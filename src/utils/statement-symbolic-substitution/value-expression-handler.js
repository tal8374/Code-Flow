import { Expression } from './expression-handler';

function ValueExpression(expression) {
    this.expression = expression;
}

ValueExpression.prototype.getValue = function () {
    return new Expression(this.expression).getExpression();
};

export { ValueExpression };
