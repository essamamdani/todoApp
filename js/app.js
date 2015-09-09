var incompleteTask = document.getElementById("incomplete-tasks"),
    completeTask = document.getElementById("completed-tasks"),
    addButton = document.getElementById("add-task"),
    taskInput = document.getElementById("new-task");
addButton.onclick = addTask;
var addTask = function () {
    console.log("Add Task");
};
//Binder and Functions Start //
var bindTaskEvent = function (taskListItem, checkBoxEventHandler) {
    var checkBox = taskListItem.querySelector("input[type=checkbox]");
    var editButton = taskListItem.querySelector("button.edit");
    var deleteButton = taskListItem.querySelector("button.delete");
    checkBox.onchange = checkBoxEventHandler;
    editButton.onclick = editTask;
    deleteButton.onclick = deleteTask;
    console.log("Handler");
};
var editTask = function () {
    console.log("Edit Task");
};
var deleteTask = function () {
    console.log("Delete Task");
};
var taskCompleted = function () {
    console.log("Completed");
};
var taskIncompleted = function () {
    console.log("inCompleted");
};
//Binder and Functions End //
//List Element sent to make "listener" Start //
for (var i = 0; i < incompleteTask.children.length; i++) {
    bindTaskEvent(incompleteTask.children[i], taskCompleted);
}
for (var i = 0; i < completeTask.children.length; i++) {
    bindTaskEvent(completeTask.children[i], taskIncompleted);
}

//List Element sent to make "listener" End //