
import InputField from '../components/InputField';
import Label from '../components/Label';
import InputAddress from '../components/InputAddress';
import axios from 'axios';
import { useState } from "react";

/*
    TO DO:
    -> Mudar cor do css quando o cep preencher os dados (caso correto e caso errado cores diferentes)
    -> Colocar validações se os campos obrigatórios foram preenchidos
*/

function Form() {

    const [terms, setTerms] = useState(false);
    const [newsletter, setNewsletter] = useState(false);

    const [cepValido, isCepValido] = useState(false);
    const [submitValido, isSubmitValido] = useState(false);

    const [eventCep, isEventCepClicado] = useState(false);
    const [eventSubmit, isEventSubmitClicado] = useState(false);

    const [errors, setErrors] = useState({});

    const [values, setValues] = useState({
        primeiroNome: "",
        ultimoNome: "",
        email: "",
        telefone: "",
        cep: "",
        rua: "",
        numero: "",
        complemento: "",
        bairro: "",
        cidade: "",
        uf: "",
    });

    function buscaCepNaApi(valor) {
        axios.get(`https://viacep.com.br/ws/${valor}/json/`)
            .then((response) => {
                if (response.data.erro) {
                    isCepValido(false)
                    return;
                }
                let newValues = { ...values };
                newValues['rua'] = response.data.logradouro;
                newValues['bairro'] = response.data.bairro;
                newValues['cidade'] = response.data.localidade;
                newValues['uf'] = response.data.uf;
                newValues['cep'] = valor
                setValues(newValues);
                isCepValido(true)
            })
            .catch((error) => {
                console.error(error);
                isCepValido(false)
            })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isEventSubmitClicado(true)

        const camposObrigatorios = ["primeiroNome", "ultimoNome", "email",
            "telefone", "rua", "numero", "bairro", "cidade", "uf", "cep"]

        const camposMaxLength = {
            "telefone": 16
        }
        const camposMinLength = {
            "telefone": 15
        }

        let _errors = {};

        for (var key in values) {
            if (camposObrigatorios.includes(key)) {
                if (values[key] == '') {
                    isSubmitValido(false)
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
                    isSubmitValido(false)
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
                    isSubmitValido(false)
                    let message = `Este campo não pode ter menos de ${camposMinLength[key]} caracteres`;
                    if (_errors[key]) {
                        _errors[key].push(message)
                    } else {
                        _errors[key] = [message]
                    }
                }
            }
        }

        console.log({ _errors });
        setErrors(_errors)
        isSubmitValido(Object.keys(_errors).length === 0 ? true : false)
    }

    const handleInput = (e) => {
        e.preventDefault();
        let campo = e.target.name;
        let valor = e.target.value;
        let newValues = { ...values };
        newValues[campo] = valor;
        setValues(newValues);
    }

    const handleInputCep = (e) => {
        e.preventDefault();

        let valor = e.target.value;
        let cepSplit = valor.replace(/([AP]M)$/i, " $1").split(/[^0-9a-z]+/ig);
        let cep = cepSplit[0] + cepSplit[1]

        if (cep.length == 8) {
            isEventCepClicado(true);
            buscaCepNaApi(cep);
            return
        }
        isCepValido(false)
    }

    return (
        <div className="App">
            <h1>Falta pouco...</h1>
            <p>Preencha os dados abaixo para garantir
                que seu pacote venha até você em segurança!</p>
            <form onSubmit={handleSubmit}>
                <Label text="Dados pessoais:" /><br /><br />

                <Label text="Nome *" />
                <InputField
                    type="text"
                    id="primeiroNome"
                    placeholder="Primeiro Nome"
                    onInput={handleInput}
                    error={errors?.primeiroNome != null ? <>{errors.primeiroNome[0]}</> : null}
                />

                <InputField
                    type="text"
                    id="ultimoNome"
                    placeholder="Último Nome"
                    onInput={handleInput}
                    error={errors?.ultimoNome != null ? <>{errors.ultimoNome[0]}</> : null}
                />
                <br />

                <Label text="Email *" />
                <InputField
                    type="email"
                    id="email"
                    placeholder="ex: meuEmail199@exemplo.com"
                    onInput={handleInput}
                    error={errors?.email != null ? <>{errors.email[0]}</> : null}
                />
                <br />

                <Label text="Telefone celular*" />
                <InputField
                    type="phone"
                    id="telefone"
                    mask='(99) 99999-9999'
                    placeholder='ex: (11) 98888-7777'
                    onInput={handleInput}
                    error={errors?.telefone != null ? <>{errors.telefone[1]}</> : null}
                />
                <br />

                <Label text="Endereço de entrega:" /><br /><br />

                <Label text="CEP *" /><a href="https://buscacepinter.correios.com.br/app/endereco/index.php" target="_blank">Não sei meu cep.</a>
                <InputField
                    type="text"
                    id="cep"
                    mask='99999-999'
                    placeholder='ex: 01001-000'
                    onInput={handleInputCep}
                    error={
                        errors?.cep != null ? <>{errors.cep[0]}</>
                            : <> {cepValido ? null : eventCep ? 'Cep não encontrado.'
                                : null}</>
                    }
                />
                <br />

                {
                    cepValido ?
                        <><InputAddress
                            rua={values.rua}
                            bairro={values.bairro}
                            cidade={values.cidade}
                            uf={values.uf}
                        />

                            <Label text="Número *" />
                            <InputField
                                type="text"
                                id="numero"
                                placeholder="ex: 526A"
                                onInput={handleInput}
                                error={errors?.numero != null ? <>{errors.numero[0]}</> : null}
                            />
                            <br />

                            <Label text="Complemento" />
                            <InputField
                                type="text"
                                id="complemento"
                                placeholder="ex: Apto. 215B"
                                onInput={handleInput}
                            />

                            <br />
                        </>
                        : null
                }

                <input
                    type="checkbox"
                    id="check-terms"
                    onChange={() => setTerms(!terms)}
                    />
                <label>Concordo com os Termos e Condições</label>{eventSubmit ? terms ? null : <p className='error-message'> Este campo é obrigatório</p> : null}
                <br />

                <input
                    type="checkbox"
                    id="check-communication" 
                    onChange={() => setNewsletter(!newsletter)}
                    />
                <label>Desejo receber mensagens sobre meu pedido</label>
                <br></br><br></br>

                <input type="submit" />
            </form>
        </div>
    )
}

export default Form