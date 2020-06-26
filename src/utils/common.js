function replaceAll(str, search, replacement) {
    str = '' + str;

    return str.split(search).join('' + replacement);
}

function updateLocalVariable(payload, localVariables, globalVariables, params) {
    if(!payload || !payload.values)
        return;
    payload.subsitutedValues = [...payload.values];
    for (let i = 0; i < payload.names.length; i++) {
        let variableName = payload.names[i];
        let variableContent = payload.values[i];

        variableContent = doSymbolicSubstitutionTo(variableContent, variableName, localVariables, globalVariables, params);
        localVariables[variableName] = getVariableContent(variableContent);
        variableContent = getVariableContent(variableContent);
        payload.subsitutedValues[i] = variableContent;

        updateParamValue(params, variableName, variableContent);
    }
}

function getVariableContent(variableContent) {
    variableContent = '' + variableContent;
    var expr = new RegExp('(?<=[-+*/])|(?=[-+*/])');
    let splittedVariableContent = variableContent.split(expr);
    const mappedVariableContent = splittedVariableContent.map(content => {
        try {
            if (containsSign(content)) return content;

            content = eval(content);
            return JSON.stringify(content);
        } catch (e) {
            return content;
        }
    });
    return mappedVariableContent.join(' ');
}

function containsSign(content) {
    let signs = ['<', '>', '===', '=='];

    for (let i = 0; i < signs.length; i++) {
        if (content.includes(signs[i])) return true;
    }

    return false;
}

function updateParamValue(params, variableName, variableContent) {
    let paramPayload = params.filter(param => param.name === variableName);
    if (paramPayload.length !== 1) return;

    paramPayload = paramPayload[0];
    paramPayload.value = variableContent;
}

function doSymbolicSubstitutionTo(variableContent, variableName, localVariables, globalVariables, params) {
    variableContent = doSymbolicSubstitutionWithLocalVariableTo(variableContent, variableName, localVariables, params);

    variableContent = doSymbolicSubstitutionWithGlobalVariableTo(variableContent, variableName,
        localVariables, globalVariables, params);

    return variableContent;
}

function doSymbolicSubstitutionWithLocalVariableTo(variableContent, variableName, localVariables, params) {
    for (let localVariable in localVariables) {
        if (localVariables.hasOwnProperty(localVariable)) {
            variableContent = replaceAll(variableContent, localVariable, localVariables[localVariable], params);
        }
    }

    return variableContent;
}

function doSymbolicSubstitutionWithGlobalVariableTo(variableContent, variableName, localVariables, globalVariables, params) {
    for (let globalVariable in globalVariables) {
        if (globalVariables.hasOwnProperty(globalVariable) && !(globalVariables in localVariables)) {

            variableContent = replaceAll(variableContent, globalVariable, globalVariables[globalVariable], params);
        }
    }

    return variableContent;
}

function getGlobalVariables(wrapper, params) {
    if (!wrapper) return {};

    let globalVariables = getGlobalVariables(wrapper.wrapper, params);
    let wrapperLocalVariables = wrapper.getLocalVariables();

    for (var property in globalVariables) {
        if (!globalVariables.hasOwnProperty(property)) return;

        if (property in wrapperLocalVariables)
            wrapperLocalVariables[property] = replaceAll(wrapperLocalVariables[property], property, globalVariables[property], params);
        else
            wrapperLocalVariables[property] = globalVariables[property];
    }

    return wrapperLocalVariables;
}

function colorCondition(payload, params, condition, inputs) {
    for (let i = 0; i < params.length; i++) {
        condition = replaceAll(condition, params[i].name, JSON.stringify(inputs[i]), []);
    }

    let isEntered = checkCondition(condition);

    if (!payload.style) {
        payload.style = {};
    }

    payload.style.backgroundColor = isEntered ? '#7FFF00' : '#FF4500';
}

function checkCondition(condition) {
    condition = '' + condition;

    try {
        return eval(condition);
    } catch (e) {
        if (typeof condition === 'string') {
            return condition.length;
        }
    }
}


export { replaceAll, updateLocalVariable, getGlobalVariables, colorCondition };
