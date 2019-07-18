import React from 'react';
import {Polyline} from "react-google-maps";
import decodePolyline from 'decode-google-map-polyline';
import GoogleMapEX from '../../../../componentV/Map';
import {connect} from 'react-redux';

var roads = [];
const  PolylineEX = ({roads:poly}) => {
    var center = poly.length==0 ? {lat:11.57260272071095,lng:104.8977114117776}:decodePolyline(poly[0].polylines)[0];    
    roads = poly.map((poly) => {                
            if(poly.active){
                const polyline = decodePolyline(poly.polylines);
                const {id} = poly
                return( 
                    <Polyline
                        key={id}
                        path={polyline}
                        options={{
                            strokeColor: poly.color,
                            strokeWeight: 12,
                            editable: false,
                            draggable:false,
                            
                        }}
                    />
                )
            }
    });

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

export default connect(mapStateToProps)(PolylineEX)