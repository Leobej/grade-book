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
    const [toDelete, setToDelete] = useState()

    const handleClick = (e) => {
        e.preventDefault()
        const groupType = { fullname }
        console.log(groupType)
        fetch("http://localhost:8080/api/grouptypes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(groupType)

        }).then(() => {
            console.log("New Student added")
        })
    }

    const [rows, setRows] = useState(groupTypes);
    const [searched, setSearched] = useState("");


    const requestSearch = (searchedVal) => {
        const filteredRows = groupTypes.filter((row) => {
            return row.fullname.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };

    const onClickDelete = (deleted) => {
        console.log(deleted)
        fetch("http://localhost:8080/api/grouptypes" + "/" + deleted.toString(), {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            // body: JSON.stringify(groupType)

        }).then(() => {
            console.log("New Student added")
        })
    }

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

                    <TextField id="outlined-basic" label="Group Type Name" variant="outlined" fullWidth
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}
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
                                <TableCell>Group Type Id</TableCell>
                                <TableCell align="right">Group Type name</TableCell>
                                {/* <TableCell align="right">Active</TableCell> */}

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((groupType) => (
                                <TableRow key={groupType.groupTypeId}>
                                    <TableCell component="th" scope="row" >{groupType.groupTypeId}</TableCell>
                                    <TableCell align="right"> {groupType.fullname}</TableCell>
                                    {/* <TableCell align="right">{groupType.active.toString()}</TableCell> */}
                                    <Button onClick={()=>onClickDelete(groupType.groupTypeId) }>Delete</Button>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

        </Container>
    );
}