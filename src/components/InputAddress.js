import SelectUF from '../components/SelectUF';
import InputField from '../components/InputField';
import Label from '../components/Label';

function InputAddress(props){
    const {rua, bairro, cidade, uf} = props
    return (
        <>
        <Label text="Rua *" />
                <InputField
                    type="text"
                    id="rua"
                    value={rua}
                    readOnly
                    />
                <br />

                <Label text="Bairro *" />
                <InputField
                    type="text"
                    id="bairro"
                    value={bairro}
                    readOnly
                    />
                <br />

                <Label text="Cidade *" />
                <InputField
                    type="text"
                    id="cidade"
                    value={cidade}
                    readOnly
                    />
                <br />

                <SelectUF selected={uf}/>

                <br /><br />
        </>
    )
}

export default InputAddress