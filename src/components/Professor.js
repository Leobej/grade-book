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
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';

export default function Professor() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }
    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [professors, setProfessors] = useState([])

    const [professorId, setProfessorId] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [employmentYear, setEmploymentYear] = React.useState(dayjs('2014-08-18T21:11:54'));
    const [active, setActive] = useState(true)
    const [cnp, setCNP] = useState('')



    const handleClick = (e) => {
        e.preventDefault()
        const student = { firstName, lastName, employmentYear, active, cnp }
        console.log(student)
        fetch("http://localhost:8080/api/professors", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(student)

        }).then(() => {
            console.log("New Student added")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/professors")
            .then(res => res.json())
            .then((result) => {
                setProfessors(result);
                setRows(result)
            }
            )
    }, [])

    const [rows, setRows] = useState(professors);
    const [searched, setSearched] = useState("");

    console.log(rows)
    const requestSearch = (searchedVal) => {
        const filteredRows = professors.filter((row) => {
            return row.firstName.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const handleDatePicker = (newValue) => {
        setEmploymentYear(newValue);
    };

    const onClickDelete = (deleted) => {
        console.log(deleted)
        fetch("http://localhost:8080/api/professors" + "/" + deleted.toString(), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(groupType)

        }).then(() => {
            console.log("New Student added")
        })
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Container>
                <Paper elevation={3} style={paperStyle}>
                    <h1 style={{ color: "blue" }}><u>Add Professor</u></h1>

                    <form noValidate autoComplete="off">

                        <TextField id="outlined-basic" label="First Name" variant="outlined" fullWidth
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <TextField id="outlined-basic" label="Last Name" variant="outlined" fullWidth
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <TextField id="outlined-basic" label="CNP" variant="outlined" fullWidth
                            value={cnp}
                            onChange={(e) => setCNP(e.target.value)}
                        />
                        <DesktopDatePicker sx={{ width: "100px" }}
                            label="Date desktop"
                            inputFormat="MM/DD/YYYY"
                            value={employmentYear}
                            onChange={handleDatePicker}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <Button variant="contained" color="secondary" onClick={handleClick}>
                            Submit
                        </Button>
                    </form>

                </Paper>
                <h1>Professors</h1>

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
                                    <TableCell align="right">First  name</TableCell>
                                    <TableCell align="right">Last Name</TableCell>
                                    <TableCell align="right">Employment Year</TableCell>
                                    <TableCell align="right">Active</TableCell>
                                    <TableCell align="right">CNP</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    rows.map((professor) => (
                                        <TableRow key={professor.professorId}>
                                            <TableCell component="th" scope="row">{professor.professorId}</TableCell>
                                            <TableCell align="right">{professor.firstName}</TableCell>
                                            <TableCell align="right">{professor.lastName}</TableCell>
                                            <TableCell align="right">{professor.employmentYear}</TableCell>
                                            <TableCell align="right">{professor.active}</TableCell>
                                               <TableCell align="right">{professor.cnp}</TableCell>
                                            <Button onClick={() => onClickDelete(professor.professorId)}>Delete</Button>

                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Paper>
            </Container>
        </LocalizationProvider>
    );
}