(function () {
    "use strict";

    angular
        .module("login")
        .controller("LoginController", LoginController);

    LoginController.$inject = ["$scope", "$http", "RouterService", "app", "$localStorage", "$state", "$stateParams"];

    function LoginController($scope, $http, RouterService, app, $localStorage, $state, $stateParams) {
        var vm = this;
        vm.errorMessage = $stateParams.message || "";
        vm.showLoader = false;
        vm.formId = "loginForm";
        vm.schema = {
            "type": "object",
            "properties": {
                "username": {
                    "type": "string",
                    "title": "Username"
                },
                "password": {
                    "type": "string",
                    "title": "Password"
                }
            },
            "required": [
                "username",
                "password"
            ]
        };
        vm.form = [
            {
                "key": "username",
                "type": "text"
            },
            {
                "key": "password",
                "type": "password"
            },
            {
                "type": "submit",
                "htmlClass": "prijavi-se",
                "title": "Log In"
            }
        ];
        vm.model = {
            "username": "",
            "password": ""
        };
        vm.sfOptions = {
            validationMessage: {
                302: 'Obavezno polje',
                101: '{{viewValue}} je manje od dozvoljene vrijednosti {{schema.minimum}}',
                103: '{{viewValue}} je veće od dozvoljene vrijednosti {{schema.maximum}}'
            }
        };
        vm.onSubmit = onSubmit;

        function onSubmit(form) {
            $scope.$broadcast('schemaFormValidate');
            if (form.$valid) {
                vm.showLoader = true;
                vm.errorMessage = "";
                $http({
                    method: "POST",
                    url: RouterService.loginRoutes("login"),
                    data: {
                        username: vm.model.username,
                        password: vm.model.password
                    }
                }).then(
                    function (response) {


                        if (response.data.status === 1 && response.data.data.token) {
                            $localStorage.token = response.data.data.token;
                            app.userData = response.data.data;
                            $state.go(app.defaultStanje(app.userData));
                        } else if (response.data.status === 0 && response.data.message) {
                            vm.errorMessage = response.data.message;
                            vm.showLoader = false;
                        } else {
                            vm.errorMessage = "Some error occurred!";
                            vm.showLoader = false;
                        }
                    },
                    function (error) {
                        vm.showLoader = false;
                        vm.errorMessage = "Some error occurred!";
                    }
                );
            }
        }
    }

})();
