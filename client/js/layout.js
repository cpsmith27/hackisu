/**
 * Created by leyang on 2/20/16.
 */
Template.categories.events({
    "change .item-toggle": function(e){
        Session.set(e.target.id, e.target.checked);
    },
    "change .range": function(e){
        Session.set(e.target.id, e.target.value);
    }
});

Template.categories.onRendered(function(){
    var toggle = this.findAll('.item-toggle input');
    var range = this.findAll('.range input');
    var array = [];
    toggle.forEach(function(data){
        if(data.checked == true)
            array.push(data.id);
    });

    Session.set("types", array);

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


