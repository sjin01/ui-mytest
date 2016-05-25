/**
 * Created by zg on 2015/9/22.
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

    var jqSwitch;

    var defaults = {
        onText: '是',
        offText: '否',
        theme: 'green',
        hasRadius: true
    };

    var wrapClass = 'jqSwitch-wrapper',
        stateClass = 'jqSwitch-state',
        stateOnClass = 'state-on',
        stateOffClass = 'state-off',
        disabledClass = 'jqSwitch-wrapper-disabled',
        readOnlyClass = 'jqSwitch-wrapper-readOnly';

    jqSwitch = $.fn.jqSwitch = function (options) {

        var settings = $.extend({}, defaults, options);
        settings.wrapOnClass = 'wrapper-on-' + settings.theme,
        settings.wrapOffClass = 'wrapper-off-' + settings.theme;

        $(this).each(function () {
            var $checkbox = $(this);

            buildWrapper($checkbox, settings);

            $checkbox.on('click', function () {
                toggleState.call(this, settings);

            }).on('toggleState', function () {
                toggleProp.call(this, 'checked');
                toggleState.call(this, settings);

            }).on('toggleDisabled', function () {
                toggleDisabled.call(this);

            }).on('toggleReadonly', function () {
                toggleReadonly.call(this);
            });

        });

    };;

    function buildWrapper($checkbox, settings) {
        var $wrapper = $('<label></label>').addClass(wrapClass),
            $state = $('<span></span>').addClass(stateClass);

        if (!settings.hasRadius) {
            $wrapper.addClass('no-radius');
            $state.addClass('no-radius');
        }

        var checked = $checkbox.prop('checked'),
            disabled = $checkbox.prop('disabled'),
            readonly = $checkbox.prop('readonly');

        if (checked) {
            $wrapper.addClass(settings.wrapOnClass);
            $state.text(settings.onText).addClass(stateOnClass);
        } else {
            $wrapper.addClass(settings.wrapOffClass);
            $state.text(settings.offText).addClass(stateOffClass);
        }

        if (disabled) {
            $wrapper.addClass(disabledClass);
        }

        if (readonly) {
            $wrapper.addClass(readOnlyClass);
        }

        $checkbox.wrap($wrapper).before($state);
    }

    function toggleState(settings) {
        var $checkbox = $(this),
            $wrapper = $checkbox.parent(),
            $state = $wrapper.find('.' + stateClass),
            checked = $checkbox.prop('checked');

        // checkbox没有readonly属性
        if ($checkbox.prop('readonly')) {
            $checkbox.prop('checked', !checked);
            return false;
        }

        if (checked) {
            $state.text(settings.onText);
        } else {
            $state.text(settings.offText);
        }

        $wrapper.toggleClass(settings.wrapOnClass).toggleClass(settings.wrapOffClass);
        $state.toggleClass(stateOnClass).toggleClass(stateOffClass);
    }

    function toggleDisabled() {
        $(this).parent().toggleClass(disabledClass);
        toggleProp.call(this, 'disabled');
    }

    function toggleReadonly() {
        $(this).parent().toggleClass(readOnlyClass);
        toggleProp.call(this, 'readonly');
    }

    function toggleProp(propName) {
        var disabled = $(this).prop(propName);
        if (disabled) $(this).removeProp(propName);
        else $(this).prop(propName, propName);
    }

}));
