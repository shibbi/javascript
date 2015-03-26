$.Carousel = function (el) {
  this.$el = $(el);
  this.activeIdx = 0;
  $(this.$el.find("div.items img").eq(0)).addClass("active");
  this.$el.find(".slide-left").on("click", slide.bind(this, 1));
  this.$el.find(".slide-right").on("click", slide.bind(this, -1));
};

var slide = function(dir) {
  var $currentItem = $(this.$el.find("div.items img").eq(this.activeIdx));
  $currentItem.removeClass("active");
  if (dir === 1) {
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
