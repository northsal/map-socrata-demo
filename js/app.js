/*
    app.js
    our application code

    Alternative fuel locations in Chicago dataset:
    https://data.cityofchicago.org/resource/alternative-fuel-locations.json

    Chicago coordinates:
    lat: 41.8369
    lng: -87.6847

    indexOf for contains of string
    markers and station match to the same array index
     itemIndex
     setMap null
 */

"use strict";

$(document).ready(function() {
   var mapElem = document.getElementById('map');
   var center = {
       lat: 41.8369,
       lng: -87.6847
   } ;

    var map = new google.maps.Map(mapElem, {
        center: center,
        zoom: 12
    });

    var infoWindow = new google.maps.InfoWindow();

    var stations;
    var markers = [];

    $.getJSON('https://data.cityofchicago.org/resource/alternative-fuel-locations.json')
        .done(function(data) {
            stations = data;

            data.forEach(function(station, itemIndex) {
                var marker = new google.maps.Marker( {
                    position: {
                        lat: Number(station.location.latitude),
                        lng: Number(station.location.longitude)
                    },
                    map: map
                });
                markers.push(marker);

                google.maps.event.addListener(marker, 'click', function() {
                    var html = '<h2>' + station.station_name + '</h2>';
                    html += '<p>' + station.street_address + '</p>';

                    infoWindow.setContent(html);
                    infoWindow.open(map, this);
                });
            });
        })
        .fail(function(error) {
            console.log(err);
        })
        .always(function() {
               $('#ajax-loader').fadeOut();
        });
});
