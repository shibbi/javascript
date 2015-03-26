$.Thumbnails = function (el) {
  this.$el = $(el);
  this.$gutterImages = this.$el.find("img");
  this.$activeImg = $.Thumbnails.activate.bind(this, $(this.$gutterImages[0]))();

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
};

$.Thumbnails.activate = function($img) {
  var $clonedImage = $img.clone();
  $(this.$el.find(".active")).html($clonedImage);
  return $clonedImage;
};

$.fn.thumbnails = function () {
  return this.each(function () {
    new $.Thumbnails(this);
  });
};
