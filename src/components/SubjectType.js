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



export default function SubjectType() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [subjectTypes, setSubjectTypes] = useState([])


    const [subjectTypeId, setSubjectTypeId] = useState('')
    const [active, setActive] = useState(true)

    const [rows, setRows] = useState(subjectTypes);
    const [searched, setSearched] = useState("");

    console.log(rows)
    const requestSearch = (searchedVal) => {
        const filteredRows = subjectTypes.filter((row) => {
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
        const subjectType = { active }
        console.log(subjectType)
        fetch("http://localhost:8080/api/subjecttypes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(subjectType)

        }).then(() => {
            console.log("New Student added")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/subjecttypes")
            .then(res => res.json())
            .then((result) => {
                setSubjectTypes(result);
                setRows(result)
            }
            )
    }, [])

    const onClickDelete = (deleted) => {
        console.log(deleted)
        fetch("http://localhost:8080/api/subjecttypes" + "/" + deleted.toString(), {
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
                <h1 style={{ color: "blue" }}><u>Add Subject Type</u></h1>

                <form noValidate autoComplete="off">

                    {/* <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField id="outlined-basic" label="Student Adress" variant="outlined" fullWidth
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    /> */}
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>

            </Paper>
            <h1>Subject Types</h1>

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
                                <TableCell>Subjects Type Ids</TableCell>
                                <TableCell align="center">Subject Type active</TableCell>


                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                rows.map((subjectType) => (
                                    <TableRow key={subjectType.subjectTypeId}>
                                        <TableCell component="th" scope="row">
                                            {subjectType.subjectTypeId}
                                        </TableCell>

                                        <TableCell align="right">{subjectType.active}</TableCell>
                                        <Button onClick={() => onClickDelete(subjectType.subjectTypeId)}>Delete</Button>

                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}