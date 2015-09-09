var inCompleteList = $("#incomplete-tasks"),
    CompleteList = $("#completed-tasks"),
    addButton = $("#add-task"),
    taskInput = $("#new-task");

addButton.on("click", function () {
    if(taskInput.val().length > 0){
        $(".message").text("");
        var listItem = $('<li><input type="checkbox"><label>' + taskInput.val() + '</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>');
        $(inCompleteList).append(listItem);
        bindTaskEvent(listItem, completeTask);
    } else {
        $(".message").text("Please Type Some Text");
    }
});

var bindTaskEvent = function (taskListItem, checkBoxEventHandler) {
    $(taskListItem).find("input[type=checkbox]").on("change", checkBoxEventHandler);

    $(taskListItem).find("button.edit").on("click", function () {
        var parent = $(this).parent();
        if (parent.parent().is("#incomplete-tasks")) {
            parent.find("input[type=text]").val(parent.find("label").text());
            parent.toggleClass("editMode");
        }
    });
    $(taskListItem).find("button.delete").on("click", function () {
        if (confirm("Are you sure?")) {
            $(this).parent().remove();
        }
    });
};

var completeTask = function () {
    var listItem = $(this).parent();
    CompleteList.append(listItem);
    var d = new Date();
    var timestamp = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    listItem.find("label").append("<span>"+timestamp+"</span>");
    bindTaskEvent(listItem, inCompleteTask);
};
var inCompleteTask = function () {
    var listItem = $(this).parent();
    inCompleteList.append(listItem);
    bindTaskEvent(listItem, completeTask);
};
$(CompleteList).each(function (i, v) {
    bindTaskEvent(v, inCompleteTask);
});
$(inCompleteList).each(function (i, v) {
    bindTaskEvent(v, completeTask);
});



