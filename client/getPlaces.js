if (Meteor.isClient) {
    Meteor.startup(function() {
        GoogleMaps.load();
    });

    Template.body.helpers({
        exampleMapOptions: function() {
            // Make sure the maps API has loaded
            if (GoogleMaps.loaded()) {
                // Map initialization options
                return {
                    center: new google.maps.LatLng(-37.8136, 144.9631),
                    zoom: 12
                };
            }
        }
    });

    Template.body.onCreated(function() {
        // We can use the `ready` callback to interact with the map API once the map is ready.
        GoogleMaps.ready('exampleMap', function(map) {
            // Add a marker to the map once it's ready
            var marker = new google.maps.Marker({
                position: map.options.center,
                map: map.instance
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };

                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    map.setCenter(pos);
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
                // Browser doesn't support Geolocation
                console.log("Problem!");
            }
        });
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup

    });
}
