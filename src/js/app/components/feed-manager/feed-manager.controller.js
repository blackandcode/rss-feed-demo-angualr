(function () {
    "use strict";

    angular
        .module("app.FeedManager")
        .controller("FeedManagerController", AdminController);

    AdminController.$inject = ["$scope", "app", "$state", "$http", "$rootScope"];

    function AdminController($scope, app, $state, $http, $rootScope) {

        if(app.userData.type.indexOf("Admin") === -1) {
            $state.go(app.defaultStanje(app.userData));
        }

        $scope.$emit("updateBreadcrumb");
        $scope.$on("$destroy", function () {
            $scope.$emit("updateBreadcrumb");
        });

				var vm = this;
				vm.editVisible = false;
				vm.feeds = [];
				vm.method = '';
				vm.editModel = {
					id: null,
					title: null,
					url: null
				};

				vm.formId = 'editFeedForm';
				vm.schema = {
					"type": "object",
					"properties": {
						"id": {
							"type": "string",
							"title": "id"
						},
						"title": {
							"type": "string",
							"title": "Title"
						},
						"url": {
							"type": "string",
							"title": "Url"
						}
					},
					"required": [
						"title",
						"url"
					]
				};
				vm.form = [
					{
						"key": "id",
						"type": "hidden",
                        "notitle": true
					},
					{
						"key": "title",
						"type": "text"
					},
					{
						"key": "url",
						"type": "text"
					},
					{
						"type": "submit",
						"htmlClass": "prijavi-se",
						"title": "Submit"
				}
				];
				vm.onSubmit = onSubmit;

				var config = {
					headers: {
						'Content-Type': 'application/json'
					}
				};
				$http.get('http://localhost:3000/user-feeds')
				.then(function(feeds) {
					vm.feeds = feeds.data.feeds;
					debugger;
				})
				.catch(function(err) {
					console.log(err);
				});

				vm.showEdit = function(feed, method) {


				    vm.method = method;

					// console.log(feed);
                    if (feed) {
                        vm.editModel = {
                            id: feed._id,
                            title: feed.title,
                            url: feed.url
                        };
                    }

					vm.editVisible = true;
					return;
				};

				vm.hideEdit = function() {
					vm.editModel = {
						id: null,
						title: null,
						url: null
					};

					vm.editVisible = false;
					return;
				};

				vm.changeMethod = function(method) {
					if (method === 'POST') {
						vm.editVisible = true;
					}
					vm.method = method;
					return;
				};


                $scope.$on("newFeed", function () {

                    $http.get('http://localhost:3000/user-feeds')
                        .then(function(feeds) {
                            vm.feeds = feeds.data.feeds;
                            debugger;
                        })
                        .catch(function(err) {
                            console.log(err);
                        });

                });


				function onSubmit(form) {
					$scope.$broadcast('schemaFormValidate');
						vm.showLoader = true;
						vm.errorMessage = "";
						var data = {
							feedId: vm.editModel.id ? vm.editModel.id : '',
							feed: {
								title: vm.editModel.title,
								url: vm.editModel.url
							}
						};
						$http({
							method: vm.method,
							url: 'http://localhost:3000/user-feeds',
							data: data
						}).then(function (response) {
							vm.showLoader = false;
							debugger;
							console.log(response);
							vm.hideEdit();
							$rootScope.$broadcast('addedFeed');
							$scope.$broadcast('newFeed');
						}).catch(function(err) {
							console.log(err);
						});
				}
    }

})();
