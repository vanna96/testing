import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

import Dashboard from '../../layout/Dashboard';
import SearchBar from './components/Search';
import GoogleMap from './components/Map';
// import SideBar from './components/SideBar/index';

function EditRoad() {
  return (
    <Dashboard title="Edit Road">
        <SearchBar/>
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                <Paper >
                    <GoogleMap/>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
                <Paper >
                    {/* <SideBar/> */}
                </Paper>
            </Grid>
        </Grid>
    </Dashboard>
  );
}

export default EditRoad;