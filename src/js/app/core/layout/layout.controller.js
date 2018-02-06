(function () {
    "use strict";

    angular
        .module("app.core.layout")
        .controller("LayoutController", LayoutController);

    LayoutController.$inject = ["$scope", "$state", "$localStorage", "$timeout", "$http", "RouterService", "app", "loadUserInfo", "$rootScope"];

    function LayoutController($scope, $state, $localStorage, $timeout, $http, RouterService, app, loadUserInfo, $rootScope) {

        if(!(loadUserInfo && loadUserInfo.status === true)) {
            $state.go("error", {message: "Došlo je do greške. Pokušajte ponovo da učitate stranicu ili da se odjavite pa ponovo prijavite."});
        } else if (
            app.userData.type.indexOf("Admin") === -1 &&
            $state.current.name.indexOf("app.admin") !== -1
        ) {
            $state.go(app.defaultStanje(app.userData));
        }

        var vm = this;
        vm.breadcrumb = [];
        vm.username = app.userData.username;
        vm.showLoader = false;
        vm.collapseSidebar = true;
        vm.collapseProfile = false;
				vm.collapseBreadcrumb = false;
				vm.feeds = [];

				$http.get('http://localhost:3000/user-feeds')
				.then(function(feeds) {
					console.log(feeds);
					vm.feeds = feeds.data.feeds;
					vm.feeds.forEach(function (feed) {
						vm.sekcije.push({
							id: feed._id ? feed._id : null,
							naziv: feed.title,
							state: "app.feed-list({id: '"+ feed._id + "', url: '" + feed.url + "', name: '" + feed.title + "'})",
							ikonica: "fa fa-list",
							imaPravoPristupa: app.userData.type.indexOf("Admin") !== -1
						});
					});
				})
				.catch(function(err) {
					console.log(err);
				});

				$rootScope.$on('addedFeed', function(data) {
					debugger;
					vm.sekcije = vm.sekcije.filter(function(sekcija) {
						if (!sekcija.id) return true;
						return !sekcija.id;
					});

					$http.get('http://localhost:3000/user-feeds')
					.then(function(feeds) {
						console.log(feeds);
						vm.feeds = feeds.data.feeds;
						vm.feeds.forEach(function (feed) {
							vm.sekcije.push({
								id: feed._id ? feed._id : null,
								naziv: feed.title,
								state: "app.feed-list({id: '"+ feed._id + "', url: '" + feed.url + "', name: '" + feed.title + "'})",
								ikonica: "fa fa-list",
								imaPravoPristupa: app.userData.type.indexOf("Admin") !== -1
							});
						});
					})
					.catch(function(err) {
						console.log(err);
					});
				});

        vm.sekcije = [
            {
                naziv: "Feed List",
                state: "app.feed-list",
                ikonica: "fa fa-list",
                imaPravoPristupa: app.userData.type.indexOf("Agent") !== -1
            },
            {
                naziv: "Feed Manager",
                state: "app.feed-manager",
                ikonica: "fa fa-list-alt",
                imaPravoPristupa: app.userData.type.indexOf("Admin") !== -1
            }
				];
				

        vm.toggleSidebar = toggleSidebar;
        vm.toggleProfile = toggleProfile;
        vm.toggleBreadcrumb = toggleBreadcrumb;
        vm.logout = logout;

        $scope.$on("updateBreadcrumb", function () {
            vm.breadcrumb = [];
            $timeout(function () {
                vm.breadcrumb = $state.current.breadcrumb;
            });
        });

        $scope.$on("show-loader", function () {
            vm.showLoader = true;
        });

        $scope.$on("hide-loader", function () {
            vm.showLoader = false;
            $timeout(function () {
                $scope.$digest();
            });
        });

        function toggleSidebar() {
            vm.collapseSidebar = !vm.collapseSidebar;
        }

        function toggleProfile() {
            vm.collapseProfile = !vm.collapseProfile;
        }

        function toggleBreadcrumb() {
            vm.collapseBreadcrumb = !vm.collapseBreadcrumb;
        }

        function logout() {
            $http({
                method: "GET",
                url: RouterService.loginRoutes("logout")
            }).then(
                function (response) {
                    if (app.propertyExists(response, "data.status") && response.data.status) {
                        delete $localStorage.token;
                        app.userData = null;
                        app.zivotnoUserId = 0;
                        $state.go("login");
                    } else {
                        alert("Došlo je do greške, pokušajte ponovo");
                    }
                },
                function (error) {
                    if (app.propertyExists(error, "data.error.message")) {
                        alert(error.data.error.message);
                    } else {
                        alert("Došlo je do greške, pokušajte ponovo");
                    }
                }
            );
        }
    }

})();
