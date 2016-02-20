Markers = new Mongo.Collection('markers');


if (Meteor.isClient) {
    var MAP_ZOOM = 15;

    Meteor.startup(function() {
        GoogleMaps.load({key: 'AIzaSyALQD2Ax84rd5q_MYLZ-AbWpE17F8fE0-E', libraries: 'places' });
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
        }
    });

    Template.map.onCreated(function() {

        GoogleMaps.ready('map', function(map) {
            var userLocation = Geolocation.latLng();
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });

            var service = new google.maps.places.PlacesService(map);
            console.log(service);

            service.nearbySearch({
                location: userLocation,
                radius: 5000,
                types: ['restaurant']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        createMarker(results[i]);
                    }
                }
            }

            function createMarker(place) {
                var placeLoc = place.geometry.location;
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(placeLoc.lat, placeLoc.lng),
                    map: map.instance
                });
            }

        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

    });


}
