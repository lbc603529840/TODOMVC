$(function() {
    var todoList = [];

    $(document).keyup(function(event) {
        if (event.keyCode == 13) {
            if ($("#input_todo").val().trim() == "") {
                console.log(1);
            } else {
                console.log($("#input_todo").val().trim());
            }

            $("#input_todo").val("");
        }
    });
});