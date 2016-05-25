/**
 * Created by martin on 6/24/15.
 */
define(['jquery', 'text!../../templates/components/components.rac', 'ractive', 'ui'], function ($, Templates, Ractive, UI) {

    UI.Popup = UI.extend(UI, function (opts) {

        if (!isNaN(opts.width)) {
            opts.width = opts.width + "px";
        }

        if (!isNaN(opts.height)) {
            opts.height = opts.height + "px";
        }

        var me = this,
            template = opts.template || '',
            actions = opts.actions || {}, // 自定义事件
            data = {
                width: opts.width || '360px',
                height: opts.height || '240px',
                title: opts.title || '提示'
            };

        var popup = new Ractive($.extend(
            {
                el: 'body',
                append: true,
                template: $(Templates).filter("#popup").html(),
                data: data,
                partials: {
                    template: $(template).html()
                },
                onrender: function () {
                    var self = this, resizeHandler;

                    this.on('close', function (event) {
                        this.teardown();
                    });

                    $(window).on('resize', resizeHandler = function (event) {
                        self.center();
                    });

                    this.on('teardown', function () {
                        $(window).off('resize', resizeHandler);
                    });

                    /*this.on("stopPropagation", function (event) {
                        event.original.stopPropagation();
                    });*/

                    this.center();
                },
                oncomplete: function () {
                    var innerCenter = this.find('.inner-center');
                    if (innerCenter) {
                        var height = $(innerCenter).height();
                        innerCenter.style["line-height"] = height + "px";
                    }
                },
                center: function () {
                    var containerHeight, popupHeight, verticalSpace;

                    containerHeight = $('.popup_container').height();
                    popupHeight = $('.popup_center').height();

                    verticalSpace = (containerHeight - popupHeight) / 2;

                    $('.popup_center').css({'top': verticalSpace + 'px'});
                }
            },
            actions
        ));

        me.close = function(){
            popup.fire('close');
        };

        me.on = function (eventName, func) {
            popup.on(eventName, func);
        };

        me.set = function (path, data) {
            popup.set(path, data);
        };

        me.fire = function (eventName) {
            popup.fire(eventName);
        };

        return popup;
    });

    return UI.Popup;
});