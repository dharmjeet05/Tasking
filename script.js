(function () {
    if (!localStorage.getItem("name")) {
        window.location.href = "signin.html";
    }
})();

function logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    localStorage.removeItem("localItem");
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
let taskItems;

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

    console.log(taskItems);
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
        console.log(taskItem.status === 0);
        outPut += `
                        <div class="${
                            taskItem.status === 0 ? "task" : "task active"
                        }"> 
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
    taskItems = document.querySelectorAll(".task");
    console.log(taskItems);
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
    let mainItem = JSON.parse(localStorage.getItem("localItem"));
    mainItem[indexx].status = mainItem[indexx].status == 0 ? 1 : 0;

    localStorage.setItem("localItem", JSON.stringify(mainItem));

    if (
        taskItems[indexx].classList.contains("active") &&
        mainItem[indexx].status === 0
    ) {
        taskItems[indexx].classList.remove("active");
    } else {
        taskItems[indexx].classList.add("active");
    }
}

// Weather app
function weatherApp() {
    let lat;
    let long;
    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                lat = position.coords.latitude;
                long = position.coords.longitude;
                fetch(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=ac5d68ef6e7594df77ca70cc0fa69424`
                )
                    .then((response) => response.json())
                    .then((data) => {
                        const name = data.name;
                        const description = data.weather[0].description;
                        const temp = data.main.temp;
                        const speed = data.wind.speed;
                        console.log(name, temp, description, speed);

                        document.querySelector(".city").innerHTML =
                            "Weather in " + name;
                        document.querySelector(".temp").innerHTML = temp + "°C";
                        document.querySelector(".desc").innerHTML = description;
                        document.querySelector(".wind").innerHTML =
                            "Wind speed : " + speed;
                    })
                    .catch((error) => console.log(error));
            });
        }
    }
    getLocation();

    // if (lat) {
    //     let weather = {
    //         apikey: "ac5d68ef6e7594df77ca70cc0fa69424",
    // function fetchWeather() {
    // api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
    // console.log(lat, long);
    // fetch(
    //     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=ac5d68ef6e7594df77ca70cc0fa69424`
    // )
    //     .then((response) => response.json())
    //     .then((data) => {
    //         const name = data.name;
    //         const description = data.weather[0].description;
    //         const temp = data.main.temp;
    //         const speed = data.wind.speed;
    //         console.log(name, temp, description, speed);

    //         document.querySelector(".city").innerHTML = "Weather in " + name;
    //         document.querySelector(".temp").innerHTML = temp + "°C";
    //         document.querySelector(".desc").innerHTML = description;
    //         document.querySelector(".wind").innerHTML = "Wind speed : " + speed;
    //     })
    //     .catch((error) => console.log(error));
    // }
    // fetchWeather();

    // function displayWeather(data) {
    //     const name = data.name;
    //     const icon = data.weather[0].icon;
    //     const temp = data.main.temp;
    //     const speed = data.wind.speed;
    //     console.log(name, icon, description, temp, humidity, speed);

    //     document.querySelector(".city").innerHTML = "Weather in " + name;
    //     document.querySelector(".temp").innerHTML = temp;
    //     document.querySelector(".desc").innerHTML = description;
    //     document.querySelector(".wind").innerHTML = "Wind speed " + speed;
    // }
    // displayWeather();
    //     };
}
weatherApp();

// GIF app
setInterval(() => {
    function gifApp() {
        fetch(
            `https://api.giphy.com/v1/gifs/random?api_key=w5kVyG3lzcm2yQNbIHsIImohiaZCklHH`
        )
            .then((response) => response.json())
            .then((data) => displayGif(data.data.images.downsized_medium.url));
    }
    gifApp();

    function displayGif(url) {
        const gifDiv = document.querySelector(".gif");

        gifDiv.innerHTML = `<img src="${url}" style="width: 180px;" alt="gif">`;
    }
}, 5000);

// Time and Date
setInterval(() => {
    var today = new Date();
    var date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
    var time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    // console.log(date, time);

    const dateFromHtml = document.getElementById("date");
    const timeFromHtml = document.getElementById("time");

    dateFromHtml.innerHTML = `${date}`;
    timeFromHtml.innerHTML = `${time}`;
}, 1000);
