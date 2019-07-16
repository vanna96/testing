import React from 'react';
import Dashboard from '../../layout/Dashboard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';


import GoogleMap from './component/Map';
import SideBar from './component/SideBar';
import SearchBar from './component/Search';

function FilterRoad() {
    return (
        <Dashboard title="Filter Road">
            <SearchBar/>
            <Grid container spacing={3}>
                <Grid item xs={12} md={8} lg={9}>
                <Paper >
                    <GoogleMap />
                </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={3}>
                    <Paper >
                        <SideBar/>
                    </Paper>
                </Grid>
            </Grid>
        </Dashboard>  
    );
}

export default FilterRoad;