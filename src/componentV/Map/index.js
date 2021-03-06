import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

export default function googleMap(props) {
    const {lat, lng, children} = props;
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap defaultZoom={16} defaultCenter={{ lat, lng}} >
            {children}
        </GoogleMap>
    ));
    return (
        <MapWithAMarker
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCvoqUd4cH-dWe3gmUrhxcOaqdgL50V3Q8&v=3.exp&libraries=geometry,drawing,places"}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
  }