import React, { useEffect, useState } from 'react';

import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
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

    const [grade, setGrade] = useState('')
    const [examDate, setExamDate] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [professorId, setprofessorId] = useState()
    const [studentId, setStudentId] = useState()
    const [subjectId, setSubjectId] = useState()
    const [active, setActive] = useState(true)

    const [rows, setRows] = useState([]);

    const [searched, setSearched] = useState("");

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
                        <TextField id="outlined-basic" label="Professor Id" variant="outlined" fullWidth
                            value={professorId}
                            onChange={(e) => setprofessorId(e.target.value)}
                        />
                        <TextField id="outlined-basic" label="Student Id" variant="outlined" fullWidth
                            value={studentId}
                            onChange={(e) => setStudentId(e.target.value)}
                        />

                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={professorId}
                            label="Age"
                            onChange={handleChange}
                        >
                            {professors.filter((v, i, a) => a.indexOf(v) === i).map(professor => (<MenuItem value={professor.professorId}>{professor.lastName + " " + professor.firstName}</MenuItem>)
                            )
                            }
                        </Select>

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
                                    <TableCell>Grade)</TableCell>
                                    <TableCell align="right">gradeId</TableCell>
                                    <TableCell align="right">professordId)</TableCell>
                                    <TableCell align="right">studentId</TableCell>
                                    <TableCell align="right">subjectId</TableCell>
                                    <TableCell align="right">examDate</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((grade) => (

                                        <TableRow key={grade.gradeId}>
                                            <TableCell component="th" scope="row">
                                                {grade.grade}
                                            </TableCell>
                                            <TableCell align="right">{grade.examDate} </TableCell>
                                            <TableCell align="right">{grade.gradeId}</TableCell>
                                            <TableCell align="right">{grade.professorId}</TableCell>
                                            <TableCell align="right">{grade.studentId}</TableCell>
                                            <TableCell align="right">{grade.subjectId}</TableCell>
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