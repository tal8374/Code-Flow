import { updateLocalVariable, getGlobalVariables } from '../common';

class CallExpression {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
        this.localVariables = {};
        this.function = this.wrapper.payload.find(data => data.type == 'FunctionDeclaration' && data.name == payload.functionName);
        // console.log(this.function);
    }

    doSymbolicSubstitution() {
        
        // this.initializeLocalVariables();
        // this.payload.subsitutedValues = this.payload.argument;
        // let globalVariables = this.getGlobalVariables();
        // console.log(globalVariables);
        // for (let globalVariable in globalVariables) {
        //     this.payload.subsitutedValues = this.payload.subsitutedValues.replace(new RegExp(globalVariable, 'g'), globalVariables[globalVariable])
        // }
    }

    initializeLocalVariables() {
        updateLocalVariable(this.payload, this.localVariables, this.getGlobalVariables(), this.getParams());
    }

    getParams() {
        return this.wrapper.getParams();
    }

    getGlobalVariables() {
        return getGlobalVariables(this.wrapper, this.getParams());
    }

}

export { CallExpression };
