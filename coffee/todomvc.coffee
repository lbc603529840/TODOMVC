app = angular.module "myApp", []

app.controller "myCtrl", ($scope) ->
    $scope.items = JSON.parse localStorage.getItem "storage"

    if $scope.items isnt null
        isAllDone = true

        angular.forEach $scope.items, (item) ->
            if item.done is false
                isAllDone = false
                return

            return

        if isAllDone and $scope.items.length > 0
            $scope.inputItemsDone = true
    else
        $scope.items = []

    $scope.inputSelectAll = ->
        if $scope.items.length is 0
            $scope.inputItemsDone = false
            return

        angular.forEach $scope.items, (item) ->
            item.done = $scope.inputItemsDone

            return

        return

    $scope.inputChangeItemDone = (index) ->
        if not $scope.items[index].done
            $scope.inputItemsDone = false

        if $scope.remaining() is 0
            $scope.inputItemsDone = true

        return

    $scope.inputKeyDown = (key) ->
        keyCode = if window.event then key.keyCode else key.which

        if keyCode is 13
            if !$scope.inputTodo
                return

            $scope.items.push {text: $scope.inputTodo, done: false, status: false}
            $scope.inputItemsDone = false
            $scope.inputTodo = ""

        return

    $scope.inputEdit = (index) ->
        $scope.items[index].status = true
        return

    $scope.inputEditKeyDown = (key, index) ->
        keyCode = if window.event then key.keyCode else key.which

        if keyCode is 13
            if !$scope.items[index].text
                return

            $scope.items[index].done = false
            $scope.items[index].status = false

        return

    $scope.inputBlur = (index) ->
        $scope.items[index].done = false
        $scope.items[index].status = false
        return

    $scope.remaining = ->
        counter = 0

        angular.forEach $scope.items, (item) ->
            counter += if item.done then 0 else 1

            return

        localStorage.setItem "storage", JSON.stringify $scope.items
        localStorage.setItem "flag", JSON.stringify $scope.flag

        if $scope.items.length - counter is 0
            $scope.buttonClearCompletedHide = true
        else
            $scope.buttonClearCompletedHide = false

        return counter

    $scope.inputRemoveItem = (index) ->
        $scope.items.splice index, 1

        if $scope.remaining() is 0
            $scope.inputItemsDone = true

        if $scope.items.length is 0
            $scope.inputItemsDone = false

        return

    $scope.buttonClearCompleted = ->
        for counter in [$scope.items.length - 1 .. 0]
            if $scope.items[counter].done is true
                $scope.items.splice counter, 1

        $scope.inputItemsDone = false

        return

    $scope.flag = if JSON.parse localStorage.getItem "flag" is null then "all" else JSON.parse localStorage.getItem "flag"

    $scope.inputFlag = (flag) ->
        if flag is "active"
            $scope.flag = true
        else if flag is "completed"
            $scope.flag = false
        else
            $scope.flag = "all"

        return

    return

