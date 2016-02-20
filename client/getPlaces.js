Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
    var MAP_ZOOM = 15;
    var resNames;
    Meteor.startup(function() {
        GoogleMaps.load({key: 'AIzaSyALQD2Ax84rd5q_MYLZ-AbWpE17F8fE0-E', libraries: 'places' });

        Meteor.methods({
            updateResNames: function(names){
                resNames = names;
            },

            getResNames: function(){
                return resNames;
            }
        });
    });

    Template.map.helpers({
        geolocationError: function() {
            var error = Geolocation.error();
            return error && error.message;
        },
        mapOptions: function() {
            var userLocation = Geolocation.latLng();
            // Initialize the map once we have the latLng.
            if (GoogleMaps.loaded() && userLocation) {
                return {
                    center: new google.maps.LatLng(userLocation.lat, userLocation.lng),
                    zoom: MAP_ZOOM
                };
            }
        },

        getPlacesInfo: function() {
            GoogleMaps.ready('map', function(map) {
                var userLocation = Geolocation.latLng();
                var m = new google.maps.Map(document.getElementById('gmap'), {
                    center: userLocation,
                    zoom: 15
                });

                var service = new google.maps.places.PlacesService(m).nearbySearch({
                    location: userLocation,
                    radius: 5000,
                    types: ['restaurant']
                }, callback);

                function callback(results, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        Meteor.call('updatesResNames',results);
                        return JSON.stringify(getPlaces(results));
                    }
                }

                function getPlaces(results){
                    var names = [];
                    for(i = 0; i < results.length; i++){
                        names.push(results[i].name);
                    }

                    return names;
                }
            });
        }

    });

    Template.map.onCreated(function() {
        GoogleMaps.ready('map', function(map) {
            var userLocation = Geolocation.latLng();
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });

            var m = new google.maps.Map(document.getElementById('gmap'), {
                center: userLocation,
                zoom: 15
            });

            var service = new google.maps.places.PlacesService(m);
            var infowindow = new google.maps.InfoWindow();
            service.nearbySearch({
                location: userLocation,
                radius: 5000,
                types: ['restaurant']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    //return console.log(JSON.stringify(getPlaces(results)));
                }
            }

            function getPlaces(results){
                var names = [];
                for(i = 0; i < results.length; i++){
                    names.push(results[i].name);
                }

                return names;
            }

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    position: map.options.center,
                    map: map.instance
                });
            }

        });
    });

    //Template.resNames.helpers({
    //    getPlacesInfo: function() {
    //        if(GoogleMaps.loaded()){
    //            var m = new google.maps.Map(document.getElementById('gmap'), {
    //                center: userLocation,
    //                zoom: 15
    //            });
    //
    //            var service = new google.maps.places.PlacesService(m);
    //            service.nearbySearch({
    //                location: userLocation,
    //                radius: 5000,
    //                types: ['restaurant']
    //            }, callback);
    //
    //            function callback(results, status) {
    //                if (status === google.maps.places.PlacesServiceStatus.OK) {
    //                    return JSON.stringify(getPlaces(results));
    //                }
    //            }
    //        }
    //    }
    //});
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}


