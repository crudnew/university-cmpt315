import { Component } from "react";
import {Map, GoogleApiWrapper} from "google-maps-react";



class MapView extends Component{

  fetchPlaces(mapProps, map){
  const {google} = mapProps;
  const service = new google.maps.places.PlacesService(map);
  }

    render(){
     return (
      
    <div style={{float:"right"}}> 
    <div style={{position: 'fixed',right: '33%', top: "20%"}}>
     <Map
       google = {this.props.google}
       style = {{ width:"32vw", height:"70vh ", }}
       zoom = {10}
       initialCenter ={
         {
           lat: 51.0447,
           lng: -114.0719
         }

       } >

       </Map> 
       </div>
       </div> 

  
   
     );}
   }
     
export default GoogleApiWrapper({apiKey: "AIzaSyAZ1lyTQ6aSowZx0Bhsb_bQKc-5wIDPkFk"})(MapView)