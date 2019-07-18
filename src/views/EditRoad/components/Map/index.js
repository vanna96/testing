import React from 'react';
import {
    Polyline
} from "react-google-maps";
import decodePolyline from 'decode-google-map-polyline';
import GoogleMapEX from '../../../../componentV/Map';
import {connect} from 'react-redux';
import {update_road} from '../../../../store/actions/filterRoadAction';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

var roads = [];
const  PolylineEX = ({roads:poly, onUpdateRoad}) => {
    const polyRef = React.useRef([]);
    const [open, setOpen] = React.useState(false);

    var center = poly.length==0 ? {lat:11.57260272071095,lng:104.8977114117776}:decodePolyline(poly[0].polylines)[0];

    const handlePLChange = (id) => {     
        const {el} = polyRef.current.find(p => p.id==id);      
        const encodeString = window.google.maps.geometry.encoding.encodePath(el.getPath());       
        const polyLengthInMeters = window.google.maps.geometry.spherical.computeLength(el.getPath().getArray());
        onUpdateRoad({id,polylines:encodeString,distance:Math.round(polyLengthInMeters)});
        
    }

    const handleDialog = (id) => {
        console.log(id);        
    }
    
    roads = poly.map((poly, index) => {                
            if(poly.active){
                const polyline = decodePolyline(poly.polylines);
                const {id} = poly
                return( 
                    <Polyline
                        value={poly}
                        key={id}
                        path={polyline}
                        options={{
                            strokeColor: poly.color,
                            strokeWeight: 12,
                            editable: true,
                            draggable:true,
                            
                        }}
                        ref = { el => polyRef.current[index] = {id,el} }
                        onMouseUp={ () => handlePLChange(id) }
                        onClick={ () => handleDialog(id) }
                    />
                )
            }
    });

    return(
        <div>
            <GoogleMapEX lat={center.lat} lng={center.lng}>
                {roads}                
            </GoogleMapEX>
            {/* <Dialog
                open={open}
                onClose=""
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Let Google help apps determine location. This means sending anonymous location data to
                    Google, even when no apps are running.
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick="" color="primary">
                    Disagree
                </Button>
                <Button onClick="" color="primary" autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        roads:state.filter.roads
    }
};

const mapDispatchToProps = {
    onUpdateRoad:update_road
}

export default connect(mapStateToProps, mapDispatchToProps)(PolylineEX)