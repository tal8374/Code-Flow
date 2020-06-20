import { Expression } from './expression-handler';

class ValueExpression {

    constructor(expression) {
        this.expression = expression;
    }

    getValue() {
        return new Expression(this.expression).getExpression();
    }

}

export { ValueExpression };
