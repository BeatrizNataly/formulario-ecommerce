function findErrors(camposMaxLength, camposMinLength, camposObrigatorios, values){
    let _errors = {};

        for (var key in values) {
            if (camposObrigatorios.includes(key)) {
                if (values[key] == '') {
                  //  isSubmitValido(false)
                    let message = "Este campo é obrigatório";
                    if (_errors[key]) {
                        _errors[key].push(message)
                    } else {
                        _errors[key] = [message]
                    }
                }
            }
            if (Object.keys(camposMaxLength).includes(key)) {
                if (values[key].length > camposMaxLength[key]) {
                   // isSubmitValido(false)
                    let message = `Este campo não pode ter mais de ${camposMaxLength[key]} caracteres`;
                    if (_errors[key]) {
                        _errors[key].push(message)
                    } else {
                        _errors[key] = [message]
                    }
                }
            }
            if (Object.keys(camposMinLength).includes(key)) {
                if (values[key].length < camposMinLength[key]) {
                  //  isSubmitValido(false)
                    let message = `Este campo não pode ter menos de ${camposMinLength[key]} caracteres`;
                    if (_errors[key]) {
                        _errors[key].push(message)
                    } else {
                        _errors[key] = [message]
                    }
                }
            }
        }

        return _errors
}

export default findErrors