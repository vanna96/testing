import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Marker } from "react-google-maps";

import Dashboard from '../../layout/Dashboard';
import Sidebar from './components/Sidebar';
import GoogleMap from '../../componentV/Map';

function EditRoad() {
  return (
    <Dashboard title="Edit Road">
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={8}>
                <Paper >
                    <GoogleMap lat={11.556374} lng={104.928207} isShowMarker>
                        <Marker
                            position={{ lat: 11.556374, lng: 104.928207 }}
                        />
                    </GoogleMap>
                </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <Paper >
                    <Sidebar />
                </Paper>
            </Grid>
        </Grid>     
    </Dashboard>
  );
}

export default EditRoad;