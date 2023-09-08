import React from 'react';

const Header = (props) => {
    return (
        <h1>{props.course.name}</h1>
    )
}

const Part = (props) => {
    return (
        <p>
            {props.part.name} {props.part.exercises}
        </p>
    )
}
const Content = ({ parts }) => {
    return (
        parts.map((part) => <Part key={part.id} part={part} />)
    )
}
const Total = ({ parts }) => {
    let total = parts.reduce((accumulator, currentPart) => {
        return accumulator + currentPart.exercises;
    }, 0);
    return (
        <b>total of {total} exercises</b>
    )
}
const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course;
