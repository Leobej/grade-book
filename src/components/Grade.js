import React, { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import { FormControl, InputLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Select from '@mui/material/Select';
import SearchBar from './Search/SearchBar';



export default function Grade() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }

    const [grades, setGrades] = useState([])
    const [professors, setProfessors] = useState([])
    const [students, setStudents] = useState([])
    const [subjects, setSubjects] = useState([])

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
  

    const [grade, setGrade] = useState('')
    const [examDate, setExamDate] = React.useState(dayjs("2022-01-17"));
    const [professorId, setprofessorId] = useState()
    const [studentId, setStudentId] = useState()
    const [subjectId, setSubjectId] = useState()
    const [active, setActive] = useState(true)
    const [rows, setRows] = useState([]);
    const [searched, setSearched] = useState("");
    const [toDelete, setToDelete] = useState()

    const onClickDelete = (deleted) => {
        console.log(deleted)
        fetch("http://localhost:8080/api/grades" + "/" + deleted.toString(), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(groupType)

        }).then(() => {
            console.log("New Student added")
        })
    }
    const requestSearch = (searchedVal) => {
        const filteredRows = grades.filter((row) => {
            return row.examDate.toLowerCase().includes(searchedVal.toLowerCase());
        });
        console.log(grades);
        setRows(filteredRows);
    };


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };



    const handleClick = (e) => {

        e.preventDefault()
        const gradeObj = { grade, examDate, professorId, studentId, subjectId, active }
        console.log(gradeObj)
        fetch("http://localhost:8080/api/grades", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(gradeObj)

        }).then(() => {
            console.log("New Grade added")
        })

        setGrade('');
    
    }

    const handleDatePicker = (newValue) => {
        setExamDate(newValue);
    };

    const handleChange = (event) => {
        setprofessorId(event.target.value);
    };

    useEffect(() => {
        fetch("http://localhost:8080/api/grades")
            .then(res => res.json())
            .then((result) => {
                setGrades(result);
                setRows(result)
            }
            )

        fetch("http://localhost:8080/api/professors")
            .then(res => res.json())
            .then((result) => {
                setProfessors(result);
            }

            )

        fetch("http://localhost:8080/api/students")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
            }

            )

        fetch("http://localhost:8080/api/subjects")
            .then(res => res.json())
            .then((result) => {
                setSubjects(result);
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
                        <DesktopDatePicker sx={{ width: "100px" }}
                            label="Date desktop"
                            inputFormat="MM/DD/YYYY"
                            value={examDate}
                            onChange={handleDatePicker}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Box>
                            <FormControl>
                                <InputLabel >Student</InputLabel>
                                <Select sx={{ width: 240 }}
                                    labelId="Student"
                                    id="demo-simple-select"
                                    value={studentId}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    {students.filter((v, i, a) => a.indexOf(v) === i).map(student => (<MenuItem value={student.studentId}>{student.lastName + " " + student.firstName}</MenuItem>)
                                    )
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <InputLabel >Professor</InputLabel>
                                <Select sx={{ width: 240 }}
                                    labelId="Professor"
                                    id="demo-simple-select"
                                    value={professorId}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    {professors.filter((v, i, a) => a.indexOf(v) === i).map(professor => (<MenuItem value={professor.professorId}>{professor.lastName + " " + professor.firstName}</MenuItem>)
                                    )
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                        <Box>
                            <FormControl>
                                <InputLabel >Subject</InputLabel>
                                <Select sx={{ width: 240 }}
                                    labelId="Professor"
                                    id="demo-simple-select"
                                    value={subjectId}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    {subjects.filter((v, i, a) => a.indexOf(v) === i).map(subject => (<MenuItem value={subject.professorId}>{subject.subjectName}</MenuItem>)
                                    )
                                    }
                                </Select>
                            </FormControl>
                        </Box>

                        <Button variant="contained" color="secondary" onClick={handleClick}>
                            Submit
                        </Button>
                    </form>

                </Paper>
                <h1>Grades</h1>
                <Paper>
                    <SearchBar
                        value={searched}
                        onChange={requestSearch}
                        onCancelSearch={() => cancelSearch()}
                    />
                    <TableContainer>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Grade Id</TableCell>
                                    <TableCell align="right"> Grade</TableCell>
                                    <TableCell align="right">Exam Date</TableCell>
                                    <TableCell align="right">Professor Id)</TableCell>
                                    <TableCell align="right">Student Id</TableCell>
                                    <TableCell align="right">Subject Id</TableCell>
                                    {/* <TableCell align="right">Active</TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.filter(grade => grade.active.toString() === "true").map((grade) => (

                                        <TableRow key={grade.gradeId}>
                                            <TableCell component="th" scope="row">
                                                {grade.gradeId}
                                            </TableCell>
                                            <TableCell align="right">  {grade.grade}</TableCell>
                                            <TableCell align="right">{grade.examDate} </TableCell>
                                            <TableCell align="right">{grade.professorId}</TableCell>
                                            <TableCell align="right">{grade.studentId}</TableCell>
                                            <TableCell align="right">{grade.subjectId}</TableCell>
                                            {/* <TableCell align="right">{grade.active.toString()}</TableCell> */}
                                            <Button onClick={() => onClickDelete(grade.gradeId)}>Delete</Button>

                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
                <br />



            </Container>
        </LocalizationProvider>
    );
}