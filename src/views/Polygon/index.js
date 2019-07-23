import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
} from "react-google-maps";

import { DrawingManager } from 'react-google-maps/lib/components/drawing/DrawingManager';

export default function googleMap(props) {
    const {lat, lng, children} = props;

    const handleOverlayComplete = (e) => {
    	console.log(e);
     // 	const polygon = e.overlay;
	    // const latLng = new window.google.maps.LatLng(lat, lng);
	    // const containsPlace = window.google.maps.geometry.poly.containsLocation(
	    //     latLng,
	    //     polygon
	    // );
	}

    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap defaultZoom={16} defaultCenter={{ lat:11.556374, lng:104.928207}} >
            <DrawingManager
			      defaultDrawingMode={window.google.maps.drawing.OverlayType.POLYGON}
			      defaultOptions={{
				        drawingControl: true,
				        drawingControlOptions: {
				          position: window.google.maps.ControlPosition.TOP_CENTER,
				          drawingModes: [
				            window.google.maps.drawing.OverlayType.POLYGON,
				            // window.google.maps.drawing.OverlayType.POLYLINE,
				          ],
				        },
				        circleOptions: {
				          fillColor: `#ffff00`,
				          fillOpacity: 1,
				          strokeWeight: 5,
				          clickable: false,
				          editable: true,
				          zIndex: 1,
				        },
			      	}}
			
			onOverlayComplete={handleOverlayComplete}
		    />
        </GoogleMap>
    ));
    return (
        <MapWithAMarker
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyCvoqUd4cH-dWe3gmUrhxcOaqdgL50V3Q8&v=3.exp&libraries=geometry,drawing,places"}
            loadingElement={<div style={{ height: `50%` }} />}
            containerElement={<div style={{ height: `90vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    );
}