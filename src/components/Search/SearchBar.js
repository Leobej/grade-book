import React from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

const SearchBar = (props) => {

    const [searchedString, setSearchedString] = useState("");
    const onHandleChange = (e) => {
        setSearchedString(e.currentTarget.value)
        props.onChange(e.currentTarget.value)
    }

    return (
        <FormControl sx={{ m: 2, width: '100ch' }}>
            <InputLabel htmlFor='outlined-adornment-amount'>Search filter</InputLabel>
            <OutlinedInput
                id='outlined-adornment-amount'
                onChange={(e) => {onHandleChange(e) }}
                value={searchedString}
                startAdornment={
                    <InputAdornment position='end'>
                        <SearchIcon />
                    </InputAdornment>
                }
                label='Search'
            />
        </FormControl>
    );
};

export default SearchBar;