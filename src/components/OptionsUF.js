const UF_BR = [' selecionar ', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF',
    'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE',
    'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'];

function SelectComponents(){
    return(
        UF_BR.map(item => {
        return <option key={item} value={item}>{item}</option>
        })
    )
 
}

export default SelectComponents