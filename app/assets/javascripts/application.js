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

$.UsersSearch = function (el) {
  this.$el = $(el);
  this.$input = this.$el.find("input");
  this.$ul = this.$el.find("ul.users");
  this.$input.on("input", function() {
    this.handleInput(event);
  }.bind(this));
};

$.UsersSearch.prototype.handleInput = function (event) {
  var that = this;
  var val = $(event.currentTarget).val();

  $.ajax({
    url: "/users/search",
    type: 'GET',
    data: { query: val },
    dataType: "json",
    success: function (userData) {
      that.renderResults(userData);
    }
  });
};

$.UsersSearch.prototype.renderResults = function (userData) {
  this.$ul.html("");
  for (var i = 0; i < userData.length; i++) {
    var id = userData[i].id;
    var name = userData[i].username;
    var $li = $($.parseHTML("<li><a href='/users/" + id + "'>" + name + "</a>" +
                           " <button class='follow-toggle'></button></li>"));
    var followState = userData[i].followed ? 'followed' : 'unfollowed';
    var opts = { userId: id, followState: followState };
    $li.find("button").followToggle(opts);
    this.$ul.append($li);
  }
};

$.fn.usersSearch = function () {
  return this.each(function () {
    new $.UsersSearch(this);
  });
};

$(function () {
  $("button.follow-toggle").followToggle();
  $("div.users-search").usersSearch();
});
