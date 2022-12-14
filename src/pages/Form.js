import InputField from '../components/InputField';
import Label from '../components/Label';
import InputAddress from '../components/InputAddress';
import axios from 'axios';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import findErrors from '../components/Handler';

function Form() {
    const navigate = useNavigate();

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
                setNewValues(response, valor)
                isCepValido(true)
            })
            .catch((error) => {
                console.error(error);
                isCepValido(false)
            })
    }

    function setNewValues(response, valor) {
        let newValues = { ...values };
        newValues['rua'] = response.data.logradouro;
        newValues['bairro'] = response.data.bairro;
        newValues['cidade'] = response.data.localidade;
        newValues['uf'] = response.data.uf;
        newValues['cep'] = valor
        setValues(newValues);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        isEventSubmitClicado(true)

        const camposObrigatorios = ["primeiroNome", "ultimoNome", "email",
            "telefone", "rua", "numero", "bairro", "cidade", "uf", "cep"]

        const camposMaxLength = { "telefone": 16 }
        const camposMinLength = { "telefone": 15 }

        const _errors = findErrors(camposMaxLength, camposMinLength, camposObrigatorios, values);

        setErrors(_errors)
        isSubmitValido(Object.keys(_errors).length === 0 ? true : false)
        if (submitValido) navigate('/finish')
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
        <div>
            <div className='form-header'>
                <h1>Falta pouco...</h1>
                <p>Preencha os dados abaixo para garantir que seu pacote venha at?? voc?? em seguran??a!</p>
            </div>
            <form onSubmit={handleSubmit} className="form-body">
                <div className='container-form'>
                    <div style={{ padding: '16px' }}>
                        <Label className="container-label float" text="Dados pessoais:" /><br /><br />
                        <Label text="Nome *" />
                        <InputField
                            className={errors?.primeiroNome != null ? 'error-input' : ''}
                            type="text"
                            id="primeiroNome"
                            placeholder="Primeiro Nome"
                            onInput={handleInput}
                            error={errors?.primeiroNome != null ? <>{errors.primeiroNome[0]}</> : null}
                        />

                        <InputField
                            className={errors?.ultimoNome != null ? 'error-input' : ''}
                            type="text"
                            id="ultimoNome"
                            placeholder="??ltimo Nome"
                            onInput={handleInput}
                            error={errors?.ultimoNome != null ? <>{errors.ultimoNome[0]}</> : null}
                        /><br />

                        <Label text="Email *" />
                        <InputField
                            className={errors?.email != null ? 'error-input' : ''}
                            type="email"
                            id="email"
                            placeholder="ex: meuEmail199@exemplo.com"
                            onInput={handleInput}
                            error={errors?.email != null ? <>{errors.email[0]}</> : null}
                        /><br />

                        <Label text="Telefone celular*" />
                        <InputField
                            className={errors?.telefone != null ? 'error-input' : ''}
                            type="phone"
                            id="telefone"
                            mask='(99) 99999-9999'
                            placeholder='ex: (11) 98888-7777'
                            onInput={handleInput}
                            error={errors?.telefone != null ? <>{errors.telefone[1]}</> : null}
                        /><br />
                    </div>
                    <br />
                    <div className='container-colorA'>
                        <Label className="container-label float" text="Endere??o de entrega:" />
                        <div className='row'>
                            <Label text="CEP *" className="label-cep" /><a
                                href="https://buscacepinter.correios.com.br/app/endereco/index.php"
                                target="_blank" className='notes'>N??o sei meu cep.</a>
                        </div>
                        <InputField
                            className={errors?.cep != null ? 'error-input' : ''}
                            type="text"
                            id="cep"
                            mask='99999-999'
                            placeholder='ex: 01001-000'
                            onInput={handleInputCep}
                            error={
                                errors?.cep != null ? <>{errors.cep[0]}</>
                                    : <> {cepValido ? null : eventCep ? 'Cep n??o encontrado.'
                                        : null}</>
                            }
                        /><br />
                        {
                            cepValido ?
                                <><InputAddress
                                    rua={values.rua}
                                    bairro={values.bairro}
                                    cidade={values.cidade}
                                    uf={values.uf}
                                />
                                </>
                                : null
                        }
                    </div>
                    {
                        cepValido ?
                            <div className='container-colorA'>
                                <Label text="N??mero *" />
                                <InputField
                                    className={errors?.numero != null ? 'error-input' : ''}
                                    type="text"
                                    id="numero"
                                    placeholder="ex: 526A"
                                    onInput={handleInput}
                                    error={errors?.numero != null ? <>{errors.numero[0]}</> : null}
                                /><br />

                                <Label text="Complemento" />
                                <InputField
                                    type="text"
                                    id="complemento"
                                    placeholder="ex: Apto. 215B"
                                    onInput={handleInput}
                                /><br />
                            </div>
                            : null
                    }
                    <div className='container-colorB'>
                        <input
                            type="checkbox"
                            id="check-terms"
                            onChange={() => setTerms(!terms)}
                        />
                        <label>Concordo com os Termos e Condi????es</label>{eventSubmit ? terms ? null : <p className='error-message'> Este campo ?? obrigat??rio</p> : null}
                        <br />
                        <input
                            type="checkbox"
                            id="check-communication"
                            onChange={() => setNewsletter(!newsletter)}
                        />
                        <label>Desejo receber mensagens sobre meu pedido</label>
                        <br></br><br></br>

                        <div className='submit'>
                            <input type="submit" style={
                                {
                                    backgroundColor: "chartreuse",
                                    padding: "8px",
                                    borderRadius: "8px",
                                    fontSize: "medium",
                                    fontWeight: "600"
                                }
                            } />
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Form