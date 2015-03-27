// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$.FollowToggle = function (el) {
  this.$el = $(el);
  this.userId = this.$el.data("user-id");
  this.followState = this.$el.data("initial-follow-state");
  this.render();
  this.$el.on("click", function () {
    this.handleClick(event);
  }.bind(this));
};

$.FollowToggle.prototype.render = function () {
  if (this.followState === 'followed') {
    this.$el.html("Unfollow!");
  } else if (this.followState === 'unfollowed') {
    this.$el.html("Follow!");
  }
};

$.FollowToggle.prototype.handleClick = function(event) {
  event.preventDefault();

  var url = "/users/" + this.userId + "/follow";
  var type = "", dataType = "json", data = {};
  var that = this;
  if (this.followState === "unfollowed") {
    type = 'POST';
    data = { user_id: this.userId };
  } else {
    type = 'DELETE';
  }

  $.ajax({
    url: url,
    type: type,
    data: data,
    dataType: dataType,
    success: function () {
      that.toggleFollowState();
      that.render();
    }
  });
};

$.FollowToggle.prototype.toggleFollowState = function () {
  if (this.followState === 'followed') {
    this.followState = 'unfollowed';
  } else {
    this.followState = 'followed';
  }
};

$.fn.followToggle = function () {
  return this.each(function () {
    new $.FollowToggle(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
});
