/**
 * Created by leyang on 2/20/16.
 */
Template.categories.events({
    "change .item-toggle": function(e){
        Session.set(e.target.id, e.target.value);
    },
    "change .range": function(e){
        Session.set(e.target.id, e.target.value);
    }
});

Template.categories.helpers({
    toggleSelect: function () {
        return ["Fast Food", "Casual", "Fine Dining", "Special"]
    },
    rangeSelect: function (){
        return ["ion-social-usd", "ion-ios-navigate", "ion-ios-star"]
    }
});

