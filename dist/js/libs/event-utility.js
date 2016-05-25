define(function () {

    return {

        addHandler: function (element, type, handler) {
            if (element.addEventListener) {
                element.addEventListener(type, handler, false);
            } else if (element.attachEvent) {
                element.attachEvent('on' + type, handler);
            } else {
                element['on' + type] = handler;
            }
        },

        getEvent: function (event) {
            return event || window.event;
        },

        getPageXY: function (event) {
            var pageX = event.pageX ? event.pageX :
                    event.clientX + (document.body.scrollLeft || document.documentElement.scrollLeft),
                pageY = event.pageY ? event.pageY :
                    event.clientY + (document.body.scrollTop || document.documentElement.scrollTop);

            return {
                x: pageX,
                y: pageY
            };
        },

        getTarget: function (event) {
            return event.target || event.srcElement;
        },

        preventDefault: function (event) {
            if (event.preventDefault) {
                event.preventDefault();
            } else {
                event.returnValue = false;
            }
        },

        removeHandler: function (element, type, handler) {
            if (element.removeEventListener) {
                element.removeEventListener(type, handler, false);
            } else if (element.detachEvent) {
                element.detachEvent('on' + type, handler);
            } else {
                element['on' + type] = null;
            }
        },

        stopPropagation: function (event) {
            if (event.stopPropagation) {
                event.stopPropagation();
            } else {
                event.cancelBubble = true;
            }
        }
    };

});