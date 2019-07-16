import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import DirectionsIcon from '@material-ui/icons/Directions';
import Divider from '@material-ui/core/Divider';
import arraySort from 'array-sort';
import {connect} from 'react-redux';

import {search_roads} from '../../../../store/actions/filterRoadAction';
import communes from '../../../../componentV/Address/Communes';
import districts from '../../../../componentV/Address/Disticts';
import {useStyles} from './styles';

const SearchBar = ({onSearch, search_roads}) => {
    const classes = useStyles();
    const [address, setAddress] = React.useState({
        districts, 
        communes
    });
    const [selected, setSelected] = React.useState({
        district:'',
        commune:''
    });

    const districtsList = arraySort(address.districts,'_name_en').map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_en} - {_name_kh} </MenuItem> );
    const communesList = arraySort(address.communes,'_name_en').map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_en} - {_name_kh} </MenuItem> );


    const handleChange = (e) => {
        setSelected({...selected,commune:'', [e.target.name]: e.target.value})
    }
    
    React.useEffect(() => {
        const start = selected.district.padEnd(6,'0')
        const end = selected.district.padEnd(6,'9')
     
        const communesFilter =  communes.filter(({_code}) =>  (parseInt(_code)>=parseInt(start) &&  parseInt(_code)<=parseInt(end)     )  );
        setAddress({...address, communes: communesFilter})
 
    }, [selected.district]);
    return (
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
                onChange={handleChange}
                >
                <MenuItem value="" disabled>Choose Communes</MenuItem>
                {communesList}
            </Select>
            <IconButton onClick={() => onSearch({
                address_id:selected.commune == ''? selected.district:selected.commune
                }) }>
                <SearchIcon/>
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
                <DirectionsIcon/>
            </IconButton>
        </Paper>
    );
}

const mapDispatchToProps = {
    onSearch:search_roads
}

export default connect(null, mapDispatchToProps)(SearchBar);
