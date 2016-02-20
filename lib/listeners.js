if(Meteor.isClient) {

    Template.home.onRendered(function() {
        var genButton = this.$('#generate');
        var content = this.$('#main-page-content');

        genButton.click(function () {
            content.empty();
        });
    });
}
