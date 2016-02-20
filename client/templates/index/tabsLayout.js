Template.tabsLayout.rendered = function () {
  Session.set('currentTab', 'index');
};

Template.tabsThree.helpers({
  updateRes: function(){
    return Session.get("enemy");

  }
});