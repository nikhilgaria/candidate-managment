myApp.controller("autoCompleteController", 
function($timeout, $q, $log, $http, $scope) {
  var self = this;
  self.simulateQuery = true;
  self.isDisabled = false;

  $scope.mySearchVal = "";
  $scope.serch_val_for_tbl = "";
  $scope.candi_data_1 = "";
  var url = "http://localhost/Candidate/db/get_candidate.php?for=get_all_data";
  $http.get(url).success(function (res) {
    $scope.candi_data_1 = res;
  });
  // list of states to be displayed
  self.states = loadStates();
  self.querySearch = querySearch;
  self.selectedItemChange = selectedItemChange;
  self.searchTextChange = searchTextChange;
  self.newState = newState;

  function newState(state) {
    alert("This functionality is yet to be implemented!");
  }

  function querySearch(query) {
    var results = query
        ? self.states.filter(createFilterFor(query))
        : self.states,
      deferred;

    if (self.simulateQuery) {
      deferred = $q.defer();

      $timeout(
        function () {
          deferred.resolve(results);
        },
        Math.random() * 1000,
        false
      );
      return deferred.promise;
    } else {
      return results;
    }
  }
  function searchTextChange(text) {
    $log.info("Text changed to " + text);
  }
  function selectedItemChange(item) {
    if (item != null) {
      $log.info("Item changed to " + JSON.stringify(item));
      var name__ = item.value.split("|")[0];
      var contact__ = item.value.split("|")[1];
      // console.log(val);
      $scope.col1 = name__;
      $scope.col2 = contact__;
      $scope.serch_val_for_tbl = item.value;
    } else {
      $scope.serch_val_for_tbl = "";
    }
  }

  //build list of states as map of key-value pairs
  function loadStates() {
    var url = "http://localhost/Candidate/db/get_candidate.php?for=get_all_data";
    var all_candid = [];
    $http.get(url).success(function (res) {
      $scope.candi_data_1 = res;
      for (let i = 0; i < res.length; i++) {
        const element = res[i].name;
        const contact = res[i].contact;
        var newA = {
          value: element.toLowerCase() + " | " + contact,
          display: element + " | " + contact,
        };
        all_candid.push(newA);
      }
      // console.log(element);
    });
    return all_candid;
    // var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    //   Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    //   Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    //   Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    //   North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    //   South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    //   Wisconsin, Wyoming';

    // return allStates.split(/, +/g).map(function (state) {
    //     return {
    //         value: state.toLowerCase(),
    //         display: state
    //     };
    // });
  }

  //filter function for search query
  function createFilterFor(query) {
    console.log(query);
    $scope.mySearchVal = query;
    var lowercaseQuery = angular.lowercase(query);
    return function filterFn(state) {
      return state.value.match(lowercaseQuery);
      // return (state.value.indexOf(lowercaseQuery) === 0);
    };
  }
});
