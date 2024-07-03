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

// taskTabs.forEach(menu=>menu.addEventListener("click", (e)=>underlineIndicator(e)));

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

    if (taskValue === "") {
        return alert("Please enter a task");
        return;
    }

    let task = {
        id: randomIDGenerate(), taskContent: taskValue, isComplete: false, isImportant: false
    }
    taskList.push(task);
    taskInput.value = "";
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
    } else if (mode === "priority") {
        list = filterList;
    }

    let resultHTML = "";
    for (let i = 0; i < list.length; i++) {
        
        let task = list[i];
        let importantIcon = task.isImportant ? 'fa-solid' : 'fa-regular';

        if (list[i].isComplete) {
            resultHTML += `<div class="task" style="background-color: rgb(231, 231, 231);">
                    <div class="task-done">${list[i].taskContent}</div>
                    <div class="buttons">
                        <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-arrow-rotate-left fa-lg" style="color: #2085be;"></i></button>
                        <button onclick="importantTask('${list[i].id}')"><i class="${importantIcon} fa-star fa-lg" style="color: #fb655e;"></i></button>
                        <button onclick="editTask('${list[i].id}')"><i class="fa-solid fa-pen-to-square fa-lg" style="color: #299e5e;"></i></button>
                        <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #ffc800;"></i></button>
                    </div>
                </div>`;

        } else {
            resultHTML += `<div class="task">
            <div>${list[i].taskContent}</div>
            <div class="buttons">
                <button onclick="toggleComplete('${list[i].id}')"><i class="fa-solid fa-check fa-xl" style="color: #fc7e1b;"></i></button>
                <button onclick="importantTask('${list[i].id}')"><i class="${importantIcon} fa-star fa-lg" style="color: #fb655e;"></i></button>
                <button onclick="editTask('${list[i].id}')"><i class="fa-solid fa-pen-to-square fa-lg" style="color: #299e5e;"></i></button>
                <button onclick="deleteTask('${list[i].id}')"><i class="fa-solid fa-trash fa-lg" style="color: #ffc800;"></i></button>
            </div>
        </div>`;
        }
    }


    document.getElementById("task-board").innerHTML = resultHTML;

}

function toggleComplete(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isComplete = !taskList[i].isComplete;
            break;
        }
    }
    filter();
}


function importantTask(id){
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList[i].isImportant = !taskList[i].isImportant;
            break;
        }
    }
    filter();
}


function editTask(id) {
    let newContent = prompt("Please edit your task");
    if (newContent) {
        for (let i = 0; i < taskList.length; i++) {
            if (taskList[i].id === id) {
                taskList[i].taskContent = newContent;
                break;
            }
        }
        render();
    }
}



function deleteTask(id) {
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].id == id) {
            taskList.splice(i, 1);
        }
    }
    filter();
}


function filter(event) {
    if (event) {
        mode = event.target.id;
        underLine.style.width = event.target.offsetWidth + "px";
        underLine.style.left = event.target.offsetLeft + "px";
        underLine.style.top =
            event.target.offsetTop + event.target.offsetHeight + "px";
    }

    filterList = [];

    if (mode === "all") {
        filterList = taskList; // Show all tasks
    } else if (mode === "ongoing") {
        filterList = taskList.filter(task => !task.isComplete); // Filter ongoing tasks
    } else if (mode === "done") {
        filterList = taskList.filter(task => task.isComplete); // Filter completed tasks
    } else if (mode === "priority") {
        filterList = taskList.filter(task => task.isImportant); // Filter tasks marked as important
    }

    render(); 
}


// function underlineIndicator(e) {
//     underLine.style.left = e.currentTarget.offsetLeft+"px";
//     underLine.style.width = e.currentTarget.offsetWidth+"px";
//     underLine.style.top = e.currentTarget.offsetTop + e.currentTarget.offsetHeight + "px";
// }


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}