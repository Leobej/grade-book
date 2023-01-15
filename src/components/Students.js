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


export default function Student() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [students, setStudents] = useState([])

    const [groups, setGroups] = useState([])

    const [studentId, setStudentId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [active, setActive] = useState()
    const [cnp, setCNP] = useState('')
    const [groupId, setGroupId] = useState('')


    const handleClick = (e) => {
        e.preventDefault()
        const student = { name, address }
        console.log(student)
        fetch("http://localhost:8080/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)

        }).then(() => {
            console.log("New Student added")
        })
    }


    useEffect(() => {
        fetch("http://localhost:8080/api/students")
            .then(res => res.json())
            .then((result) => {
                setStudents(result);
                setRows(result)
            }
            )
        fetch("http://localhost:8080/api/groups")
            .then(res => res.json())
            .then((result) => {
                setGroups(result);
                console.log(result);
            }
            )
    }, [])

    const [rows, setRows] = useState(students);
    const [searched, setSearched] = useState("");

    console.log(rows)
    const requestSearch = (searchedVal) => {
        const filteredRows = students.filter((row) => {
            return row.subjectName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleChange = (event) => {
        setGroupId(event.target.value);
        // console.log(subjectTypeId)
    };



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
            <h1>Students</h1>

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
                                <TableCell align="right">Subject Description</TableCell>
                                <TableCell align="right">Active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((subject) => (
                                    <TableRow key={subject.firstName}>
                                        <TableCell component="th" scope="row">
                                            {subject.firstName}
                                        </TableCell>
                                        <TableCell align="right">{subject.lastName}</TableCell>
                                        <TableCell align="right">{subject.email}</TableCell>
                                        <TableCell align="right">{subject.active}</TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}