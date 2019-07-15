import React from 'react';
import Dashboard from '../../layout/Dashboard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from'@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import arraySort from 'array-sort';

import communes from '../../componentV/Address/Communes';
import districts from '../../componentV/Address/Disticts';
import GoogleMap from './component/Map';


const useStyles = makeStyles(theme => ({
    root: {
        padding: '5px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        marginBottom:20,
        flexGrow: 1
    },
    search:{
        paddingLeft: 10,
        paddingRight: 10
    },
    divider: {
        width: 1,
        height: 28,
        margin: 4,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    margin:{
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    }
}));

function Contact() {
    const classes = useStyles();
    const [address, setAddress] = React.useState({
        districts, 
        communes
    });
    const [selected, setSelected] = React.useState({
        district:'',
        commune:''
    });

    const districtsList = address.districts.map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_kh} - {_name_en} </MenuItem> );
    const communesList = address.communes.map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_kh} - {_name_en} </MenuItem> );


    const handleChange = (event) => {
        setSelected({...selected,commune:'', [event.target.name]: event.target.value})
    }
    
    React.useEffect(() => {
        const start = selected.district.padEnd(6,'0')
        const end = selected.district.padEnd(6,'9')
     
        const communesFilter =  communes.filter(({_code}) =>  (parseInt(_code)>=parseInt(start) &&  parseInt(_code)<=parseInt(end)     )  );
        setAddress({...address, communes: communesFilter})
 
    }, [selected.district]);

    return (
        <Dashboard title="Filter Road">
            <Paper className={classes.root} style={{overflow: 'auto'}}>
                <Typography className={classes.search}>Search</Typography>
                <Select
                    name="district"
                    value={selected.district}
                    displayEmpty
                    onChange={handleChange}
                    >
                    <MenuItem value="" disabled>Choose District</MenuItem>
                    {districtsList}
                </Select>
                <Select
                    name="commune"
                    value={selected.commune}
                    displayEmpty
                    className={classes.margin}
                    >
                    <MenuItem value="" disabled>Choose Communes</MenuItem>
                    {communesList}
                </Select>
                <IconButton>
                    <SearchIcon fontSize="small" />
                </IconButton>
                <Divider className={classes.divider} />
                <Typography className={classes.search}>Filter</Typography>
                <TextField
                    className={classes.textField}
                    defaultValue=""
                    className={classes.margin}
                    placeholder="Min price"
                />
                <TextField
                    className={classes.textField}
                    defaultValue=""
                    className={classes.margin}
                    placeholder="Max price"
                />
                {/* <TextField
                    className={classes.textField}
                    defaultValue=""
                    className={classes.margin}
                    placeholder="Distance"
                /> */}
                <TextField
                    className={classes.textField}
                    defaultValue=""
                    className={classes.margin}
                    placeholder="Get Top"
                />
                <IconButton>
                    <DirectionsIcon fontSize="small" />
                </IconButton>
            </Paper>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                <Paper >
                    <GoogleMap />
                </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper >
                        
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>  
    );
}

export default Contact;