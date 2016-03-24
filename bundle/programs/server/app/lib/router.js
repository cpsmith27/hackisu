(function(){

/////////////////////////////////////////////////////////////////////////
//                                                                     //
// lib/router.js                                                       //
//                                                                     //
/////////////////////////////////////////////////////////////////////////
                                                                       //
/**                                                                    //
 * Created by leyang on 2/19/16.                                       //
 */                                                                    //
Router.configure({                                                     // 4
    layoutTemplate: 'layout'                                           // 5
});                                                                    //
                                                                       //
Meteor.startup(function () {                                           // 8
    if (Meteor.isClient) {                                             // 9
        var location = Iron.Location.get();                            // 10
        if (location.queryObject.platformOverride) {                   // 11
            Session.set('platformOverride', location.queryObject.platformOverride);
        }                                                              //
    }                                                                  //
});                                                                    //
                                                                       //
Router.map(function () {                                               // 17
    this.route('home', { path: '/' });                                 // 18
    this.route('restaurant', { path: '/map' });                        // 19
});                                                                    //
/////////////////////////////////////////////////////////////////////////

}).call(this);

//# sourceMappingURL=router.js.map
