(function () {
    "use strict";

    angular
        .module("error")
        .controller("ErrorController", ErrorController);

    ErrorController.$inject = ["$timeout", "app", "$localStorage", "$state", "$stateParams"];

    function ErrorController($timeout, app, $localStorage, $state, $stateParams) {
        var vm = this;
        vm.errorMessage = $stateParams.message || "Some error occurred. Please try again!";
        vm.showLoader = false;
        vm.disableButton = false;
        vm.reload = reload;
        vm.backToLogin = backToLogin;

        function reload(event) {
            vm.showLoader = true;
            vm.disableButton = true;
            $state.go(app.defaultStanje(app.userData));
        }

        function backToLogin(event) {
            vm.disableButton = true;
            delete $localStorage.token;
            app.userData = null;
            app.zivotnoUserId = 0;
            $state.go("login", {message: ""});
        }
    }

})();
