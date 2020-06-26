import { updateLocalVariable, getGlobalVariables } from '../common';

class ReturnStatement {

    constructor(wrapper, payload) {
        this.wrapper = wrapper;
        this.payload = payload;
        this.localVariables = {};
    }

    doSymbolicSubstitution() {
        this.initializeLocalVariables();
        this.payload.subsitutedValues = this.payload.argument;
        let globalVariables = this.getGlobalVariables();
        for (let globalVariable in globalVariables) {
            this.payload.subsitutedValues = this.payload.subsitutedValues.replace(new RegExp(globalVariable, 'g'), globalVariables[globalVariable])
        }
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

export { ReturnStatement };
