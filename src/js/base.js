require.config({

    baseUrl: '/src/js',

    paths: {
        /** jquery及相关组件 */
        'jquery': 'libs/jquery-1.11.1',
        'jqSwitch': 'components/jquery.switch',
        'jqTooltip': 'components/jquery.tooltip',
        'timeoutButton': 'components/jquery.timeout-button',
        'validate': 'components/validate/jquery.validate',
        'validate-zh': 'components/validate/messages_zh',
        'inputHelper': 'components/jquery.input-helper',

        /** ractive及相关组件 */
        'ractive': 'libs/ractive-legacy',
        'ractive-slide': 'libs/ractive-transitions-slide',
        'ractive-tooltip': 'components/ractive-tooltip',
        'ui': 'components/ui',
        'popup': 'components/popup',
        'alert': 'components/alert',
        'confirm': 'components/confirm',
        'pagination': 'components/pagination',
        'jquery-pagination': 'components/jquery.pagination',

        /** bootstrap及相关组件 */
        'bootstrap': 'libs/bootstrap-3.0.3',
        'multiselect': 'components/bootstrap-multiselect',

        /** 其他组件 */
        'general': 'libs/general',
        'tplUtil': 'libs/template-utility',
        'eventUtil': 'libs/event-utility',
        'pikadaytime': 'components/pikaday.jquery',
        'moment': 'components/moment',
        'icheck': 'components/icheck',
        'lightbox': 'components/lightbox',
        'message': 'components/jquery.message'
    },

    shim: {
        'bootstrap': {
            deps: ['jquery']
        },
        'multiselect': {
            deps: ['bootstrap']
        },
        'icheck': {
            deps: ['jquery']
        },
        'jquery-pagination': {
            deps: ['jquery']
        }
    }

});

define("base", [
    'jquery',
    'jqSwitch',
    'jqTooltip',
    'timeoutButton',
    'validate',
    'validate-zh',
    'inputHelper',

    'ractive',
    'ractive-slide',
    'ractive-tooltip',
    'ui',
    'popup',
    'alert',
    'confirm',
    'pagination',
    'jquery-pagination',

    'bootstrap',
    'multiselect',

    'general',
    'tplUtil',
    'eventUtil',
    'pikadaytime',
    'moment',
    'icheck',
    'lightbox',
    'message'
], function () {
});