import { ExpressionStatement } from './expression-handler';

class VariableDeclaration {

    constructor(body, wrapper, lineNumber) {
        this.wrapper = wrapper;
        this.body = body;
        this.lineNumber = lineNumber;
        this.payload = { type: this.body.type, names: [], values: [], lineNumber: this.lineNumber, };

        for (let i = 0; i < this.body.declarations.length; i++) {
            let init = null;

            if (this.body.declarations[i].init) {
                let expression = new ExpressionStatement(this.body.declarations[i].init, this, lineNumber);
                init = expression.payload.value;
            }

            this.payload.names.push(this.body.declarations[i].id.name);
            this.payload.values.push(init);
        }
    }
    
}

export { VariableDeclaration };
