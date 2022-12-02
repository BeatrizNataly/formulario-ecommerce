import InputMask from 'react-input-mask';

function InputField(props){
    const {type, id, placeholder, onInput, error} = props
    return(
        <div className='container-input'>
            <InputMask
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                onInput={onInput}
                {...props}
            />
            <p className='error-message'>{error}</p>
        </div>
    )
}

export default InputField