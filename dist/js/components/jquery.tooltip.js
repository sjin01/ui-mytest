/**
 * Created by zg on 2015/9/24.
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

    var jqTooltip,
        wrapClass = 'jq-tooltip',
        innerClass = 'jq-tooltip-content';

    var defaults = {
        id: null,
        width: 200,
        html: null,
        showDelay: 200,
        hideDelay: 250,
        top: true,
        bottom: false
    };

    jqTooltip = $.fn.jqTooltip = function (options) {
        var $tooltips = $(this),
            settings = $.extend({}, defaults, options);

        $tooltips.each(function () {
            buildWrapper.call(this, settings);

        });
    };

    function buildWrapper (settings) {
        var $tooltip = $(this).addClass(wrapClass),
            $inner = $('<div></div>').addClass(innerClass).width(settings.width);

        if (settings.id) $inner.attr('id', settings.id);
        if (settings.html) $inner.html(settings.html);

        $tooltip.append($inner);

        /*$tooltip.on('mouseenter', function () {
         var delay = settings.showDelay || 0;
         setTimeout(function () {
         //locateInner($tooltip, $inner, settings);
         $inner.show();
         }, delay);
         }).on('mouseleave', function () {
         var delay = settings.hideDelay || 0;
         setTimeout(function () {
         $inner.hide();
         }, delay);
         });*/

        //locateInner($tooltip, $inner, settings);
    }

    /*function locateInner ($wrapper, $inner, settings) {
        var offset = $wrapper.offset(),
            wrapperWidth = $wrapper.outerWidth(),
            wrapperHeight = $wrapper.outerHeight(),
            innerWidth = $inner.outerWidth(),
            innerHeight = $inner.outerHeight(),
            windowWidth = $(window).width();

        if (settings.top) {
            offset.top -= innerHeight;
        } else {
            offset.top += wrapperHeight;
        }

        if (settings.right) {
            offset.left += wrapperWidth - innerWidth;
        }

        if (offset.left + wrapperWidth > windowWidth) {
            offset.left = windowWidth - innerWidth;
        }

        offset.top = offset.top > 0 ? offset.top : 0;
        offset.left = offset.left > 0 ? offset.left : 0;

        $inner.offset(offset);
    }*/

}));