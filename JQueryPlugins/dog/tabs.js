$.Tabs = function (el) {
  this.$el = $(el);
  var selector = this.$el.data('content-tabs');
  this.$contentTabs = $(selector);
  this.$activeTab = this.$contentTabs.find('.active');
  this.$el.on('click', 'a', $.Tabs.clickTab.bind(this));
 };

$.Tabs.clickTab = function(event) {
  event.preventDefault();
  var $oldlink = this.$el.find("a[href='#" + this.$activeTab.attr('id') + "']");
  var $newlink = $(event.currentTarget);
  if ($newlink !== $oldlink) {
    var $oldTab = this.$activeTab;
    this.$activeTab.removeClass("active");
    this.$activeTab.addClass("transitioning");
    this.$activeTab.one('transitionend', function () {
      $oldTab.removeClass("transitioning");
      this.$activeTab = this.$contentTabs.find($newlink.attr("href"));
      this.$activeTab.addClass("active").addClass("transitioning");
      setTimeout(function() {
        this.$activeTab.removeClass("transitioning");
      }.bind(this), 0);
    }.bind(this));

    $oldlink.removeClass("active");
    $newlink.addClass("active");
  }
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
