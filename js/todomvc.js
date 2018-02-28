var app = angular.module("myApp", []);

app.controller("myCtrl", function($scope) {

    $scope.items = JSON.parse(localStorage.getItem("storage"));

    if ($scope.items != null) {
        var isAllDone = true;

        angular.forEach($scope.items, function(item) {
            if (item.done == false) {
                isAllDone = false;
                return;
            }
        });

        if (isAllDone && $scope.items.length > 0) {
            $scope.inputItemsDone = true;
        }
    } else {
        $scope.items = [];
    }

    $scope.inputSelectAll = function() {
        if ($scope.items.length == 0) {
            $scope.inputItemsDone = false;
            return;
        }

        angular.forEach($scope.items, function(item) {
            item.done = $scope.inputItemsDone;
        });
    };

    $scope.inputChangeItemDone = function(index) {

        if (!$scope.items[index].done) {
            $scope.inputItemsDone = false;
        }

        if ($scope.remaining() == 0) {
            $scope.inputItemsDone = true;
        }
    };

    $scope.inputKeyDown = function(key) {
        var keyCode = window.event ? key.keyCode : key.which;

        if (keyCode == 13) {
            if (!$scope.inputTodo) {
                return;
            }

            $scope.items.push({text: $scope.inputTodo, done: false, status: false});
            $scope.inputItemsDone = false;
            $scope.inputTodo = "";
        }
    };

    $scope.inputEdit = function(index) {
      $scope.items[index].status = true;
    };

    $scope.inputEditKeyDown = function(key, index) {
        var keyCode = window.event ? key.keyCode : key.which;

        if (keyCode == 13) {
            if (!$scope.items[index].text) {
              return;
            }

            $scope.items[index].done = false;
            $scope.items[index].status = false;
        }
    };

    $scope.inputBlur = function(index) {
        $scope.items[index].done = false;
        $scope.items[index].status = false;
    };

    $scope.remaining = function() {
        var counter = 0;

        angular.forEach($scope.items, function(item) {
            counter += item.done ? 0 : 1;
        });

        localStorage.setItem("storage", JSON.stringify($scope.items));
        localStorage.setItem("flag", JSON.stringify($scope.flag));

        if ($scope.items.length - counter == 0) {
            $scope.buttonClearCompletedHide = true;
        } else {
            $scope.buttonClearCompletedHide = false;
        }

        return counter;
    };

    $scope.inputRemoveItem = function(index) {
        $scope.items.splice(index, 1);

        if ($scope.remaining() == 0) {
            $scope.inputItemsDone = true;

        }

        if ($scope.items.length == 0) {
            $scope.inputItemsDone = false;
        }
    };

    $scope.buttonClearCompleted = function() {
        var counter, _i, _ref;

        for (var counter = $scope.items.length - 1; counter >= 0; counter--) {
            if ($scope.items[counter].done == true) {
                $scope.items.splice(counter, 1);
            }
        }

        $scope.inputItemsDone = false;
    };

    $scope.flag = JSON.parse(localStorage.getItem("flag" == null)) ? "all" : JSON.parse(localStorage.getItem("flag"));

    $scope.inputFlag = function(flag) {
        if (flag == "active") {
            $scope.flag = true;
        } else if (flag == "completed") {
            $scope.flag = false;
        } else {
            $scope.flag = "all";
        }
    };
});
