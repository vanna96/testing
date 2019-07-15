import React from 'react';
import {connect} from 'react-redux'
import Dashboard from '../../layout/Dashboard'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { fetch_roads, filter_by_price_asc, filter_by_price_desc,slice_roads } from '../../store/actions/roadAction'

import Map from '../Road/components/Map'
import Sidebar from '../Road/components/Sidebar'

function Road({road, onFetchRoad, onFilterRoadByPriceAsc, onFilterRoadByPriceDesc,onSlice}) {

  return (
    <Dashboard title="Road">
          <Grid container spacing={3}>
            {/* Chart */}
            <Grid item xs={12} md={8} lg={9}>
              <Paper >
                <Map />
              </Paper>
            </Grid>
            {/* Recent Deposits */}
            <Grid item xs={12} md={4} lg={3}>
            <Paper >
                <button onClick={onFetchRoad}>Get Road</button>
                <button onClick={onFilterRoadByPriceAsc}>A-Z</button>
                <button onClick={onFilterRoadByPriceDesc}>Z-A</button>
                <button onClick={onSlice}>Sort</button>

                <Sidebar/>

                {road.roads.length === 0 ? <p>No road</p>:road.roads.map(({id, minimum_price, maximum_price})=><p key={id}>{id}: {minimum_price} - {maximum_price} </p>)}
              </Paper>
            </Grid>
   
          </Grid>
    
     
      </Dashboard>    
  );
}


const mapStateToProps = state => {
    return {
        road:state.road
    }
}
  
const mapDispatchToProps = dispatch => {
    return {
        onFetchRoad: () => { dispatch(fetch_roads) },
        onFilterRoadByPriceAsc: () => { dispatch(filter_by_price_asc) },
        onFilterRoadByPriceDesc: () => { dispatch(filter_by_price_desc) },
        onSlice: () => { dispatch(slice_roads) },
    }
}
  
  export default connect(mapStateToProps,mapDispatchToProps)(Road);