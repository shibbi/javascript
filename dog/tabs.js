$.Tabs = function (el) {
  this.$el = $(el);
  var selector = this.$el.data('content-tabs');
  this.$contentTabs = $(selector);
  this.$activeTab = this.$contentTabs.find('.active');
  this.$el.on('click', 'a', $.Tabs.clickTab.bind(this));
 };

$.Tabs.clickTab = function(event) {
  event.preventDefault();
  // var $link = this.$el.find("a[href='#" + this.$activeTab.attr('id') + "']");
  // console.log("Removing active on " + this.$activeTab);
  var $oldlink = this.$el.find("a[href='#" + this.$activeTab.attr('id') + "']");
  var $newlink = $(event.currentTarget);
  if ($newlink !== $oldlink) {
    this.$activeTab.removeClass("active");
    $oldlink.removeClass("active");
    $newlink.addClass("active");
    this.$activeTab = this.$contentTabs.find($newlink.attr("href"));
    this.$activeTab.addClass("active");
  }
  // var $id = $(event.currentTarget).attr('href');
  // this.$activeTab = this.$contentTabs.find($id).addClass("active");
  // var $newlink = this.$el.find("a[href='#" + this.$activeTab.attr('id') + "']");
  // $newlink.addClass("active");
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};
