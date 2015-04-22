$.FollowToggle = function (el, opts) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id") || opts.userId;
  this.followState = this.$el.data("initial-follow-state") || opts.followState;
  this.render();
  this.$el.on("click", function () {
    this.handleClick(event);
  }.bind(this));
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === 'followed') {
    this.$el.html("Unfollow!");
    this.$el.prop('disabled', false);
  } else if (this.followState === 'unfollowed') {
    this.$el.html("Follow!");
    this.$el.prop('disabled', false);
  } else if (this.followState === 'unfollowing') {
    this.$el.prop('disabled', true);
  } else if (this.followState === 'following') {
    this.$el.prop('disabled', true);
  }
};

$.FollowToggle.prototype.handleClick = function (event) {
  event.preventDefault();
  var url = "/users/" + this.userId + "/follow";
  var type = "", dataType = "json", data = {};
  var that = this;
  if (this.followState === "unfollowed") {
    this.followState = "following";
    type = 'POST';
    data = { user_id: this.userId };
  } else {
    this.followState = "unfollowing";
    type = 'DELETE';
  }

  this.render();

  $.ajax({
    url: url,
    type: type,
    data: data,
    dataType: dataType,
    success: function () {
      that.updateFollowState();
      that.render();
    }
  });
};

$.FollowToggle.prototype.updateFollowState = function () {
  if (this.followState === 'following') {
    this.followState = 'followed';
  } else if (this.followState === 'unfollowing') {
    this.followState = 'unfollowed';
  }
};

$.fn.followToggle = function (options) {
  return this.each(function () {
    new $.FollowToggle(this, options);
  });
};
