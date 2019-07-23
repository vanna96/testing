import React from 'react';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import arraySort from 'array-sort';
import {connect} from 'react-redux';
import Hidden from '@material-ui/core/Hidden';

import {search_roads, filter_roads,filter_distance,filter_getTop} from '../../../../store/actions/filterRoadAction';
import communes from '../../../../componentV/Address/Communes';
import districts from '../../../../componentV/Address/Disticts';
import {useStyles} from './styles';
import AutoComplete  from '../Multiselect';

const SearchBar = ({onSearch, onFilterPrice, onFilterGetTop, onFilterDistance}) => {
    const classes = useStyles();
    const [address, setAddress] = React.useState({
        districts, 
        communes
    });
    const [selected, setSelected] = React.useState({
        district:'',
        commune:'',
        price:'',
        distance:'',
        get_top:''
        
    });

    const districtsList = arraySort(address.districts,'_name_en').map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_en} - {_name_kh} </MenuItem> );
    const communesList = arraySort(address.communes,'_name_en').map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_en} - {_name_kh} </MenuItem> );


    const handleChange = (e) => {
        setSelected({...selected, [e.target.name]: e.target.value})
    }
    
    React.useEffect(() => {
        const start = selected.district.padEnd(6,'0')
        const end = selected.district.padEnd(6,'9')
     
        const communesFilter =  communes.filter(({_code}) =>  (parseInt(_code)>=parseInt(start) &&  parseInt(_code)<=parseInt(end)     )  );
        setAddress({...address, communes: communesFilter})
 
    }, [selected.district]);

    React.useEffect(() => {
        onFilterPrice(selected.price)
        if(selected.get_top){
            onFilterGetTop(selected.get_top)      
        }  
    }, [selected.price]);

    React.useEffect(() => {
        onFilterDistance(selected.distance)
        if(selected.get_top){
            onFilterGetTop(selected.get_top)      
        }
    }, [selected.distance]);

    React.useEffect(() => {
        if(selected.price){
            onFilterPrice(selected.price)
        }
        onFilterGetTop(selected.get_top)      
    }, [selected.get_top]);

    function resize() {
        console.log(window.innerWidth)
    }
    
    React.useEffect(()=> {

    },[window.addEventListener("resize", resize.bind(this))]);

    return (
        
        <Paper className={classes.root}>
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
            <AutoComplete DataSelected={selected.commune}/>


            <IconButton onClick={() => onSearch({
                address_id:selected.commune == ''? selected.district:selected.commune
                }) }
                color="primary">
                <SearchIcon/>
            </IconButton>
            <Divider className={classes.divider} />
            <Typography className={classes.search}>Filter</Typography>
            <Select
                name="price"
                value={selected.price}
                displayEmpty
                className={classes.margin}
                onChange={handleChange}
                >
                <MenuItem value="" disabled>Filter by Price</MenuItem>
                <MenuItem value="ASC" > Low to High </MenuItem>
                <MenuItem value="DESC" > High to Low</MenuItem>
            </Select>
            <Select
                name="distance"
                value={selected.distance}
                displayEmpty
                className={classes.margin}
                onChange={handleChange}
                >
                <MenuItem value="" disabled>Filter by Distance</MenuItem>
                <MenuItem value="ASC" > A-Z </MenuItem>
                <MenuItem value="DESC" > Z-A </MenuItem>
            </Select>
            <Select
                name="get_top"
                value={selected.get_top}
                displayEmpty
                className={classes.margin}
                onChange={handleChange}
                >
                <MenuItem value="" disabled>Filter by Top</MenuItem>
                <MenuItem value="5" > Top 5 records</MenuItem>
                <MenuItem value="10" > Top 10 records</MenuItem>
                <MenuItem value="15" > Top 15 records</MenuItem>
                <MenuItem value="25" > Top 25 records</MenuItem>
                <MenuItem value="50" > Top 50 records</MenuItem>
                <MenuItem value="100" > Top 100 records</MenuItem>
            </Select>
        </Paper>
    );
}

const mapDispatchToProps = {
    onSearch:search_roads,
    onFilterPrice:filter_roads,
    onFilterDistance:filter_distance,
    onFilterGetTop:filter_getTop
}

export default connect(null, mapDispatchToProps)(SearchBar);
