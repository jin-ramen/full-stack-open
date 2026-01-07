const Part = ({ part }) => {
    console.log('part component', part)
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

export default Part