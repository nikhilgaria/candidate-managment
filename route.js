myApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "view/home.html",
      controller: "autoCompleteController",
    }).when("/view_candidate/:cand_id", {
      templateUrl: "view/view_candidate.html",
      controller: "candidate_detail_controller",
    })
    .when("/add_candiate", {
      templateUrl: "view/add_candidate.htm",
      controller: "candidate_Controller",
      params: { userId: "1" },
    })
    .otherwise({
      template: "<h1>Page not found</h1>",
    });
});
