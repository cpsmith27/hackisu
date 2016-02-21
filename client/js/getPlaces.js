Markers = new Mongo.Collection('markers');


if (Meteor.isClient) {
    var MAP_ZOOM = 15;

    Meteor.startup(function() {
        GoogleMaps.load({key: 'AIzaSyALQD2Ax84rd5q_MYLZ-AbWpE17F8fE0-E', libraries: 'places' });
        Geolocation.currentLocation();
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

    Template.map.onRendered(function() {
        GoogleMaps.ready('map', function(map) {
            var userLocation = Geolocation.latLng();
            var m = new google.maps.Map(this.$('#gmap')[0], {
                center: userLocation,
                zoom: 15
            });

            var givenRadius = Session.get('ion-ios-navigate') * 300;
            console.log(givenRadius);

            var service = new google.maps.places.PlacesService(m).nearbySearch({
                location: userLocation,
                radius: givenRadius,
                types: ['restaurant']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    Session.set("places",  JSON.stringify(results));
                }
            }

        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

    });


}
