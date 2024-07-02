// The user enters a value.
// When the user clicks the "+" button, the task is added.
// When the user clicks the delete button, the task is removed.
// When the user clicks the check button, the task is crossed out.
// When the user clicks the "All," "Not Done," and "Done" tabs, the underline moves accordingly.
// The "Done" tab shows the completed items, the "Not Done" tab shows the incomplete items, and the "All" tab shows all items.

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");
let taskTabs = document.querySelectorAll(".task-tabs div");

taskTabs.forEach(menu=>menu.addEventListener("click", (e)=>underlineIndicator(e)));

addButton.addEventListener("click", addTask);
taskInput.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        addTask();
    }
});

for (let i = 1; i < tabs.length; i++) {
    tabs[i].addEventListener("click", function (event) {
        filter(event)
    });
}

function addTask() {
    let taskValue = taskInput.value;

    if(taskValue === "") {
        return alert("Please enter a task");
    }

    let task = {
        id: randomIDGenerate(), taskContent: taskValue, isComplete: false
    }
    taskList.push(task);
    console.log(taskList);
    render();
}

function render() {
    // different lists depending on the tab user chooses
    // all - taskList
    // ongoing, done - filterList

    let list = [];
    if (mode === "all") {
        list = taskList;
    } else if (mode === "ongoing" || mode === "done") {
        list = filterList;
    }

    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        if (list[i].isComplete) {
            resultHTML += `<div class="task" style="background-color: rgb(231, 231, 231);">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div class="buttons">
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left fa-lg" style="color: #a2bfad;"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #849acb;"></i></button>
                    </div>
                </div>`;

        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="buttons">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-xl" style="color: #f8966f;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #849acb;"></i></button>
            </div>
        </div>`;
        }
    }

    document.getElementById("task-board").innerHTML = resultHTML;

}

function toggleComplete(id) {
    console.log("id: ", id);
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    render();
}



function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
            break;
        }
    }
    render();
}


function filter(event) {
    console.log("filters", event.target.id);
    mode = event.target.id;
    filterList = [];

    if (mode === "all") {
        //everything
        render();
    } else if (mode === "ongoing") {
        //task.isComplete == false
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == false) {
                filterList.push(taskList[i]);
            }
        }
        render();
    } else if (mode === "done") {
        //task.isComplete == true
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].isComplete == true) {
                filterList.push(taskList[i]);
            }
        }
        render();
    }
}


function underlineIndicator(e) {
    underLine.style.left = e.currentTarget.offsetLeft+"px";
    underLine.style.width = e.currentTarget.offsetWidth+"px";
    underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
}


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}