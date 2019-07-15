import React, { useState } from 'react';
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

// extend
import DistrictsObject from '../../../../componentV/Address/Disticts';
import CommunesObject from '../../../../componentV/Address/Communes';


import {useStyles} from "./styles";

const districtsEx = DistrictsObject;
const communesEx = CommunesObject;
var communesList = [];

function SideBar() {
  const classes = useStyles();

  const [values, setValues] = useState('');
  const [communes, setCommunes] = useState([]);
  const [districts, setDistricts] = useState([]);

  const districtsList = districtsEx.map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_kh} - {_name_en} </MenuItem> );

  if(Array.isArray(communes)){
    communesList = communes.map( ({_code, _name_kh, _name_en}) => <MenuItem key={_code} value={_code}>{_name_kh} - {_name_en} </MenuItem> );
  }

  const handleChangeDistrict = (event) => {
      if(event.target.value !== undefined){
          const value = event.target.value;
          setDistricts(value);
          const start = value.padEnd(6,'0') //120100
          const end = value.padEnd(6,'9') //120199
          const communesFilter = communesEx.filter(commune => {
            if(commune._code>=Number(start) && commune._code<=end){
              return commune;
            }
          })
          setCommunes(communesFilter);
      }
  }

  const handleChangeCommune = (event) => {
      if(event.target.value !== undefined){
          setCommunes(event.target.value);
      }      
  }

  const handleChangeValue = (event) => {
      setValues(event.target.value);
  };

  const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            district : Array.isArray(communes) ? '':districts,
            commune : Array.isArray(communes) ? '':communes ,
            street : values
        }
        console.log(data);
  }
  return (
      <form autoComplete="off" onSubmit={handleSubmit}>
          <FormControl className={classes.formControl}>
              <InputLabel htmlFor="demo-controlled-open-select">Disticts</InputLabel>
              <Select 
                onChange={handleChangeDistrict}
                value={districts}
                >
                  <MenuItem>
                    <em>None</em>
                  </MenuItem>
                  {districtsList}
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
              <InputLabel >Communes</InputLabel>
              <Select 
                onChange={handleChangeCommune}
                value={communes}
                >
                    <MenuItem>
                        <em>None</em>
                    </MenuItem>
                    {communesList}
              </Select>
          </FormControl>
          <FormControl className={classes.formControl}>
              <TextField
                  label="Road"
                  value={values.road}
                  onChange={handleChangeValue}
              />
          </FormControl>
          <Button type="submit" variant="contained" color="primary" className={classes.button}>
              Search
          </Button>
      </form>
  );
}

export default SideBar;