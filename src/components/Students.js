import React, { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { TableRow, Table, TableCell, TableContainer, TableHead, TableBody } from '@mui/material';
import { FormControl, InputLabel } from '@mui/material';
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
    const [active, setActive] = useState(true)
    const [cnp, setCNP] = useState('')
    const [groupId, setGroupId] = useState('')


    const handleClick = (e) => {
        e.preventDefault()
        const student = { firstName, lastName, cnp, email, active, groupId }
        console.log(student)
        fetch("http://localhost:8080/api/students", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)

        }).then(() => {
            console.log("New Student added")
        })
        setLastName("")
        setFirstName("")
        setEmail("")
        setCNP("")

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
            return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
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

    const onClickDelete = (deleted) => {
        console.log(deleted)
        fetch("http://localhost:8080/api/students" + "/" + deleted.toString(), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(groupType)

        }).then(() => {
            console.log("New Student added")
        })
    }

    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add Student</u></h1>

                <form noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Firstname" variant="outlined" fullWidth
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Lastname" variant="outlined" fullWidth
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="CNP" variant="outlined" fullWidth
                        value={cnp}
                        onChange={(e) => setCNP(e.target.value)}
                    />

                    <Box sx={{ width: 240 }}>
                        <FormControl>
                            <InputLabel>Group Name</InputLabel>
                        <Select sx={{ width: 240 }}
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={groupId}
                            label="Age"
                            onChange={handleChange}

                        >
                            {groups.map(group => (<MenuItem value={group.groupId}>{group.fullname}</MenuItem>)
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
                                <TableCell>Student ID</TableCell>
                                <TableCell align="right">First  name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                {/* <TableCell align="right">Active</TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((student) => (
                                    <TableRow key={student.studentId}>
                                        <TableCell component="th" scope="row">
                                            {student.studentId}</TableCell>
                                        <TableCell component="th" scope="row">
                                            {student.firstName}
                                        </TableCell>
                                        <TableCell align="right">{student.lastName}</TableCell>
                                        <TableCell align="right">{student.email}</TableCell>
                                        {/* <TableCell align="right">{student.active.toString()}</TableCell> */}
                                        <Button onClick={() => onClickDelete(student.studentId)}>Delete</Button>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}