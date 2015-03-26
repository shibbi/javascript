$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  $(this.$el.find("div.items img").eq(0)).addClass("active");
  this.$el.find(".slide-left").on("click", slide.bind(this, 1));
  this.$el.find(".slide-right").on("click", slide.bind(this, -1));
  this.transitioning = false;
};

var slide = function(dir) {
  if (this.transitioning === true) {
    return;
  }
  this.transitioning = true;
  var $currentItem = $(this.$el.find("div.items img").eq(this.activeIdx));
  if (dir === 1) {
    $currentItem.addClass("right");
    $currentItem.one('transitionend', function () {
      $currentItem.removeClass("right").removeClass("active");
      this.transitioning = false;
    }.bind(this));
    this.activeIdx -= 1;
    if (this.activeIdx < 0) {
      this.activeIdx += this.$el.find("div.items").children().length;
    }
    var $nextItem = $(this.$el.find("div.items img").eq(this.activeIdx));
    $nextItem.addClass("active left");
    setTimeout(function() {
      $nextItem.removeClass("left");
    }.bind(this), 0);
  } else {
    $currentItem.addClass("left");
    $currentItem.one('transitionend', function () {
      $currentItem.removeClass("left").removeClass("active");
      this.transitioning = false;
    }.bind(this));
    this.activeIdx += 1;
    if (this.activeIdx >= this.$el.find("div.items").children().length) {
      this.activeIdx -= this.$el.find("div.items").children().length;
    }
    var $nextItem = $(this.$el.find("div.items img").eq(this.activeIdx));
    $nextItem.addClass("active right");
    setTimeout(function() {
      $nextItem.removeClass("right");
    }.bind(this), 0);
  }

};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};
