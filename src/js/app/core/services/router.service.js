(function () {
    "use strict";

    angular
        .module("app.core.services")
        .factory("RouterService", RouterService);

    function RouterService() {

        function getAPIUrl(url) {
            if (!url) {
                url = "";
            }

            if (url[0] === "/") {
                url = url.substr(1); // remove slash if it is present
            }

            var currentUrl = window.location;
            var apiUrl = "http://localhost:3000/"; // Dev domain

            // if (currentUrl.host === "agent.uniqa.me") {
                // apiUrl = "https://powerful-caverns-39064.herokuapp.com/"; // Production domain
            // }

            return apiUrl + url;
        }

        function apiRoutes(key) {
            var routes = {
                ListaAgenata:               "User/ListaAgenata"
            };

            return getAPIUrl(routes[key]);
        }

        function getLoginUrl(url) {
            if (!url) {
                url = "";
            }

            if (url[0] === "/") {
                url = url.substr(1); // remove slash if it is present
            }

            var currentUrl = window.location;
            var apiUrl = "http://localhost:3000/"; // Dev domain

            // // if (currentUrl.host === "agent.uniqa.me") {
            //     apiUrl = "http://webshop-admin.uniqa.me/index.php/"; // Production domain
            // // }

            return apiUrl + url;
        }

        function loginRoutes(key) {
            var routes = {
                login:          "/auth/login",
                getUserInfo:    "getUserInfo",
                logout:         "/auth/logout"
            };

            return getLoginUrl(routes[key]);
        }

        function localRoutes(key) {
            var routes = {
                empty: ""
            };

            return routes[key];
        }

        function serverRoute() {
            var currentUrl = window.location;
            var apiUrl = "https://powerful-caverns-39064.herokuapp.com/"; // Dev domain

            // if (currentUrl.host === "agent.uniqa.me") {
                // apiUrl = "https://powerful-caverns-39064.herokuapp.com/"; // Production domain
            // }

            return apiUrl;
        }

        return {
            getAPIUrl: getAPIUrl,
            apiRoutes: apiRoutes,
            loginRoutes: loginRoutes,
            localRoutes: localRoutes,
            serverRoute: serverRoute()
        };
    }

})();
