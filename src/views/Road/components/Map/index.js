import React, { Component } from 'react'
import {connect} from 'react-redux'
import { compose } from "recompose"

import decodePolyline from 'decode-google-map-polyline'
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,

  } from "react-google-maps";

  import InfoBox from "react-google-maps/lib/components/addons/InfoBox"

 
const params = {v: '3.exp', key: 'AIzaSyCk1LQURlFo4lRk4j6GIHuWx8GOZbOnPpk'};
const [lat, lng] = [11.57260272071095,104.8977114117776]

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            map:{
                zoom:16,
                editable:true,
                moveable:false
            }
        };
    }
    
  render() {
    const {zoom,editable,moveable} = this.state.map;
    const center = this.props.roads.length==0? {lat:11.57260272071095,lng:104.8977114117776} : decodePolyline(this.props.roads[0].polylines)[0];

    const Polylines = this.props.roads.map( (road,index) => {
        if(road.active){
        //   let OverDecode = decodePolyline(road.polylines);
        const [slat,slng] = road.starting_point_coordinat.split(',')
        const [elat,elng] = road.ending_point_coordinate.split(',')
        let OverDecode = [{lat: parseFloat(slat), lng: parseFloat(slng)},{lat: parseFloat(elat), lng: parseFloat(elng)}]
          console.log("TCL: Map -> render -> OverDecode", OverDecode)
          return (
              <Polyline  
              key={road.id}
              path={OverDecode}
              draggable={moveable}
              editable = {editable}
              options={ {strokeColor:road.color, strokeWeight:"12"} }

              />
          )
        }
    })
    
    const MapWithAMarker = withScriptjs(withGoogleMap(props =>
        <GoogleMap defaultZoom={zoom} defaultCenter={{ lat: center.lat, lng: center.lng }} >
            {/* {Polylines} */}
            <InfoBox
      defaultPosition={new window.google.maps.LatLng(center.lat, center.lng)}
      options={{ closeBoxURL: ``, enableEventPropagation: true }}
    >
      <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
        <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
          Hello, Taipei!
        </div>
      </div>
    </InfoBox>
        </GoogleMap>
    ));
    
    
    
    return (
        <MapWithAMarker
            googleMapURL={"https://maps.googleapis.com/maps/api/js?key="+params.key+"&v=3.exp&libraries=geometry,drawing,places"}
            loadingElement={<div style={{ height: `100%` }} />}
            containerElement={<div style={{ height: `90vh` }} />}
            mapElement={<div style={{ height: `100%` }} />}
        />
    )
  }
}

const mapStateToProps = state => {
    return {
        roads:state.road.roads
    }
}
  

export default connect(mapStateToProps)(Map);











