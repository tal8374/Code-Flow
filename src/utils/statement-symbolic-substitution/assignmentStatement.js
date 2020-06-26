import { getGlobalVariables } from '../common';

class AssignmentStatement {

    constructor(wrapper, payloads) {
        this.wrapper = wrapper;
        this.payloads = payloads;
        this.localVariables = {};
    }

    doSymbolicSubstitution() {
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

    getGlobalVariables() {
        return getGlobalVariables(this.wrapper, this.getParams());
    }

}

export { AssignmentStatement };
