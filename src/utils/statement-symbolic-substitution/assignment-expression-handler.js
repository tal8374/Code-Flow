import {ValueExpression} from './value-expression-handler';

function AssignmentExpression(body, wrapper, lineNumber, type) {
    this.wrapper = wrapper;
    this.expression = body.expression ? body.expression : body;
    this.lineNumber = lineNumber;
    this.type = type;
    this.payloads = [];
}

AssignmentExpression.prototype.init = function () {
    if (this.expression.expressions) {
        this.handleMultipleExpression();
    }  else {
        this.handleSingleExpression();
    }

    this.increaseLineNumber();

    return 'Success';
};

AssignmentExpression.prototype.handleSingleExpression = function () {
    var expression = this.expression;

    this.assignmentExpressionHandler(expression);
};

AssignmentExpression.prototype.handleMultipleExpression = function () {
    var expressions = this.expression.expressions;

    for (let i = 0; i < expressions.length; i++) {
        this.assignmentExpressionHandler(expressions[i]);
    }
};

AssignmentExpression.prototype.assignmentExpressionHandler = function (declaration) {
    let payload = this.parseAssignmentExpressionHandler(declaration);

    this.payloads.push(payload);
};

AssignmentExpression.prototype.parseAssignmentExpressionHandler = function (expression) {
    let valueExpression = new ValueExpression(expression.right ? expression.right : expression);

    return {
        type: this.type ? this.type : this.expression.type,
        name: this.getName(expression),
        value: '' + valueExpression.getValue(),
        lineNumber: this.lineNumber,
    };
};

AssignmentExpression.prototype.getName = function (expression) {
    if(expression.operator === '++') {
        return expression.argument.name + '++';
    }
    return expression.left.name ? expression.left.name : expression.left.property.name;
};

AssignmentExpression.prototype.increaseLineNumber = function () {
    this.lineNumber += 1;

    if (this.wrapper) {
        this.wrapper.increaseLineNumber();
    }
};

AssignmentExpression.prototype.getPayloads = function () {
    return this.payloads;
};

export {AssignmentExpression};
