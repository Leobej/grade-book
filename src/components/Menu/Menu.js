import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from "react-router-dom";


export default function Menu() {

    return (
        <div>
            <Toolbar variant="dense" style={{ background: 'grey' }}>
                <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }} style={{}}>
                    <Link to="/grade">Grade</Link><br />
                </Typography>

                <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
                    <Link to="/group">Group</Link><br />
                </Typography>

                <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
                <Link to="/grouptype">Group Type</Link><br />
                </Typography>

                <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
                <Link to="/professor">Professor</Link><br />
                </Typography>

                <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
                <Link to="/student">Student</Link><br />
                </Typography>

                <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
                <Link to="/subject">Subject</Link><br />
                </Typography>

                <Typography variant="h6" color="inherit" component="div" sx={{ mr: 2 }}>
                <Link to="/subjecttype">Subject Type</Link><br />
                </Typography>
               
            </Toolbar>
           
        </div>
    );
}