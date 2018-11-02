import { horario } from './../index';

import { SedesProvider } from '../../providers';
import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LaunchNavigator} from '@ionic-native/launch-navigator';
import {
  GoogleMaps,
} from '@ionic-native/google-maps';
//import { google } from '@agm/core/services/google-maps-types';
 declare var google:any;

@IonicPage()
@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.html',
})


export class UbicacionPage {
  @ViewChild('map') mapref :ElementRef;
  @ViewChild('panel') panelRef :ElementRef;
  sedes = [];
  onChangeHandler:Function ;
  sedeNavigator:string= '';
  constructor ( public googleMaps:GoogleMaps,
                private sedesProvider:SedesProvider,
                private LaunchNav :LaunchNavigator,
                private navCtrl :NavController) {
    this.sedes = sedesProvider.query();
  }

  ionViewDidLoad() {
    this.showMap();
  }

  calculateAndDisplayRoute(directionsService, directionsDisplay,infoSede,myPos) {
    directionsService.route({
      origin:myPos,
      destination:infoSede,
      travelMode: 'WALKING'
    }, function(response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  showMap() {
    const infoWindow = new google.maps.InfoWindow;   
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    const location = new google.maps.LatLng(4.600638,-74.074987 )
    const options = {
      center:location,
      zoom:15,
      mapTypeControl: false,
     
      styles: [{
                  elementType: 'geometry',
                  stylers: [{
                    color: '#144148'
                  }]
                },
                {
                  elementType: 'labels.text.stroke',
                  stylers: [{
                    color: '#242f3e'
                  }]
                },
                {
                  elementType: 'labels.text.fill', 
                  stylers: [{
                    color: '#dfdfe5'
                  }]
                },
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{
                    color: '#d59563'
                  }]
                },
                { 
                  featureType: "poi", 
                  elementType: "labels", 
                  stylers: [ 
                      { visibility: "off" } 
                  ] 
                } ,
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#263c3f'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#6b9a76'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#00695c'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#212a37'}]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9ca5b3'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#746855'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#1f2835'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#f3d19c'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#2f3948'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#117090'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#515c6d'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#17263c'}]
                }
      ]
    }

    const map = new google.maps.Map(this.mapref.nativeElement,options);
    directionsDisplay.setMap(map);  
    if(navigator.geolocation) {
      navigator.geolocation.watchPosition((position)=>{
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          icon:'assets/img/student.png'
        });
        map.setCenter(pos);        
        this.onChangeHandler = function(infoSede) {
          this.calculateAndDisplayRoute(directionsService, directionsDisplay,infoSede,pos);
        }
      },err => {
        handleLocationError(true, infoWindow, map.getCenter());
      });
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
      infoWindow.setPosition(pos);
      infoWindow.setContent(browserHasGeolocation ?
                            'Error: The Geolocation service failed.' :
                            'Error: Your browser doesn\'t support geolocation.');
      infoWindow.open(map);
    }     
    this.sedes.forEach(element => {        
      let locationSede =  new google.maps.LatLng(element.lat,element.lng)
      let marker = this.addMarker(locationSede,element,map)      
    });    
  }

  addMarker(locationSede,sedeInfo,map) {
    let marker = new google.maps.Marker({  
      position:locationSede,
      map:map,
      title:sedeInfo.nombre,
      label:sedeInfo.label,
      animation: google.maps.Animation.DROP,
      icon:'assets/img/googleIcon.png'
    })
    marker.addListener('click', function() {
      infowindow.open(map, marker);
    });
  
    var infowindow = new google.maps.InfoWindow({
      content:  '<div id="content" >'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+sedeInfo.nombre+'</h1>'+
      '<div id="bodyContent">'+
      '<p><b>Direccion: </b>'+sedeInfo.direccion+'</p><br>'+
      '<p><b>Telefono:</b> '+sedeInfo.telefono+'</p><br>'+
      '<p><b>Horario:</b> '+sedeInfo.horario+'</p><br>'+    
      '</div>'+
      '</div>',
      maxWidth: 200
    });
    return marker;
  }

  navegar() {
    this.LaunchNav.navigate(this.sedeNavigator)
  }
  
  goHome() {
    this.navCtrl.setRoot('MenuCunPage')
  }
}
