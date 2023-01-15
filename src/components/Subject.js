import React, { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { TableRow, Table, TableCell, TableContainer, TableHead, TableBody } from '@mui/material';
import SearchBar from './Search/SearchBar';

export default function Subject() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }

    const [subjects, setSubjects] = useState([])
    const [subjectTypes, setSubjectTypes] = useState([])

    const [subjectId, setSubjectId] = useState('')
    const [subjectName, setSubjectName] = useState('')
    const [subjectTypeId, setSubjectTypeId] = useState('')
    const [active, setActive] = useState(true)
    const [subjectDescription, setSubjectDescription] = useState('')


    const [rows, setRows] = useState(subjects);
    const [searched, setSearched] = useState("");

    console.log(rows)
    const requestSearch = (searchedVal) => {
        const filteredRows = subjects.filter((row) => {
            return row.subjectName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleChange = (event) => {
        setSubjectTypeId(event.target.value);
        // console.log(subjectTypeId)
    };


    const handleClick = (e) => {
        e.preventDefault()
        const subject = { subjectName, subjectTypeId, active, subjectDescription }
        console.log(subject)
        fetch("http://localhost:8080/api/subjects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subject)

        }).then(() => {
            console.log("New Student added")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/subjects")
            .then(res => res.json())
            .then((result) => {
                setSubjects(result);
                setRows(result);
            }

            )


        fetch("http://localhost:8080/api/subjecttypes")
            .then(res => res.json())
            .then((result) => {
                setSubjectTypes(result);
                console.log(result);
            }
            )
    }, [])
    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Subject</u></h1>

                <form noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Subject Name " variant="outlined" fullWidth
                        value={subjectName}
                        onChange={(e) => setSubjectName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Subject Description" variant="outlined" fullWidth
                        value={subjectDescription}
                        onChange={(e) => setSubjectDescription(e.target.value)}
                    />




                    <Box sx={{ minWidth: 120 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={subjectTypeId}
                            label="Age"
                            onChange={handleChange}

                        >
                            {subjectTypes.map(subjectType => (<MenuItem value={subjectType.subjectTypeId}>{subjectType.subjectTypeId}</MenuItem>)
                            )
                            }
                        </Select>

                    </Box>
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>

            </Paper>
            <h1>Subjects</h1>

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
                                <TableCell>Subjects Ids</TableCell>
                                <TableCell align="right">Subject name</TableCell>
                                <TableCell align="right">Subject Description&nbsp;(g)</TableCell>
                                <TableCell align="right">Active&nbsp;(g)</TableCell>
                                <TableCell align="right">SubjectType&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((subject) => (
                                    <TableRow key={subject.subjectName}>
                                        <TableCell component="th" scope="row">
                                            {subject.subjectName}
                                        </TableCell>
                                        <TableCell align="right">{subject.subjectDescription}</TableCell>
                                        <TableCell align="right">{subject.active}</TableCell>
                                        <TableCell align="right">{subject.subjectTypeId}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}