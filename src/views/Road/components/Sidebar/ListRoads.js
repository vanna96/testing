import React from 'react';
import {connect} from 'react-redux'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Switch from '@material-ui/core/Switch';
import WifiIcon from '@material-ui/icons/Wifi';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import numeral from 'numeral'

import { toggle_road } from '../../../../store/actions/roadAction'
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: '80vh',
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
  }));

function ListRoads({roads,onToggleRoad}) {
    const classes = useStyles();
    

    
    const roadsList = roads.map(({id,vta_code,minimum_price,maximum_price,active,color},index) => 
        <>
            <ListItem key={'asf'+id}> 
                <ListItemText  
                    primary={<Typography style={{ color }}>{vta_code}</Typography>} 
                    secondary={`${numeral(minimum_price).format('$ 0,0[.]00')} to ${numeral(maximum_price).format('$ 0,0[.]00')}`  } />
                <ListItemSecondaryAction>
                    <Switch edge="end" checked={active} onChange={() => onToggleRoad(index)} />
                </ListItemSecondaryAction>
            </ListItem>
            <Divider key={'d_r_l_'+id} variant="fullWidth" component="li" />
        </>
    )
    
   
    return (
        <>
        <List className={classes.root} subheader={<ListSubheader>Roads List {roads.length==0? '':`(${roads.length})`}</ListSubheader>} >
            {roadsList}
        </List>
        </>
    );
}

const mapStateToProps = state => {
    return {
        roads:state.road.roads
    }
}

const mapDispatchToProps = {
    onToggleRoad:toggle_road
}
  

export default connect(mapStateToProps,mapDispatchToProps)(ListRoads);