myApp.service("searchService", function () {
  this.search_candidate = "";
});

// For ng material toast
myApp.service("toastService", function () {
  var ctrl = this;
  var last = {
    bottom: true,
    top: false,
    left: false,
    right: true,
  };

  ctrl.toastPosition = angular.extend({}, last);

  ctrl.getToastPosition = function () {
    sanitizePosition();

    return Object.keys(ctrl.toastPosition)
      .filter(function (pos) {
        return ctrl.toastPosition[pos];
      })
      .join(" ");
  };

  function sanitizePosition() {
    var current = ctrl.toastPosition;

    if (current.bottom && last.top) {
      current.top = false;
    }
    if (current.top && last.bottom) {
      current.bottom = false;
    }
    if (current.right && last.left) {
      current.left = false;
    }
    if (current.left && last.right) {
      current.right = false;
    }

    last = angular.extend({}, current);
  }

  ctrl.showSimpleToast = function ($mdToast, $log,msg) {
    var pinTo = ctrl.getToastPosition();

    return $mdToast
      .show(
        $mdToast
          .simple()
          .textContent(msg)
          .position(pinTo)
          .hideDelay(3000)
      )
      .then(function () {
        $log.log("Toast dismissed.");
      })
      .catch(function () {
        $log.log("Toast failed or was forced to close early by another toast.");
      });
  };
});
