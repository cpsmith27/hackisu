/**
 * Created by leyang on 2/19/16.
 */
Router.configure({
    layoutTemplate: 'layout'
});

Meteor.startup(function () {
    if (Meteor.isClient) {
        var location = Iron.Location.get();
        if (location.queryObject.platformOverride) {
            Session.set('platformOverride', location.queryObject.platformOverride);
        }
    }
});

Router.map(function() {
    this.route('home', {path: '/'});
    this.route('_myModal', {path: '/map', });
});
