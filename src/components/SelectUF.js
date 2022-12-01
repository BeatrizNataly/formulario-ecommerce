import OptionsUF from "./OptionsUF";

function SelectUF(props) {
    const { selected } = props;
    return (
        <>
            <label>UF </label>
            {
                selected === '' ?
                    <select disabled={false}>
                        <OptionsUF />
                    </select>
                    :
                    <select disabled>
                        <option value={selected} defaultValue>{selected}</option>
                    </select>
            }
        </>
    )
}

export default SelectUF