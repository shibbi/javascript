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
