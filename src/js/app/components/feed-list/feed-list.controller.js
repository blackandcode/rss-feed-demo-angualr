(function () {
    "use strict";

    angular
        .module("app.FeedList")
        .controller("FeedListController", AdminController);

    AdminController.$inject = ["$scope", "app", "$state", "$http", '$rootScope', '$stateParams'];

    function AdminController($scope, app, $state, $http, $rootScope, $stateParams) {

        if(app.userData.type.indexOf("Admin") === -1) {
            $state.go(app.defaultStanje(app.userData));
        }

        $scope.$emit("updateBreadcrumb");
        $scope.$on("$destroy", function () {
            $scope.$emit("updateBreadcrumb");
		});

        var vm = this;

        vm.moment = moment;
        vm.feedTitle = $state.params.name;
        vm.feeds = [];
        var config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };debugger;
        $http.post('http://localhost:3000/feeds', {groupId: $state.params.id, url: $state.params.url}, config)
        .then(function(feeds) {
            vm.feeds = feeds.data.feeds;
        })
        .catch(function(err) {
            console.log(err);
        });
    }

})();
