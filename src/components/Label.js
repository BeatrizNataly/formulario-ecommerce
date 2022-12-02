function Label({text, className}){
    return(
        <>
            <label className={className != null ? className : 'label-style'}>{text}</label>
        </>
    )
}

export default Label