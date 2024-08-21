const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ parts }) =>  <b> total of {parts.reduce((acc,part)=> acc + part.exercises, 0)} exercises</b>

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Content = ({ parts }) => {

    return (
        <div>
        {parts.map(part => <Part 
        key={part.id}
        part={part.name}
        exercises={part.exercises}
        />
        )}
        </div>
    )
    }

const Course = ({ course }) => {

    const {id, name, parts} = course;

    return (
        <div
        key = {id}>
        <Header course={name} />
        <Content parts={parts}/>
        <Total parts={parts} />
        </div>
    )
    }

export default Course