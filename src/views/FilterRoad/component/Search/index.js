import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
        width: '96%'
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    button: {
        marginTop: '16px'
    },
}));

export default function SimpleSelect() {
  const classes = useStyles();
  return (
    <form className={classes.root} autoComplete="off">
        <h3 style={{margin: '8px'}}>Search</h3>
        <Grid container spacing={3}>
            <Grid item xs={12} md={2} lg={2}>
                <FormControl className={classes.formControl}>
                    <InputLabel>
                        Districts
                    </InputLabel>
                    <Select
                    displayEmpty
                    name="age"
                    className={classes.selectEmpty}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
                <FormControl className={classes.formControl}>
                    <InputLabel>
                        Communes
                    </InputLabel>
                    <Select
                    displayEmpty
                    name="age"
                    className={classes.selectEmpty}
                    >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
                <FormControl  className={classes.formControl}>
                    <InputLabel htmlFor="adornment-amount">Street</InputLabel>
                        <Input
                        startAdornment={<InputAdornment position="start">#</InputAdornment>}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} md={2} lg={2}>
                <Button variant="contained" color="primary" className={classes.button}>
                    Search
                </Button>
            </Grid>     
        </Grid>
    </form>
  );
}
