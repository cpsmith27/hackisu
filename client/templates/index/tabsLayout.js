Template.tabsLayout.rendered = function () {
  Session.set('currentTab', 'index');
};

Template.tabsThree.helpers({
  getNames: function(){

    return Session.get("places")[0].name;
  }
});