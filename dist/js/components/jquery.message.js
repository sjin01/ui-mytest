/**
 * Created by zg on 2015/12/15.
 */
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD (Register as an anonymous module)
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var Message = function (options) {
        var self = this;
        self.options = $.extend(self.constructor.defaults, options);
        self.init();
    };

    var url = '#no-url',
        template = '<a href="'+url+'" class="btn btn-link btn-sm">您有 <span class="color-orange-deep">1</span> 条新的通知</a>';

    Message.defaults = {
        template: template,
        timeout: 10000
    };

    Message.prototype.init = function () {
        this.build();
        this.show();
    };

    Message.prototype.build = function () {
        var self = this;

        var rootContainer = $('#main')[0] || $('.main')[0] || $('.body_box')[0] || $('body')[0];
        self.$rootContainer = $(rootContainer);
        self.$newMsgContainer = $('<div class="message-container border-gray-medium"></div>').append($(self.options.template));

        var $msgContainers = $('.message-container'),
            lastMsgContainer = $msgContainers[$msgContainers.length - 1],
            newMsgContainerTop = 10;

        if (lastMsgContainer != null) {
            var $lastMsgContainer = $(lastMsgContainer),
                top = $lastMsgContainer.position().top,
                height = $lastMsgContainer.height();
            newMsgContainerTop += (top + height + 10);
        }

        self.$newMsgContainer.animate({
            'top': newMsgContainerTop + 'px'
        });

        self.$rootContainer.append(self.$newMsgContainer);

        setTimeout(function () {
            self.destroy();
        }, self.options.timeout);
    };

    Message.prototype.show = function () {
        this.$newMsgContainer.fadeIn();
    };

    Message.prototype.destroy = function () {
        var self = this;

        var top = self.$newMsgContainer.position().top,
            height = self.$newMsgContainer.height(),
            moveToTop = top + height + 10;

        self.$newMsgContainer.fadeOut(function () {
            self.$newMsgContainer.remove();

            $('.message-container').each(function () {
                var item = $(this),
                    newTop = item.position().top - moveToTop;

                item.animate({
                    'top': newTop + 'px'
                });
            });
        });
    };

    return Message;
}));
