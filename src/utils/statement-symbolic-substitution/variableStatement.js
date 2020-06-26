import { getGlobalVariables } from '../common';

class VariableStatement {

    constructor(wrapper, payloads) {
        this.wrapper = wrapper;
        this.payloads = payloads;
        this.localVariables = {};
    }

    doSymbolicSubstitution() {
    }

    getGlobalVariables() {
        return getGlobalVariables(this.wrapper, this.getParams());
    }

    getLocalVariables() {
        return this.localVariables;
    }

    getWrapperParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

    getParams() {
        if (!this.wrapper || !this.wrapper.getParams)
            return [];

        return this.wrapper.getParams();
    }

}

export { VariableStatement };
