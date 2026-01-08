const QueryForm = ({ query, handleQuery}) => {
    return (
        <form>
        <div>
            find countries 
            <input 
            value={query}
            onChange={handleQuery}
            />
        </div>
        </form>
    )
}

export default QueryForm