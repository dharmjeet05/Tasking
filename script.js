(function () {
    if (!localStorage.getItem("name")) {
        window.location.href = "signin.html";
    }
})();

function logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.location.href = "signin.html";
}

// function addTask() {
//     let task = document.getElementById("task").value;

//     let task_records = new Array();
//     task_records = JSON.parse(localStorage.getItem("taskList"))
//         ? JSON.parse(localStorage.getItem("taskList"))
//         : [];

//     if (
//         task_records.some((item) => {
//             return item.task == task;
//         })
//     ) {
//         alert("Duplicate Task");
//     } else {
//         task_records.push({
//             task: task,
//             status: 0,
//         });
//         localStorage.setItem("taskList", JSON.stringify(task_records));
//     }
//     showTask();
// }

// function showTask() {
//     let task_list;
//     if (document.getElementById("taskList") != null) {
//         task_list = document.getElementById("taskList").innerHTML;
//     }

//     let task_records = new Array();
//     task_records = JSON.parse(localStorage.getItem("taskList"))
//         ? JSON.parse(localStorage.getItem("taskList"))
//         : [];
//     console.log(task_records);

//     if (task_records) {
//         for (let i = 0; i < task_records.length; i++) {
//             let addDiv = document.createElement("div");
//             addDiv.className = "task";
//             // addDiv.innerHTML = `<div class="task-text">${task_records[i].status}</div><div class="task-actions"><img src="https://img.icons8.com/ios-glyphs/30/ffffff/check-all.png" /> <img src="https://img.icons8.com/ios-glyphs/30/ffffff/filled-trash.png" /></div>`;
//             addDiv.innerHTML = "<h1>Hello World</h1>";
//             task_list.appendChild(addDiv);
//         }
//     }
// }

const inputValue = document.getElementById("task");
const addTaskBtn = document.getElementsByClassName("addButton")[0];

addTaskBtn.addEventListener("click", () => {
    if (!inputValue.value.trim() == "") {
        let localItems = JSON.parse(localStorage.getItem("localItem"));

        if (localItems === null) {
            taskList = [];
        } else {
            taskList = localItems;
        }

        taskList.push({
            task: inputValue.value,
            status: 0,
        });
        localStorage.setItem("localItem", JSON.stringify(taskList));

        inputValue.value = "";
    } else {
        alert("Please enter task");
    }

    showList();
});

function showList() {
    let outPut = "";
    let taskListShow = document.querySelector(".tasklist");
    let localItems = JSON.parse(localStorage.getItem("localItem"));

    if (localItems === null) {
        taskList = [];
    } else {
        taskList = localItems;
    }

    taskList.forEach((taskItem, index) => {
        outPut += `
                        <div class="task" class="${index}">
                            <div class="task-text">${taskItem.task}</div>
                            <div class="task-actions">
                                <img
                                    onclick="completeTask(${index})"
                                    src="https://img.icons8.com/ios-glyphs/30/ffffff/check-all.png"
                                />
                                <img
                                    onclick="deleteTask(${index})"
                                    src="https://img.icons8.com/ios-glyphs/30/ffffff/filled-trash.png"
                                />
                            </div>
                        </div>
        `;
    });

    taskListShow.innerHTML = outPut;
}
showList();

function deleteTask(index) {
    // let localItems = JSON.parse(localStorage.getItem("localItem"));

    taskList.splice(index, 1);

    localStorage.setItem("localItem", JSON.stringify(taskList));

    showList();
}

function clearTask() {
    localStorage.removeItem("localItem");
    showList();
}

function completeTask(indexx) {
    // if (localStorage.getItem("localItem")[index] == taskItem) {
    //     console.log("Yes You Are Right");
    // }

    // console.log(index);

    let task = taskList.find((item, index) => {
        return index == indexx;
    });
    console.log(task);

    // let taskItem = document.querySelector(".tasklist:nth-child(${indexx})");
    // console.log(taskItem);

    if (task.status == 0) {
        console.log("HELLO");
        localStorage.setItem("localItem[indexx].status", 1);
    }

    // console.log(taskList[indexx]);
}
