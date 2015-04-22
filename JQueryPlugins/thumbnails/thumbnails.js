$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$images = this.$el.find("img");
  this.gutterIdx = 1;
  $.Thumbnails.fillGutterImages.bind(this)();
  this.$activeImg = $.Thumbnails.activate.bind(this, this.$images.eq(0))();

  this.$el.find(".gutter-images").on('click', 'img', function (event) {
    var $currentImg = $(event.currentTarget);
    this.$activeImg = $.Thumbnails.activate.bind(this, $currentImg)();
  }.bind(this));

  this.$el.find(".gutter-images").on('mouseenter', 'img', function (event) {
    var $currentImg = $(event.currentTarget);
    $.Thumbnails.activate.bind(this, $currentImg)();
  }.bind(this));

  this.$el.find(".gutter-images").on('mouseleave', 'img', function (event) {
    $.Thumbnails.activate.bind(this, $(this.$activeImg))();
  }.bind(this));

  this.$el.find(".nav").on('click', function (event) {
    if ($(event.currentTarget).hasClass('prev')) {
      this.gutterIdx -= 1;
      if (this.gutterIdx < 0) {
        this.gutterIdx += this.$images.length;
      }
    } else {
      this.gutterIdx += 1;
      if (this.gutterIdx >= this.$images.length) {
        this.gutterIdx -= this.$images.length;
      }
    }
    $.Thumbnails.fillGutterImages.bind(this)();
  }.bind(this));
};

$.Thumbnails.activate = function($img) {
  var $clonedImage = $img.clone();
  $(this.$el.find(".active")).html($clonedImage);
  return $clonedImage;
};

$.Thumbnails.fillGutterImages = function() {
  this.$el.find(".gutter-images").empty();
  var times = 5;
  var i = this.gutterIdx;
  while (times > 0) {
    $('.gutter-images').append(this.$images[i]);
    i++;
    if (i < 0) {
      i += this.$images.length;
    } else if (i >= this.$images.length) {
      i -= this.$images.length;
    }
    times--;
  }
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
