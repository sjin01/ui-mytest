(function (factory) {

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(jQuery);
    }

}(function ($) {

    var defaults = {
        time: 3
    };

    $.fn.timeoutButton = function (opts) {

        var settings = $.extend({}, defaults, opts);

        $(this).each(function (i, itme) {

            $(itme).on('click', function () {
                var $self = $(this),
                    btnText = $self.text(),
                    time = settings.time;

                $self.prop('disabled', true);

                var func = function () {
                    $self.text(time);
                    if (time === 0) {
                        $self.text(btnText).prop('disabled', false);
                    } else {
                        setTimeout(func, 1000);
                    }
                    time--;
                };

                func();
            });

        });

    };

}));