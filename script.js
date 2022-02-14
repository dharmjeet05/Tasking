(function () {
    if (!localStorage.getItem("name")) {
        window.location.href = "signin.html";
    }
})();

function logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    // localStorage.removeItem("localItem");
    window.location.href = "signin.html";
}

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

        let randomNumber = Math.round(Math.random() * 100000);
        console.log(randomNumber);

        taskList.push({
            id: randomNumber,
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
    let outPutTwo = "";
    let outputMiddleText = "";
    let taskListShow = document.querySelector(".tasklist");
    // let uncompletedDiv = document.querySelector(".uncompleted");
    // let completedDiv = document.querySelector(".completed");
    let localItems = JSON.parse(localStorage.getItem("localItem"));

    if (localItems === null) {
        taskList = [];
    } else {
        taskList = localItems;
    }

    taskList.forEach((taskItem, index) => {
        if (taskItem.status === 1) {
            outputMiddleText = `<h3>Completed Task</h3>`;
        }

        if (taskItem.status === 0) {
            outPut += `
                        <div class="task"> 
                            <div class="task-text">${taskItem.task}</div>
                            <div class="task-actions">
                            <img 
                                onclick="completeTask(${index})"
                                src="https://img.icons8.com/glyph-neue/34/ffffff/checked.png"
                            />
                            
                            <a href="editTask.html" onclick="this.href='editTask.html?index=${index}'">
                            <img
                                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/30/ffffff/external-edit-interface-kiranshastry-solid-kiranshastry-1.png"
                            />
                            </a>
                            <img
                                onclick="deleteTask(${index})"
                                src="https://img.icons8.com/ios-glyphs/30/ffffff/filled-trash.png"
                            />
                            </div>
                            </div>
                            `;
        } else {
            outPutTwo += `
                        <div class="task active">
                            <div class="task-text">${taskItem.task}</div>
                            <div class="task-actions">
                            <img
                                onclick="completeTask(${index})"
                                src="https://img.icons8.com/glyph-neue/34/ffffff/checked.png"
                            />

                            <a href="editTask.html" onclick="this.href='editTask.html?index=${index}'">
                            <img
                                src="https://img.icons8.com/external-kiranshastry-solid-kiranshastry/30/ffffff/external-edit-interface-kiranshastry-solid-kiranshastry-1.png"
                            />
                            </a>
                            <img
                                onclick="deleteTask(${index})"
                                src="https://img.icons8.com/ios-glyphs/30/ffffff/filled-trash.png"
                            />
                            </div>
                            </div>
                            `;
        }
        // console.log(taskItem);
        // if (taskItem.status === 0) {
        //     uncompletedDiv.innerHTML = outPut;
        // }
    });
    // <img
    //     onclick="completeTask(${index})"
    //     src="https://img.icons8.com/ios-glyphs/30/ffffff/check-all.png"
    // />;
    // onclick="editTask(${index})"

    mainOutput = outPut + outputMiddleText + outPutTwo;
    taskListShow.innerHTML = mainOutput;
    taskItems = document.querySelectorAll(".task");
    var taskItemArr = Array.from(taskItems);
    console.log(taskItemArr);

    // taskItemArr.forEach((task, index) => {
    //     console.log(task.cl);
    //     // if (task[index].classList[1] !== "active") {
    //     //     uncompletedDiv.innerHTML = outPut;
    //     // }
    // });

    //     taskItemArr.forEach((task, index) =>{
    // }
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

    showList();
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
                            "Wind speed : " + speed + " km/h";
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
function gifApp() {
    fetch(
        `https://api.giphy.com/v1/gifs/random?api_key=w5kVyG3lzcm2yQNbIHsIImohiaZCklHH`
    )
        .then((response) => response.json())
        .then((data) => displayGif(data.data.images.downsized_medium.url));
}
function displayGif(url) {
    const gifDiv = document.querySelector(".gif");

    gifDiv.innerHTML = `<img src="${url}" style="width: 180px;" alt="gif">`;
}
gifApp();
setInterval(() => {
    gifApp();
}, 20000);

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
