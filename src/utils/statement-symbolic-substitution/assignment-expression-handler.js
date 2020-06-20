import { ValueExpression } from './value-expression-handler';

class AssignmentExpression {

    constructor(body, wrapper, lineNumber, type) {
        this.wrapper = wrapper;
        this.expression = body.expression ? body.expression : body;
        this.lineNumber = lineNumber;
        this.type = type;
        this.payloads = [];
    }

    init() {
        if (this.expression.expressions) {
            this.handleMultipleExpression();
        }
        else {
            this.handleSingleExpression();
        }

        this.increaseLineNumber();

        return 'Success';
    }

    handleSingleExpression() {
        var expression = this.expression;

        this.assignmentExpressionHandler(expression);
    }

    handleMultipleExpression() {
        var expressions = this.expression.expressions;

        for (let i = 0; i < expressions.length; i++) {
            this.assignmentExpressionHandler(expressions[i]);
        }
    }

    assignmentExpressionHandler(declaration) {
        let payload = this.parseAssignmentExpressionHandler(declaration);

        this.payloads.push(payload);
    }

    parseAssignmentExpressionHandler(expression) {
        let valueExpression = new ValueExpression(expression.right ? expression.right : expression);

        return {
            type: this.type ? this.type : this.expression.type,
            name: this.getName(expression),
            value: '' + valueExpression.getValue(),
            lineNumber: this.lineNumber,
        };
    }

    getName(expression) {
        if (expression.operator === '++') {
            return expression.argument.name + '++';
        }
        return expression.left.name ? expression.left.name : expression.left.property.name;
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









export { AssignmentExpression };
