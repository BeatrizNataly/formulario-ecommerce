let _errors = {};

function findErrors(camposMaxLength, camposMinLength, camposObrigatorios, values) {
    for (var key in values) {
        if (camposObrigatorios.includes(key)) {
            if (values[key] == '') {
                let message = "Este campo é obrigatório";
                if (_errors[key]) {
                    _errors[key].push(message)
                } else {
                    _errors[key] = [message]
                }
            }
        }
        verifiyLength(camposMaxLength, values, key, 1)
        verifiyLength(camposMinLength, values, key, -1)
    }

    return _errors
}

export default findErrors

function verifiyLength(_length, values, key, val) {
    let message = '';
    if (Object.keys(_length).includes(key)) {
        if (val > 0) {
            if (values[key].length > _length[key]) {
                message = `Este campo não pode ter mais de ${_length[key]} caracteres`;
                if (_errors[key]) {
                    _errors[key].push(message)
                } else {
                    _errors[key] = [message]
                }
            }
        } else if (val < 0) {
            if (values[key].length < _length[key])
                message = `Este campo não pode ter menos de ${_length[key]} caracteres`;
            if (_errors[key]) {
                _errors[key].push(message)
            } else {
                _errors[key] = [message]
            }
        }
    }
}