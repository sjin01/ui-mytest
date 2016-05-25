define(['jquery', 'ractive'], function ($, Ractive) {

    return {

        loadTpl: function (opts) {

            var defaults = {

                append: true        // how to handle existing content in the dom

            };

            return new Ractive($.extend({}, defaults, opts));

        }

    };

});