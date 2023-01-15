import React, { useEffect, useState } from 'react';


import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SearchBar from './Search/SearchBar';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { TableRow, Table, TableCell, TableContainer, TableHead, TableBody } from '@mui/material';

export default function GroupType() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [groupTypes, setGroupTypes] = useState([])


    const [groupTypeId, setGroupTypeId] = useState('');
    const [fullname, setFullName] = useState('');
    const [active, setActive] = useState(true)


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

    const [rows, setRows] = useState(groupTypes);
    const [searched, setSearched] = useState("");


    const requestSearch = (searchedVal) => {
        const filteredRows = groupTypes.filter((row) => {
            return row.name.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };



    useEffect(() => {
        fetch("http://localhost:8080/api/grouptypes")
            .then(res => res.json())
            .then((result) => {
                setGroupTypes(result);
                setRows(result)
            }
            )
    }, [])

    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add group type</u></h1>

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
            <h1>Group Types</h1>

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
                                <TableCell>Food (100g serving)</TableCell>
                                <TableCell align="right">Calories</TableCell>
                                <TableCell align="right">Fat&nbsp;(g)</TableCell>
                                <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                                <TableCell align="right">Protein&nbsp;(g)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {groupTypes.map((grade) => (
                                <TableRow key={grade.fullname}>
                                    <TableCell component="th" scope="row">
                                        {grade.fullname}
                                    </TableCell>
                                    <TableCell align="right">{grade.groupTypeId}</TableCell>
                                    <TableCell align="right">{grade.professorId}</TableCell>
                                    <TableCell align="right">{grade.studentId}</TableCell>
                                    <TableCell align="right">{grade.subjectId}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </Container>
    );
}