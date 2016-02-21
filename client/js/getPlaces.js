Markers = new Mongo.Collection('markers');

if (Meteor.isClient) {
    var MAP_ZOOM = 15;
    var marker;
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

            var givenRadius = (parseInt(Session.get('ion-ios-navigate')) + 1) * 1000;
            var givenMoney = parseInt(Session.get('ion-social-usd')) + 1;
            var givenRate = parseInt(Session.get('ion-ios-star')) + 1;
            var types = Session.get('types');

            var service = new google.maps.places.PlacesService(m).nearbySearch({
                location: userLocation,
                name: types,
                radius: givenRadius,
                openNow: true,
                maxPriceLevel: givenMoney,
                types: ['restaurant']
            }, callback);

            function callback(results, status) {
                if (status === google.maps.places.PlacesServiceStatus.OK) {
                    var rnd = Math.floor(Math.random() * results.length);
                    Session.set("places", results[rnd]);
                    createMarker(results[rnd]);
                    m.panTo(marker.getPosition());
                    console.log(results[rnd]);
                }
            }

            function createMarker(place) {
                marker = new google.maps.Marker({
                    map: m,
                    position: place.geometry.location
                });
            }

            function getNames(results){
                var names = [];
                for(i = 0; i < results.length; i++){
                    names.push(results[i].name);
                }
                return names;
            }

        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

    });
}
