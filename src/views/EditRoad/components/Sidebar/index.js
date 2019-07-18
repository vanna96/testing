import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Switch from '@material-ui/core/Switch';
import Divider from "@material-ui/core/Divider";
import {connect} from 'react-redux';
import {toggle_road} from '../../../../store/actions/filterRoadAction';
import numeral from 'numeral'

const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper
    }
}));

const  Sidebar = ({roads, onToggleRoad}) => {    
    const classes = useStyles();
    const roadLists = roads.map(({id, color, vta_code, maximum_price, minimum_price, distance, active}, index) => {
        return( 
            <div>
                <ListItem key={id}>
                    <ListItemText primary={<p style={{color:color}}> {vta_code}({distance}m)  </p>} secondary={`${numeral(minimum_price).format('$ 0,0[.]00')} to ${numeral(maximum_price).format('$ 0,0[.]00')}`  } />
                    <ListItemSecondaryAction>
                    <Switch
                        edge="end" checked={active} onChange={() => onToggleRoad(index)} />
                        </ListItemSecondaryAction>
                </ListItem>
                <Divider/>
            </div>
        )
    });
    return (
        <List className={classes.root} subheader={<ListSubheader>Roads List {roads.length==0? '':`(${roads.length})`}</ListSubheader>} style={{overflow: 'auto', maxHeight: '590px'}}>
            {roadLists}
        </List>        
    );
}

const mapStateToProps = state => {
    return {
        roads:state.filter.roads
    }
};

const mapDispatchToProps = {
    onToggleRoad:toggle_road
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)