import React, { useEffect, useState } from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export default function Grade() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [grades, setGrades] = useState([])

    const [gradeId, setGradeId] = useState('')
    const [grade, setGrade] = useState('')
    const [examDate, setExamDate] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [professorId, setprofessorId] = useState('')
    const [studentId, setStudentId] = useState('')
    const [subjectId, setSubjectId] = useState('')
    const [active, setActive] = useState(true)


    const handleClick = (e) => {
        e.preventDefault()
        const student = { grade, examDate, professorId, studentId, subjectId, active }
        console.log(student)
        fetch("http://localhost:8080/api/grades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)

        }).then(() => {
            console.log("New Grade added")
        })
    }

    const handleChange = (newValue) => {
        setExamDate(newValue);
      };

    useEffect(() => {
        fetch("http://localhost:8080/api/grades")
            .then(res => res.json())
            .then((result) => {
                setGrades(result);
            }
            )
    }, [])
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Grade</u></h1>

                <form noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Grade value" variant="outlined" fullWidth
                        value={grade}
                        onChange={(e) => setGrade(e.target.value)}
                    />
                    <DesktopDatePicker
                        label="Date desktop"
                        inputFormat="MM/DD/YYYY"
                        value={examDate}
                        onChange={handleChange}
                        renderInput={(params) => <TextField {...params} />}
                    />
                    <TextField id="outlined-basic" label="Professor Id" variant="outlined" fullWidth
                        value={professorId}
                        onChange={(e) => setprofessorId(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Exam Date" variant="outlined" fullWidth
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Exam Date" variant="outlined" fullWidth
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                    />
                    {/* <TextField id="outlined-basic" label="Exam Date" variant="outlined" fullWidth
                        value={active}
                        onChange={(e) => setActive(e.target.value)}
                    /> */}

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

                    </Paper>
                ))
                }
            </Paper>
        </Container>
        </LocalizationProvider>
    );
}