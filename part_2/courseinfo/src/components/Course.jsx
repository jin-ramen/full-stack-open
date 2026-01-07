import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) => {
    console.log('course component', course)
    return (
        <div key={course.id}>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    )
}

export default Course