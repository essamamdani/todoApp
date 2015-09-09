var inCompleteList = $("#incomplete-tasks"),
    CompleteList = $("#completed-tasks"),
    addButton = $("#add-task"),
    taskInput = $("#new-task");

var AddTaskFunc = function () {
    if (taskInput.val().length > 0) {
        $(".message").text("");
        var listItem = $('<li><input type="checkbox"><label>' + taskInput.val() + '</label><input type="text"><button class="edit">Edit</button><button class="delete">Delete</button></li>');
        $(inCompleteList).append(listItem);
        taskInput.val("");
        bindTaskEvent(listItem, completeTask);
    } else {
        $(".message").text("Please Type Some Text");
    }
};
var inCompleteTask = function () {
    var listItem = $(this).parent();
    inCompleteList.append(listItem);
    listItem.find("label span").remove();
    bindTaskEvent(listItem, completeTask);
    bindTaskEvent(listItem, completeTask);
};
var completeTask = function () {
    var listItem = $(this).parent();
    if (listItem.hasClass("editMode")) {
        listItem.removeClass("editMode");
    }
    CompleteList.append(listItem);
    var d = new Date();
    var timestamp = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    listItem.find("label").append("<span>" + timestamp + "</span>");

    bindTaskEvent(listItem, inCompleteTask);
};


addButton.on("click", AddTaskFunc);
taskInput.on("keypress", function (e) {
    if (e.keyCode === 13) {
        AddTaskFunc();
    }
});

var bindTaskEvent = function (taskListItem, checkBoxEventHandler) {
    $(taskListItem).off();
    $(taskListItem).on("change", "input[type=checkbox]", checkBoxEventHandler);
    $(taskListItem).on("click", "button.edit", function (e) {
        console.log("Edit");
        var parent = $(this).parent();
        e.stopPropagation();
        if (!parent.hasClass("editMode")) {
            parent.find("input[type=text]").val(parent.find("label").text());
        } else {
            parent.find("label").text(parent.find("input[type=text]").val());
        }
        parent.toggleClass("editMode");
        parent.find("input[type=text]").focus();

    });
    $(taskListItem).on("click", "button.delete", function () {
        if (confirm("Are you sure?")) {
            $(this).parent().remove();
        }
    });
};


$(CompleteList).each(function (i, v) {
    bindTaskEvent(v, inCompleteTask);
});
$(inCompleteList).each(function (i, v) {
    bindTaskEvent(v, completeTask);
});



