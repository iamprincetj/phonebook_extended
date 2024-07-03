const PersonForm = ({ handleName, handleNumber, handleSumbit, name, number }) => {
    return (
        <>
            <form onSubmit={handleSumbit}>
                <div>
                name: <input value={name}  onChange={handleName} />
                </div>
                <div>
                number: <input value={number} onChange={handleNumber} />
                </div>
                <div>
                <button type="submit">add</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm