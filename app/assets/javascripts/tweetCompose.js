$.TweetCompose = function (el) {
  this.$el = $(el);
  this.$el.on("submit", function () {
    this.submitHandler(event);
  }.bind(this));
  this.$el.find("textarea").on("input", function() {
    var textLength = $(event.currentTarget).val().length;
    this.$el.find(".chars-left").html(140 - textLength);
  }.bind(this));
};

$.TweetCompose.prototype.submitHandler = function (event) {
  event.preventDefault();
  var tweet = $(event.currentTarget).serializeJSON().tweet;
  this.$el.find(":input").prop("disabled", true);

  $.ajax({
    url: '/tweets',
    type: 'POST',
    data: { tweet: tweet },
    dataType: 'json',
    success: function (resp) {
      this.handleSuccess(JSON.stringify(resp));
    }.bind(this)
  });
};

$.TweetCompose.prototype.handleSuccess = function (tweet) {
  // tweet is a string built from the JSON
  this.clearInput();
  var $tweetList = $(this.$el.data("tweets-ul"));
  var newTweet = $.parseHTML("<li>" + tweet + "</li>");
  $tweetList.prepend(newTweet);
  this.$el.find(":input").prop("disabled", false);
};

$.TweetCompose.prototype.clearInput = function () {
  this.$el.find("textarea").html("");
  this.$el.find('select>option:eq(0)').prop('selected', true);
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};
