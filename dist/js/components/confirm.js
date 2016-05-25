/**
 * Created by martin on 6/24/15.
 */
define(['jquery', 'popup', 'ui'], function ($, Popup, UI) {

    UI.Confirm = UI.extend(UI, function (newContent, newTitle, newYesText, newNoText, newImgClass) {

        var me = this,
            template,
            content,
            title,
            yesText,
            noText,
            imgClass,
            imgColor;

        if (!newContent || !(typeof newContent === "string" || newContent instanceof Object)) {
            throw new Error('The parameters is valid.');
        }

        if (typeof newContent === "string") {
            content = newContent || '请输入待确认内容。';
            title = newTitle || '确认';
            yesText = newYesText || '确定';
            noText = newNoText || '取消';
            imgClass = newImgClass || '';

        } else if (newContent instanceof Object) {
            content = newContent.content || '请输入待确认内容。';
            title = newContent.title || '确认';
            yesText = newContent.yesText || '确定';
            noText = newContent.noText || '取消';
            imgClass = newContent.imgClass || '';
            imgColor = newContent.imgColor || '';
        }

        imgClass = imgClass ? "glyphicon mgr-20 glyphicon-" + imgClass : '';

        if (imgColor) imgClass += " " + imgColor;

        template = '<div><div class="content-wrapper confirm-wrapper">' +
            '<div class="content-center"><div class="content-center-inner"><i class="' + imgClass + '"></i>' + content + '</div></div>' +
            '<div class="content-bottom"><button class="btn btn-yes no-radius" on-click="yes">' + yesText + '</button>' +
            '<button class="btn btn-no no-radius" on-click="no">' + noText + '</button></div>' +
            '</div></div>';

        var confirm = new Popup({
            title: title,
            template: template
        });

        confirm.on('yes', function (event) {
            this.teardown();
        });

        confirm.on('no', function (event) {
            this.teardown();
        });

        return confirm;

    });

    return UI.Confirm;
});