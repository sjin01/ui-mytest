define(['jquery'], function ($) {

    return {

        /**
         * 切换左边的菜单栏
         */
        toggleSlider: function () {
            $('#main').toggleClass('grid-21').toggleClass('grid-23');
            $('.slider-switch').parent().toggleClass('slider-collapse')
                .parent().toggleClass('grid-3').toggleClass('grid-1')
                .find('.faicon-caret-left').toggleClass('hidden');
        },

        /**
         * 切换整体的最大宽度
         */
        toggleHeaderAndBody: function () {
            $('.header').find('.container-24').toggleClass('no-max-width');
            $('.body').find('.container-24').toggleClass('no-max-width');
            $('.expand-btn').toggleClass('faicon-expand').toggleClass('faicon-compress');
        },

        /**
         * 使左边菜单栏和右边内容区的高度相适应
         */
        adjustHeight: function () {
            var $main = $('#main');
            var $slider = $('.slider');
            if ($main && $slider) {
                $slider.css({
                    'height': $main.css('height')
                });
            }
        },

        /**
         * 根据浏览器窗口大小动态改变布局
         */
        resizeContent: function () {
            var me = this,
                docHeight = $(document).height(), winHeight = $(window).height(),
                $header = $('.header'), $body = $('.body'), $footer = $('.footer');

            if (typeof $header === 'object' &&
                typeof $body === 'object' &&
                typeof $footer === 'object') {

                var bodyMinHeight = winHeight - $header.height() - $footer.height(),
                    bodyHeight = docHeight - $header.height() - $footer.height();

                $body.css('min-height', bodyMinHeight + 'px');
                //$body.height(bodyMinHeight);
            }
        },

        isAllChecked: function () {
            this.set('isAllChecked', true);
        },

        /**
         * 为两个pikaday组件设置最早和最晚可选择日期
         */
        bindDateRange: function (start, end) {
            if (typeof start === 'string' && start.length > 0 && typeof end === 'string' && end.length > 0) {
                var startPicker = $(start).data('pikaday'),
                    initStartDate = startPicker.getDate(),
                    endPicker = $(end).data('pikaday'),
                    initEndDate = endPicker.getDate();

                if (initStartDate instanceof Date) {
                    startPicker.setStartRange(initStartDate);
                    endPicker.setStartRange(initStartDate);
                    endPicker.setMinDate(initStartDate);
                }

                if (initEndDate instanceof Date) {
                    endPicker.setEndRange(initEndDate);
                    startPicker.setEndRange(initEndDate);
                    startPicker.setMaxDate(initEndDate);
                }

                startPicker._o.onSelect = function () {
                    var startDate = startPicker.getDate();
                    startPicker.setStartRange(startDate);
                    endPicker.setStartRange(startDate);
                    endPicker.setMinDate(startDate);
                };

                endPicker._o.onSelect = function () {
                    var endDate = endPicker.getDate();
                    endPicker.setEndRange(endDate);
                    startPicker.setEndRange(endDate);
                    startPicker.setMaxDate(endDate);
                };
            }
        },

        // for pagination
        doCheckAll: function (event) {
            var allChecked = !!this.get('allChecked'),
                isAllChecked = !!this.get('isAllChecked');
            if (isAllChecked) {
                var items = this.get("items");
                for (var i = 0; i < items.length; i++) {
                    this.set("items[" + i + "].checked", allChecked);
                }
            }
        },

        // for pagination
        doCheckSingle: function (event) {
            this.set('isAllChecked', false);
            var checkedLength = 0,
                items = this.get("items");
            for (var i = 0; i < items.length; i++) {
                var checked = this.get("items[" + i + "].checked");
                if (checked) checkedLength++;
            }
            this.set("allChecked", items.length === checkedLength);
        },

        // check by jquery
        makeCheck: function (tableClass, totalId, singleName) {
            $('.' + tableClass).on('click', '#' + totalId, function () {
                $('[name="' + singleName + '"]').not(':disabled').prop('checked', $(this).prop('checked'));

            }).on('click', '[name="' + singleName + '"]', function () {
                var length = $('[name="' + singleName + '"]').not(':disabled').length, checkedLength = 0;
                $('[name="' + singleName + '"]').not(':disabled').each(function () {
                    if ($(this).prop('checked')) checkedLength++;
                })
                $('#' + totalId).prop('checked', length === checkedLength);
            });
        },

        /**
         根据〖中华人民共和国国家标准 GB 11643-1999〗中有关公民身份号码的规定，公民身份号码是特征组合码，由十七位数字本体码和一位数字校验码组成。排列顺序从左至右依次为：六位数字地址码，八位数字出生日期码，三位数字顺序码和一位数字校验码。
         地址码表示编码对象常住户口所在县(市、旗、区)的行政区划代码。
         出生日期码表示编码对象出生的年、月、日，其中年份用四位数字表示，年、月、日之间不用分隔符。
         顺序码表示同一地址码所标识的区域范围内，对同年、月、日出生的人员编定的顺序号。顺序码的奇数分给男性，偶数分给女性。
         校验码是根据前面十七位数字码，按照ISO 7064:1983.MOD 11-2校验码计算出来的检验码。

         出生日期计算方法。
         15位的身份证编码首先把出生年扩展为4位，简单的就是增加一个19或18,这样就包含了所有1800-1999年出生的人;
         2000年后出生的肯定都是18位的了没有这个烦恼，至于1800年前出生的,那啥那时应该还没身份证号这个东东，⊙﹏⊙b汗...
         下面是正则表达式:
         出生日期1800-2099  (18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])
         身份证正则表达式 /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i
         15位校验规则 6位地址编码+6位出生日期+3位顺序号
         18位校验规则 6位地址编码+8位出生日期+3位顺序号+1位校验位

         校验位规则     公式:∑(ai×Wi)(mod 11)……………………………………(1)
         公式(1)中：
         i----表示号码字符从由至左包括校验码在内的位置序号；
         ai----表示第i位置上的号码字符值；
         Wi----示第i位置上的加权因子，其数值依据公式Wi=2^(n-1）(mod 11)计算得出。
         i 18 17 16 15 14 13 12 11 10 9 8 7 6 5 4 3 2 1
         Wi 7 9 10 5 8 4 2 1 6 3 7 9 10 5 8 4 2 1

         // 身份证号合法性验证
         // 支持15位和18位身份证号
         // 支持地址编码、出生日期、校验位验证

         */
        identitycard: function( value ) {

            var regExp = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i,
                city = {11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "},
                pass = true;

            if (!regExp.test(value)) {
                pass = false;

            } else if (!city[value.substr(0,2)]) {
                pass = false;

            } else {
                // 如果是18位身份证，则需要对最后一位进行校验
                if (value.length === 18) {
                    value = value.split('');

                    //∑(ai×Wi)(mod 11)
                    //加权因子
                    var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                    //校验位
                    var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                    var sum = 0;
                    var ai = 0;
                    var wi = 0;

                    for (var i = 0; i < 17; i++) {
                        ai = value[i];
                        wi = factor[i];
                        sum += ai * wi;
                    }

                    if(parity[sum % 11] != value[17]){
                        pass = false;
                    }
                }
            }
            return pass;
        }

    }

});