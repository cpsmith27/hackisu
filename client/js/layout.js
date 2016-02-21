/**
 * Created by leyang on 2/20/16.
 */
Template.categories.events({
    "toggle .item-toggle": function(e){
        Session.set(e.target.id, e.target.value);
    },
    "change .range": function(e){
        Session.set(e.target.id, e.target.value);
    }
});

Template.categories.onRendered(function(){
    var toggle = this.findAll('.item-toggle input');
    var range = this.findAll('.range input');

    toggle.forEach(function(data){
        Session.set(data.id, data.value);
    });

    range.forEach(function(data){
        Session.set(data.id, data.value);
    });

});

Template.categories.helpers({
    toggleSelect: function () {
        return [{name:"Fast Food", color:"assertive"}, {name:"Casual", color:"energized"}, {name:"Fine Dining", color:"balanced"}, {name:"Special", color:"calm"}]
    },
    rangeSelect: function (){
        return [{name:"ion-social-usd",color:"calm"}, {name:"ion-ios-navigate",color:"balanced"}, {name:"ion-ios-star", color:"assertive"} ]
    }
});


