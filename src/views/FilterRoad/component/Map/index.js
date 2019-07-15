import React from 'react';
import {
    Polyline
} from "react-google-maps";
import decodePolyline from 'decode-google-map-polyline';
import GoogleMapEX from '../../../../componentV/Map';

const result = {
    "data": [
        {
            "id": 56491,
            "vta_code": "BKK1-41-Sub2",
            "address": "120102",
            "street": "Angkor Blvd.",
            "bounderies": null,
            "starting_point_place": null,
            "ending_point_place": null,
            "direction": null,
            "direction_google": null,
            "starting_point_coordinate": "11.556217, 104.926005",
            "ending_point_coordinate": "11.559475, 104.925083",
            "polylines": "e{oeAwyl_SASxDw@j@IPA@N",
            "groud_length": null,
            "distance": "163",
            "from_distance": "northeast",
            "to_distance": "southwest",
            "average_price": 6400,
            "minimum_price": 5580,
            "maximum_price": 7220,
            "date_price": null,
            "priced_by": null
        },
        {
          "id": 5649,
          "vta_code": "BKK1-41-Sub2",
          "address": "120102",
          "street": "Angkor Blvd.",
          "bounderies": null,
          "starting_point_place": null,
          "ending_point_place": null,
          "direction": null,
          "direction_google": null,
          "starting_point_coordinate": "11.555883, 104.922968",
          "ending_point_coordinate": "11.555998, 104.926003",
          "polylines": "e{oeAwyl_SASxDw@j@IPA@N",
          "groud_length": null,
          "distance": "163",
          "from_distance": "northeast",
          "to_distance": "southwest",
          "average_price": 6400,
          "minimum_price": 5580,
          "maximum_price": 7220,
          "date_price": null,
          "priced_by": null
      },
    ],
}


export default function PolylineEX(){
    const polyRef = React.useRef([]);
    const handlePLChange = (id) => {
        // const {el} = polyRef.current.find(p => p.id==id);
        // console.log(el.getPath());
        
        // const encodeString = window.google.maps.geometry.encoding.encodePath(el.getPath());
        // console.log(encodeString);
        // const polyLengthInMeters = window.google.maps.geometry.spherical.computeLength(el.getPath().getArray());

        // onUpdateRoad({id,polylines:encodeString,distance:Math.round(polyLengthInMeters)})
        
    }
    
    const roads = result.data.map(({id, polylines}, index) => {        
        const polyline = decodePolyline(polylines);
        return( 
            <Polyline 
                key={id}
                path={polyline}
                options={{
                    strokeColor: '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6),
                    strokeWeight: 12,
                    editable: true,
                    draggable:true,
                    
                }}
                ref = { el => polyRef.current[index] = {id,el} }
                onMouseUp={ ()=>handlePLChange(id) }
            />
        )
    });
    return(
        <div>
            <GoogleMapEX>
                {roads}
            </GoogleMapEX>
        </div>
    );
}