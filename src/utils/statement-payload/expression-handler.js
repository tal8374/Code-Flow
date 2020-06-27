class ExpressionStatement {

    constructor(body, wrapper, lineNumber) {
        this.body = body;
        this.wrapper = wrapper;
        this.lineNumber = lineNumber;

        if(this.body.type == 'CallExpression') {
            this.payload = {
                type: 'CallExpression',
                functionName: this.body.callee.name,
                arguments: this.body.arguments.map(argument => this.handlers[argument.type] ? new ExpressionStatement(argument, this, lineNumber).payload.value : null),
                lineNumber: this.lineNumber
            };
        } else if(this.body.expression && this.body.expression.type == 'CallExpression' ) {
            this.payload = {
                type: 'CallExpression',
                functionName: this.body.expression.callee.name,
                arguments: this.body.expressio.arguments.map(argument => this.handlers[argument.type] ? new ExpressionStatement(argument, this, lineNumber).payload.value : null),
                lineNumber: this.lineNumber
            };
        } else if(this.body.expression && this.body.expression.type == 'AssignmentExpression') {
            this.payload = {
                type: 'AssignmentExpression',
                name: this.body.expression.left.name,
                functionName: this.body.expression.right.callee.name,
                function: wrapper.getFunction(this.body.expression.right.callee.name),
                arguments: this.body.expression.right.arguments.map(argument => this.handlers[argument.type] ? new ExpressionStatement(argument, this, lineNumber).payload.value : null),
                lineNumber: this.lineNumber
            };
        } else if (body.type == 'ExpressionStatement') {
            let data = this.handlers[body.type] ? this.handlers[body.type].bind(this)() : '';
            this.payload = {
                type: this.body.type,
                names: [data.split('=')[0]],
                values: [data.split('=')[1]],
                lineNumber: this.lineNumber
            };
        }  else {
            this.payload = {
                type: this.body.type,
                value: this.handlers[body.type] ? this.handlers[body.type].bind(this)() : null,
                lineNumber: this.lineNumber
            };
        }
    }
}

ExpressionStatement.prototype.handlers = {
    'Literal': literalHandler,
    'BinaryExpression': binaryExpressionHandler,
    'Identifier': identifierTestHandler,
    'AssignmentPattern': AssignmentPatternHandler,
    'MemberExpression': memberExpressionTestHandler,
    'ArrayExpression': arrayExpressionTestHandler,
    'ObjectExpression': objectExpressionHandler,
    'ConditionalExpression': conditionalExpressionHandler,
    'ExpressionStatement': ExpressionStatementHandler,
    'CallExpression': CallExpressionHandler,
    'AssignmentExpression': AssignmentExpressionHandler,
    'UpdateExpression': UpdateExpressionHandler,
    'LogicalExpression': LogicalExpressionHandler,
    'SequenceExpression': SequenceExpressionHandler,
};

function SequenceExpressionHandler() {
    return this.body.expressions.map(expression => new ExpressionStatement(expression).payload.value);
}

function AssignmentPatternHandler() {
    return new ExpressionStatement(this.body.left).payload.value +
        '=' +
        new ExpressionStatement(this.body.right).payload.value
}

function LogicalExpressionHandler() {
    return new ExpressionStatement(this.body.left).payload.value +
        this.body.operator +
        new ExpressionStatement(this.body.right).payload.value
}

function UpdateExpressionHandler() {
    if (this.body.prefix)
        return this.body.operator + new ExpressionStatement(this.body.argument).payload.value;
    else
        return new ExpressionStatement(this.body.argument).payload.value + this.body.operator;
}

function AssignmentExpressionHandler() {
    return new ExpressionStatement(this.body.left).payload.value +
        this.body.operator +
        new ExpressionStatement(this.body.right).payload.value
}

function CallExpressionHandler() {
    let args = [];

    for (let i = 0; i < this.body.arguments.length; i++) {
        let expression = new ExpressionStatement(this.body.arguments[i]);
        if (expression.payload.value)
            args.push(expression.payload.value)
    }
    return this.body.callee.name + '(' + args.join(',') + ')';
}

function ExpressionStatementHandler() {
    return new ExpressionStatement(this.body.expression).payload.value;
}

function literalHandler() {
    return this.body.value;
}

function binaryExpressionHandler() {
    let leftSideValue = new ExpressionStatement(this.body.left).payload.value;
    let rightSideValue = new ExpressionStatement(this.body.right).payload.value;
    let operator = this.body.operator;

    if (['/', '*'].indexOf(operator) == -1)
        return `${leftSideValue} ${operator} ${rightSideValue}`;
    else
        return `(${leftSideValue}) ${operator} (${rightSideValue})`;
}

function identifierTestHandler() {
    return this.body.name;
}

function memberExpressionTestHandler() {
    let object = this.body.object.name ? this.body.object.name : new ExpressionStatement(this.body.object).payload.value;
    let property = new ExpressionStatement(this.body.property).payload.value;

    return this.body.computed ? object + '[' + property + ']' : object + '.' + property;
}

function arrayExpressionTestHandler() {
    let array = '';

    for (let i = 0; i < this.body.elements.length; i++) {
        array += new ExpressionStatement(this.body.elements[i]).payload.value;
        if (i !== this.body.elements.length - 1)
            array += ',';
    }

    return '[' + array + ']';
}

function objectExpressionHandler() {
    let value = '';

    for (let i = 0; i < this.body.properties.length; i++) {
        let propertyValue = new ExpressionStatement(this.body.properties[i].value);
        let propertyKey = new ExpressionStatement(this.body.properties[i].key);
        value = value + propertyKey.payload.value + ':' + propertyValue.payload.value;

        if (i !== this.body.properties.length - 1)
            value += ',';
    }

    return '{' + value + '}';
}

function conditionalExpressionHandler() {
    return new ExpressionStatement(this.body.test).payload.value + ' ? ' +
        new ExpressionStatement(this.body.consequent).payload.value + ' : ' +
        new ExpressionStatement(this.body.alternate).payload.value;
}

export { ExpressionStatement };
