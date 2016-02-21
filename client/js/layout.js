/**
 * Created by leyang on 2/20/16.
 */
Template.categories.events({
    "change .item-toggle": function(e){
        var toggle = e.target.id;
        var array = Session.get("types");
        var index = array.indexOf(toggle);

        if(e.target.checked == true){
            array.push(e.target.id);

        }
        else{
            if (index > -1) {
                array.splice(index, 1);
            }
        }

        console.log(array);
        Session.set("types", array);
    },
    "change .range": function(e){
        Session.set(e.target.id, e.target.value);
    }
});

Template.categories.onRendered(function(){
    var toggle = this.findAll('.item-toggle input');
    var range = this.findAll('.range input');
    var array = [];

    Session.set("types", []);
    range.forEach(function(data){
        Session.set(data.id, data.value);
    });

});

Template.categories.helpers({
    toggleSelect: function () {
        return [{name:"Pizza", color:"assertive"}, {name:"Bread", color:"energized"}, {name:"Buffet", color:"balanced"}, {name:"Korean", color:"calm"}]
    },
    rangeSelect: function (){
        return [{name:"ion-social-usd",color:"calm"}, {name:"ion-ios-navigate",color:"balanced"}, {name:"ion-ios-star", color:"assertive"} ]
    }
});

Template.restaurant.helpers({
    RestaurantName: function(){
        return Session.get("places").name;
    }
})
