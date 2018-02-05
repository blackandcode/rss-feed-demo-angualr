(function () {
    "use strict";

    angular
        .module("app.core.services")
        .factory("app", app);

    function app() {

        var app = {
            userData: null,
            zivotnoUserId: 0,
            propertyExists: propertyExists,
            defaultStanje: defaultStanje,
            imaAdminSekciju: imaAdminSekciju
        };
        return app;

        function propertyExists(obj, key) {
            return key.split(".").every(function (x) {
                if (typeof obj !== "object" || obj === null || !(x in obj)) return false;

                obj = obj[x];

                return true;
            });
        }

        function defaultStanje(userData) {
            return 'app.feed-list';
        }


        function imaAdminSekciju(id) {
            for (var i = 0; i<app.userData.adminPermissions.length; i++) {
                if(app.userData.adminPermissions[i].id === id) {
                    return true;
                }
            }
            return false;
        }
    }

})();
