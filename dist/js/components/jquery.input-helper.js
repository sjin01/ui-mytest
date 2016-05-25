/**
 * Created by zg on 2015/9/18.
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

    var inputHelper;

    var defaults = {
        integer: false, // 只能输入整数
        decimal: false, // 只能输入小数
        digit: null,
        min: null,
        max: null
    }

    inputHelper = $.fn.inputHelper = function (options) {

        var settings = $.extend({}, defaults, options);

        $(this).each(function (index) {
            var $me = $(this);
            $me.on('keydown', function (event) {
                return keydown.call(this, event, settings);
            }).on('blur', function (event) {
                blur.call(this, event, settings);
            });

        });
    }

    function keydown (event, settings) {

        var keyCode = event.keyCode || event.charCode || event.which,
            val = $(this).val(),
            inputStr = String.fromCharCode(keyCode);

        // 允许在小键盘输入数字
        if (keyCode >= 96 && keyCode <= 105) return true;

        //tab,enter,小键盘enter,.
        var validKeys = [9, 13, 108, 110];
        if ($.inArray(keyCode, validKeys) !== -1) return true;

        // 允许输入退格、左、右
        if (valid(keyCode, settings)) return true;

        // 允许ctrl+a, ctrl+c, ctrl+x
        var oprKeys = [65, 67, 88];
        if (event.ctrlKey && $.inArray(keyCode, oprKeys) !== -1) {
            return true;
        }

        if (!inputStr) return false;

        if (settings.integer) return /\d/.test(inputStr);

        /*
         只能输入数字或小数点
         不能以小数点开头
         小数点不能重复
         */
        if (settings.decimal) {
            return !(/[\d]/.test(inputStr) || keyCode === 190) ? false :
                (val.length === 0) ? keyCode !== 190 :
                    /[.]/g.test(val) ? keyCode !== 190 : true;
        }

        return true;
    }

    function blur (event, settings) {
        var $input = $(this), val = $input.val();

        if (settings.integer || settings.decimal) {
            val = settings.integer ? parseInt(val) : settings.decimal ? parseFloat(val) : val;

            if (isNaN(val)) {
                if (!isNaN(settings.min)) $input.val(settings.min);
                else $input.val(0);
                return;
            }

            val = validateMinOrMax(val, settings);

            if (settings.decimal && settings.digit > 0) {
                val = val.toFixed(settings.digit);
            }

            $input.val(val);
        } else {
            // when input is not number...
        }

    }

    /**
     * firefox 在中文输入法下，按下任何按键keyCode都是0
     * @param keyCodes
     * @returns {boolean}
     */
    function valid (keyCode, settings) {
        //var numbers = [48, 49 ,50, 51, 52, 53, 54, 55, 56, 57];
        var others = [8, 37, 39]; // backspace,left,right
        //var points = [190];

        for (var i = 0; i < others.length; i++) {
            if (keyCode === others[i]) return true;
        }
        return false;
    }

    function validateMinOrMax (value, settings) {
        if (settings.min && value < settings.min) return settings.min;
        if (settings.max && value > settings.max) return settings.max;
        return value;
    }

}));