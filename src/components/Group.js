import React, { useEffect, useState } from 'react';

import SearchBar from './Search/SearchBar';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import { TableRow, Table, TableCell, TableContainer, TableHead, TableBody } from '@mui/material';

export default function Group() {
    const paperStyle = { padding: '50px 20px', width: 600, margin: "20px auto" }

    const [groups, setGroups] = useState([])

    const [groupTypes, setGroupTypes] = useState([])

    const [groupId, setGradeId] = useState('')
    const [groupTypeId, setGroupTypeId] = useState('');
    const [fullname, setFullName] = useState('');
    const [active, setActive] = useState(true)



    const [rows, setRows] = useState(groups);
    const [searched, setSearched] = useState("");


    const requestSearch = (searchedVal) => {
        const filteredRows = groups.filter((row) => {
            return row.fullname.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
    };


    const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
    };



    const handleClick = (e) => {
        e.preventDefault()
        const groupToPost = { fullname, groupTypeId, active }
        console.log(groupToPost)
        console.log(JSON.stringify(groupToPost))
        fetch("http://localhost:8080/api/groups", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(groupToPost)

        }).then(() => {
            console.log("New Student added")
        })
    }

    useEffect(() => {
        fetch("http://localhost:8080/api/groups")
            .then(res => res.json())
            .then((result) => {
                setGroups(result);
                setRows(result)
            }
            )

        fetch("http://localhost:8080/api/grouptypes")
            .then(res => res.json())
            .then((result) => {
                setGroupTypes(result);

            }
            )

    }, [])

    const handleChange = (event) => {
        setGroupTypeId(event.target.value);
        console.log(groupTypeId)
    };
    return (

        <Container>
            <Paper elevation={3} style={paperStyle}>
                <h1 style={{ color: "blue" }}><u>Add group</u></h1>

                <form noValidate autoComplete="off">

                    <TextField id="outlined-basic" label="Group Name" variant="outlined" fullWidth
                        value={fullname}
                        onChange={(e) => setFullName(e.target.value)}

                    />
                    <Box sx={{ minWidth: 120 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={groupTypeId}
                            label="Age"
                            onChange={handleChange}

                        >
                            {groupTypes.map(groupType => (<MenuItem value={groupType.groupTypeId}>{groupType.fullname}</MenuItem>)
                            )
                            }
                        </Select>

                    </Box>
                    <Button variant="contained" color="secondary" onClick={handleClick}>
                        Submit
                    </Button>
                </form>

            </Paper>
            <h1>Groups</h1>

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
                            {console.log(rows)}
                            {rows.map((group) => (
                                <TableRow key={group.fullname}>
                                    <TableCell component="th" scope="row">
                                        {group.fullname}
                                    </TableCell>
                                    <TableCell align="right">{group.groupTypeId}</TableCell>
                                    <TableCell align="right">{group.groupId}</TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
        </Container>
    );
}