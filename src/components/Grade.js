import React, { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';


export default function Grade() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [grades, setGrades] = useState([])

    const [gradeId, setGradeId] = useState('')
    const [grade, setGrade] = useState('')
    const [examDate, setExamDate] = useState('')
    const [professorId, setprofessorId] = useState('')
    const [studentId, setStudentId] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [active, setActive] = useState()


    const handleClick = (e) => {
        e.preventDefault()
        const student = { name, address }
        console.log(student)
        // fetch("http://localhost:8080/student/add", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(student)

        // }).then(() => {
        //     console.log("New Student added")
        // })
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/grades")
            .then(res => res.json())
            .then((result) => {
                setGrades(result);
            }
            )
    }, [])
    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Student</u></h1>

                <form noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>

            </Paper>
            <h1>Grades</h1>

            <Paper elevation={3} style={paperStyle}>

                {grades.map(grade => (
                    <Paper elevation={6} style={{ margin: "10px", padding: "15px", textAlign: "left" }} key={grade.gradeId}>
                        Id: {grade.gradeId}<br />
                        Name: {grade.grade}<br />
                        ExamDate: {grade.examDate}<br />
                        professorId: {grade.professorId}<br />
                        studentId: {grade.studentId}<br />
                        subjectId: {grade.subjectId}<br />
                        active: {grade.active}<br />

                    </Paper>
                ))
                }
            </Paper>
        </Container>
    );
}