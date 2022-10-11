// For candidate section
myApp.controller(
  "candidate_Controller",
  function ($scope, $http, $mdToast, $log, toastService) {
    // $scope.city = searchService.search_candidate;
    // for candidate detail
    // var cand_id = $routeParams.cand_id;
    // if (cand_id != "" && cand_id!=undefined) {
    //   console.log(cand_id);

    //   var url = "http://localhost/Candidate/db/get_candidate.php?for=get_cand_detail&cand_id="+cand_id;
    //   $http.get(url).success(function (res) {
    //     $scope.candi_detail = res;
    //     console.log(res);
    //   });
    //   return false;
    // }
    $scope.CandiModel = {
      hidden_id: 0,
      name: "",
      email: "",
      contact: "",
      pass: "",
      address1: "",
      address2: "",
      city: "",
      state: "",
      pincode: "",
    };
    $scope.reset = function () {
      $scope.CandiModel.hidden_id = 0;
      $scope.CandiModel.name = "";
      $scope.CandiModel.email = "";
      $scope.CandiModel.contact = "";
      $scope.CandiModel.pass = "";
      $scope.CandiModel.address1 = "";
      $scope.CandiModel.address2 = "";
      $scope.CandiModel.city = "";
      $scope.CandiModel.state = "";
      $scope.CandiModel.pincode = "";
    };
    // var url = "db/get_candidate.php?for=get_all_data";
    var url =
      "http://localhost/Candidate/db/get_candidate.php?for=get_all_data";
    $http.get(url).success(function (res) {
      $scope.candi_data = res;
      console.log(res);
    });
    $scope.fetchData = function () {
      $http.get(url).success(function (res) {
        $scope.candi_data = res;
      });
    };
    // FOR DELETE RECORD START
    $scope.deleteCandi = function (Candi) {
      console.log(Candi);
      $http({
        method: "POST",
        url: "http://localhost/Candidate/db/get_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          for: "for_delete",
          id: Candi,
        },
      }).success(function (res) {
        $scope.fetchData();
        if (res.status == 200 && res.message == "Deleted") {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Data Deleted successfully..."
          );
        
        } else {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Having some issue on operation.."
          );
        }
        if (res.error != "") {
          $scope.success = false;
          $scope.error = true;
          $scope.errorMessage = res.error;
        } else {
          $scope.success = true;
          $scope.error = false;
          $scope.errorMessage = res.message;
        }
      });
    };

    // FOR edit RECORD START
    $scope.editCandi = function (Candi) {
      // console.log(Candi);
      $http({
        method: "POST",
        url: "http://localhost/Candidate/db/get_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          for: "for_edit",
          id: Candi,
        },
      }).success(function (res) {
        // console.log(atob(res[0].pass));
        $scope.CandiModel.hidden_id = res[0].id;
        $scope.CandiModel.name = res[0].name;
        $scope.CandiModel.email = res[0].email;
        $scope.CandiModel.contact = res[0].contact;
        $scope.CandiModel.pass = atob(res[0].pass);
        $scope.CandiModel.address1 = res[0].address1;
        $scope.CandiModel.address2 = res[0].address2;
        $scope.CandiModel.city = res[0].city;
        $scope.CandiModel.state = res[0].state;
        $scope.CandiModel.pincode = res[0].pincode;
        if (res.error != "") {
          $scope.success = false;
          $scope.error = true;
          $scope.errorMessage = res.error;
        } else {
          $scope.success = true;
          $scope.error = false;
          $scope.errorMessage = res[0].message;
        }
      });
    };

    // FOR INSERT/UPDATE RECORD START
    $scope.ADD_CANDID = function () {
      // console.log($scope.CandiModel);
      $http({
        method: "POST",
        url: "http://localhost/Candidate/db/get_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          for: "insert_candid",
          hidden_id: $scope.CandiModel.hidden_id,
          name: $scope.CandiModel.name,
          email: $scope.CandiModel.email,
          contact: $scope.CandiModel.contact,
          pass: $scope.CandiModel.pass,
          address1: $scope.CandiModel.address1,
          address2: $scope.CandiModel.address2,
          city: $scope.CandiModel.city,
          state: $scope.CandiModel.state,
          pincode: $scope.CandiModel.pincode,
        },
      }).success(function (res) {
        console.log(res.status);
        console.log(res.message);
        $scope.reset();
        $scope.fetchData();
        if (res.status == 200 && res.message == "updated") {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "data updated successfully..."
          );
        } else if (res.status == 200 && res.message == "insert") {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "data inserted successfullly..."
          );
        } else {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Having some issue on operation.."
          );
        }
        if (res.error != "") {
          $scope.success = false;
          $scope.error = true;
          $scope.errorMessage = res.error;
        } else {
          $scope.success = true;
          $scope.error = false;
          $scope.errorMessage = res.message;
        }
      });
    };
  }
);
