var loadingView;

loadContent = function(content) {
    $(".randoms").each(function(e){
        Blaze.remove(loadingView);
    });

    Blaze.render(Template.restaurant, content[0]);
}

Template.home.onRendered(function() {
    var genButton = this.$('#generate');
    var content = this.$('#main-page-content');

    genButton.click(function () {
        console.log(content);
        content.empty();
        loadingView = Blaze.render(Template.generating, content[0]);

        setTimeout(function() {loadContent(content);}, 1000);
    });
});

Template.generating.onRendered(function() {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function changeWord(a) {
        a.style.opacity = '0.1';
        a.innerHTML = words[getRandomInt(0, words.length - 1)];
        setTimeout(function() {
            a.style.opacity = '1';
        }, 425);
        setTimeout(function() {
            changeWord(a);
        }, getRandomInt(500, 800));
    }

    var words = ["LOADING", "MOTHER", "FRIENDS", "HUNT", "INSANITY", "DAD", "LOSE", "BROTHER", "WAKE", "GIRLFRIEND", "TATAU", "MAN", "HOME"];

    var randoms = this.$(".randoms");
    for (i = 0; i < randoms.length; i++)
        changeWord(randoms[i]);
});

Template.restaurant.onRendered(function() {
    var genButton = this.$('#generate');
    var content = $('#main-page-content');

    genButton.click(function () {
        console.log(content);
        content.empty();
        loadingView = Blaze.render(Template.generating, content[0]);
        setTimeout(function() {loadContent(content);}, 1000);
    });
});

Template.restaurant.helpers({
    getNames: function(){
        return Session.get("places");
    }
});