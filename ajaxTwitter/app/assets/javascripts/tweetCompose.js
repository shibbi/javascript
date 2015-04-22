$.TweetCompose = function (el) {
  this.$el = $(el);

  var self = this;
  this.$el.on("submit", function () {
    self.submitHandler(event);
  });

  this.$el.find("textarea").on("input", function() {
    var textLength = $(event.currentTarget).val().length;
    self.$el.find(".chars-left").html(140 - textLength);
  });

  this.$el.find(".add-mentioned-user").on("click", function() {
    self.addMentionedUser(event);
  });

  this.$el.find(".mentioned-users").on("click", "a.remove-mentioned-user",
                                       function() {
                                         self.removeMentionedUser(event);
  });
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
  this.$el.find("textarea").val("");
  this.$el.find(".chars-left").html("140");
  this.$el.find('.mentioned-users').empty();
};

$.TweetCompose.prototype.addMentionedUser = function (event) {
  var $scriptTag = this.$el.find("script");
  var $mentionedUsers = this.$el.find("div.mentioned-users");
  $mentionedUsers.append($scriptTag.html());
};

$.TweetCompose.prototype.removeMentionedUser = function (event) {
  $(event.target).parent().remove();
};

$.fn.tweetCompose = function () {
  return this.each(function () {
    new $.TweetCompose(this);
  });
};
