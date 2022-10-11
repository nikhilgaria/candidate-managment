myApp.directive("fileInput", function ($parse) {
  return {
    link: function ($scope, element, attrs) {
      element.on("change", function (event) {
        var files = event.target.files;
        console.log(files[0].name);
        $parse(attrs.fileInput).assign($scope, element[0].files);
        $scope.$apply();
      });
    },
  };
});
// For candidate detail section
myApp.controller(
  "candidate_detail_controller",
  function (
    $scope,
    $http,
    $routeParams,
    $mdToast,
    $log,
    toastService,
    $mdDialog,$filter
  ) {
    // $scope.city = demo.search_candidate;
    $scope.showSimpleToast = function ($msg) {
      toastService.showSimpleToast($mdToast, $log, $msg);
    };

    // for get candidate detail by id start
    var cand_id = $routeParams.cand_id;
    if (cand_id != "" && cand_id != undefined) {
      console.log(cand_id);

      var url =
        "http://localhost/Candidate/db/get_candidate.php?for=get_cand_detail&cand_id=" +
        cand_id;
      $http.get(url).success(function (res) {
        if (res.length > 0) {
          $scope.candi_detail = res;
        } else {
          return (window.location = "/");
        }
      });
      // return false;
    } else {
      return false;
    }
    // for get candidate detail by id end

    // for get project detail by Candidate id start
    if (cand_id != "" && cand_id != undefined) {
      console.log(cand_id);
      getProject();
      function getProject() {
        var url =
          "http://localhost/Candidate/db/edit_candidate.php?for=get_all_project&cand_id=" +
          cand_id;
        $http.get(url).success(function (res) {
          if (res.length > 0) {
            $scope.project_by_candId = res;
            console.log("project");
            console.log(res);
          } else {
            // return (window.location = "/");
          }
        });
      }
      // return false;
    } else {
      return false;
    }

    $scope.getProject = function () {
      getProject();
    };
    // for get project detail by Candidate id end

    //---------------------------------------------------------------------------------------
    //-------------for add more candidate project modal popup functionality start here-------
    //---------------------------------------------------------------------------------------
    $scope.candi_project = {
      hidden_id: 0,
      cand_id: cand_id,
      project_name: "",
      website: "",
      role: "",
      start_date: "",
      end_date: "",
      still_work: "",
      resume: "",
      project_desc: "",
      add_teammate: "",
      skill: "",
    };
    $scope.reset = function () {
      
      $scope.candi_project.hidden_id = 0;
      $scope.candi_project.cand_id = cand_id;
      $scope.candi_project.project_name = "";
      $scope.candi_project.website = "";
      $scope.candi_project.role = "";
      $scope.candi_project.start_date = "";
      $scope.candi_project.end_date = "";
      $scope.candi_project.still_work = "";
      $scope.candi_project.resume = "";
      $scope.candi_project.project_desc = "";
      $scope.candi_project.add_teammate = "";
      $scope.candi_project.skill = "";
    };

    // setting up custom validion error color
    $scope.pnameValid = true;
    $scope.pnameVTouched = false;
    // $scope.isProjectTitleErrShow='f2.t2.$touched && f2.t2.$error.required';
    $scope.proNamelen = 0;
    $scope.checkLengthProName = function () {
      $scope.pnameVTouched = true;
      var pname = $scope.candi_project.project_name;
      $scope.proNamelen = pname == undefined ? 0 : pname.length;
      console.log($scope.proNamelen);
      if ($scope.proNamelen == 0) {
        $scope.pnameValid = false;
        $scope.isProjectTitleErrShow =
          "f2.t2.$touched && f2.t2.$error.required";
        $scope.proErorMsg = "Project title is required.";
      } else if ($scope.proNamelen > 100) {
        // alert('greater')
        $scope.pnameValid = false;
        $scope.isProjectTitleErrShow =
          "f2.t2.$touched && f2.t2.$error.maxlength";
        $scope.proErorMsg = "Maximum 100 characters";
      } else {
        $scope.pnameValid = true;
        $scope.proErorMsg = "";
        $scope.isProjectTitleErrShow = "";
      }
    };

    // for add porject of candidate start
    $scope.ADD_CANDID_PROJECT = function (form_data) {
      console.log(form_data);
      // return false;
      var fd = new FormData();
      angular.forEach($scope.files, function (file) {
        fd.append("file", file);
      });
      console.log(fd);
      $http({
        method: "POST",
        url: "http://localhost/Candidate/db/edit_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          // "Content-Type": undefined,
          // "Process-Data": false,
        },
        data: {
          for: "insert_project_candidate",
          hidden_id: $scope.candi_project.hidden_id,
          cand_id: $scope.candi_project.cand_id,
          project_name: form_data.project_name,
          website: form_data.website,
          role: form_data.role,
          start_date: form_data.start_date,
          end_date: form_data.end_date,
          still_work: form_data.still_work,
          resume: form_data.resume,
          project_desc: form_data.project_desc,
          add_teammate: form_data.add_teammate,
          skill: form_data.skill,
        },
      }).success(function (res) {
        console.log(res.status);
        console.log(res.message);
        $scope.reset();
        $scope.getProject();
        // var element = angular.element("#add_more_project_modal");
        // element.modal("show");
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
            "Project data inserted successfullly..."
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

    // for edit
    // FOR edit RECORD START
    $scope.edit_prject = function (proj_id) {
      // console.log(proj_id);
      $http({
        method: "POST",
        url: "http://localhost/Candidate/db/edit_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          for: "for_edit_project",
          proj_id: proj_id,
        },
      }).success(function (res) {
        console.log(res);
        if (res[0].start_date=="0000-00-00") {
          $start_date = "00-00-0000"+ "T00:00:00.000Z";
        } else {
          $start_date= res[0].start_date+ "T00:00:00.000Z";
          $scope.myDate = new Date('2014-03-08T00:00:00');
        }
        console.log($start_date);
        // console.log(atob(res[0].pass));
        $scope.candi_project.hidden_id = res[0].id;
        $scope.candi_project.cand_id = res[0].cand_id;
        $scope.candi_project.project_name = res[0].project_name;
        $scope.candi_project.website = res[0].website;
        $scope.candi_project.role = res[0].role;
        $scope.candi_project.start_date = $start_date;
        $scope.candi_project.end_date = res[0].end_date;
        $scope.candi_project.still_work = res[0].still_work;
        $scope.candi_project.resume = res[0].resume;
        $scope.candi_project.project_desc = res[0].project_desc;
        $scope.candi_project.add_teammate = res[0].add_teammate;
        $scope.candi_project.skill = res[0].skill;
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
    // FOR DELETE RECORD START
    $scope.delete_project = function (proj_id) {
      console.log(proj_id);
      $http({
        method: "POST",
        url: "http://localhost/Candidate/db/edit_candidate.php",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          for: "for_delete",
          proj_id: proj_id,
        },
      }).success(function (res) {
        $scope.reset();
        $scope.getProject();
        if (res.status == 200 && res.message == "Deleted") {
          toastService.showSimpleToast(
            $mdToast,
            $log,
            "Project Data Deleted successfully..."
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
    // for add porject of candidate end
    // $scope.uploadFile = function () {
    //   var form_data = new FormData();
    //   angular.forEach($scope.files, function (file) {
    //     form_data.append("file", file);
    //   });
    //   console.log(form_data);
    // };
  }
);
