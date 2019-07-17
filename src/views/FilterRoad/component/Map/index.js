import React from 'react';
import {
    Polyline
} from "react-google-maps";
import decodePolyline from 'decode-google-map-polyline';
import GoogleMapEX from '../../../../componentV/Map';
import {connect} from 'react-redux';
import {update_road} from '../../../../store/actions/filterRoadAction';

import CircularProgress from '@material-ui/core/CircularProgress';

var roads = [];
const  PolylineEX = ({roads:poly, onUpdateRoad}) => {
    const polyRef = React.useRef([]);
    var center = poly.length==0 ? {lat:11.57260272071095,lng:104.8977114117776}:decodePolyline(poly[0].polylines)[0];
    const handlePLChange = (id) => {
        
        const {el} = polyRef.current.find(p => p.id==id);
        
        const encodeString = window.google.maps.geometry.encoding.encodePath(el.getPath());
        
        const polyLengthInMeters = window.google.maps.geometry.spherical.computeLength(el.getPath().getArray());

        onUpdateRoad({id,polylines:encodeString,distance:Math.round(polyLengthInMeters)});
        
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
                            editable: false,
                            draggable:false,
                            
                        }}
                        ref = { el => polyRef.current[index] = {id,el} }
                        onMouseUp={ () => handlePLChange(id) }
                    />
                )
            }
    });

    return(
        <div>
            {/* <CircularProgress style={{
                position: 'fixed',
                zIndex: '9',
                left: '50%',
                top: '50%'}}/> */}
            <GoogleMapEX lat={center.lat} lng={center.lng}>
                {roads}                
            </GoogleMapEX>
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