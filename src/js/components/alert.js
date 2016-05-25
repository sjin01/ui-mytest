/**
 * Created by martin on 6/24/15.
 */
define(['jquery', 'popup', 'ui'], function ($, Popup, UI) {

    UI.Alert = UI.extend(UI, function (newContent, newTitle, newYesText, newImgClass) {

        var me = this,
            template,
            content,
            title,
            yesText,
            imgClass,
            imgColor;

        if (!newContent || !(typeof newContent === "string" || newContent instanceof Object)) {
            throw new Error('The parameters is valid.');
        }

        if (typeof newContent === "string") {
            content = newContent || '请输入待确认内容。';
            title = newTitle || '确认';
            yesText = newYesText || '确定';
            imgClass = newImgClass || '';

        } else if (newContent instanceof Object) {
            content = newContent.content || '请输入待确认内容。';
            title = newContent.title || '确认';
            yesText = newContent.yesText || '确定';
            imgClass = newContent.imgClass || '';
            imgColor = newContent.imgColor || '';
        }

        imgClass = imgClass ? "glyphicon mgr-20 glyphicon-" + imgClass : '';

        if (imgColor) imgClass += " " + imgColor;

        template = '<div><div class="content-wrapper alert-wrapper">' +
            '<div class="content-center"><div class="content-center-inner"><i class="' + imgClass + '"></i>' + content + '</div></div>' +
            '<div class="content-bottom"><button class="btn btn-yes no-radius" on-click="yes">' + yesText + '</button></div>' +
            '</div></div>';

        var alert = new Popup({
            title: title,
            template: template
        });

        alert.on('yes', function (event) {
            this.teardown();
        });

        return alert;

    });

    return UI.Alert;
});