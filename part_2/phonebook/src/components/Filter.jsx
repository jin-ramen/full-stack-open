const Filter = ({ value, handler }) => (
    <form>
        <div>
            filter shown with 
            <input 
                value={value}
                onChange={handler}
            />
        </div>
    </form>
)

export default Filter