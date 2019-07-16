import React from 'react';
import {
    Polyline
} from "react-google-maps";
import decodePolyline from 'decode-google-map-polyline';
import GoogleMapEX from '../../../../componentV/Map';
import {connect} from 'react-redux';

var roads = [];
const  PolylineEX = ({roads:poly}) => {
    const polyRef = React.useRef([]);
    const [open, setOpen] = React.useState({
        open:false
    })
    var center = poly.length==0 ? {lat:11.57260272071095,lng:104.8977114117776}:decodePolyline(poly[0].polylines)[0];
    const handlePLChange = (id) => {
        // const {el} = polyRef.current.find(p => p.id==id);
        // console.log([el.props.value, el.getPath()]);
        // console.log(el.getPath());
        
        // const encodeString = window.google.maps.geometry.encoding.encodePath(el.getPath());
        // console.log(encodeString);
        // const polyLengthInMeters = window.google.maps.geometry.spherical.computeLength(el.getPath().getArray());

        // onUpdateRoad({id,polylines:encodeString,distance:Math.round(polyLengthInMeters)})
        
    }
    const handleClick = () => {
        setOpen({
            open:true
        })
    }
    if(poly.length > 0 ){
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
                            onClick={ ()=>handleClick(id) }
                        />
                    )
                }
            }
        );
    }
    
    
    return(
        <div>
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

export default connect(mapStateToProps, null)(PolylineEX)