(function () {
  if (typeof Hanoi === "undefined") {
    window.Hanoi = {};
  }

  var View = Hanoi.View = function (game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupTowers();
    this.bindEvents();
    this.$firstStack = undefined;
  };

  View.prototype.bindEvents = function () {
    var self = this;
    $(".stack").on("click", function (event) {
      self.clickTower($(event.currentTarget));
    });
  };

  View.prototype.clickTower = function ($stack) {
    if (this.$firstStack === undefined) {
      this.$firstStack = $stack;
      $stack.toggleClass("selected");
    } else {
      var $secondStack = $stack;
      this.$firstStack.toggleClass("selected");
      var fromStack = this.$firstStack.data('id');
      var toStack = $secondStack.data('id');
      if (this.game.isValidMove(fromStack, toStack)) {
        this.game.move(fromStack, toStack);
      } else {
        alert('invalid move yo');
      }
      this.$firstStack = undefined;
      this.render();
    }
    if (this.game.isWon()) {
      var $message = $("<h2>You've won!</h2>");
      this.$el.after($message);
      this.$el.off();
    }
  };

  View.prototype.setupTowers = function () {
    for (var i = 0; i < this.game.towers.length; i++) {
      var $stack = $("<div></div>");
      $stack.addClass("stack group");
      $stack.data("id", i);
      this.$el.append($stack);
    }
    this.render();
  };

  View.prototype.render = function() {
    $(".stack").empty();
    for (var i = 0; i < this.game.towers.length; i++) {
      var stack = this.game.towers[i];
      var $stack = $(".stack").filter(function() { return $.data(this, "id") === i; });
      for (var j = stack.length - 1; j >= 0; j--) {
        var $disc = $("<div></div>");
        $disc.addClass("disc disc-" + stack[j]);
        $stack.append($disc);
      }
    }
  };
})();
