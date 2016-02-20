var MAP_ZOOM = 15;

Meteor.startup(function() {
    GoogleMaps.load({key: 'AIzaSyALQD2Ax84rd5q_MYLZ-AbWpE17F8fE0-E', libraries: 'places' });
    Geolocation.currentLocation();
});

Template.body.onRendered(function() {
    GoogleMaps.ready('map', function(map) {
        var userLocation = Geolocation.latLng();
        var m = new google.maps.Map(this.$('#gmap')[0], {
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
                Session.set("places",  JSON.stringify(results));
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
});

Template.map.onRendered = function() {
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
                    $('div.resNames').innerHTML = JSON.stringify(getPlaces(results));
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
};

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


});

Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
        var userLocation = Geolocation.latLng();
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(userLocation.lat, userLocation.lng),
            map: map.instance
        });
    });
});

