"use strict";
setURL("https://leon-groschek.developerakademie.net/smallest_backend_ever");

let user = [];
let guest = [];
let userInfo = [];
let taskIds = [];
let taskCategoryBacklog;
let taskUrgencyBacklog;
let worker;
let taskEmail;
let board = "toDo";

const colors = {
  "Software Development": "green",
  Sale: "orange",
  Product: "blue",
  Marketing: "red",
};


async function init() {
  await downloadFromServer();
  userInfo = await JSON.parse(backend.getItem("userInfo"));
  loadNavBar();
  setTaskId();
  user = await JSON.parse(backend.getItem("user"));
  guest = await JSON.parse(backend.getItem("guest"));
  pushGuestTasks();
  renderBacklog();
}

function renderBacklog() {
  if (guest !== null && userInfo[0].user == "guest") {
    let task = guest;
    ifRenderBacklog(task);
  } if(user !== null && userInfo[0].user == "user") {
    let task = user;
    ifRenderBacklog(task);
  }
}

function ifRenderBacklog(task) {
  let backlogArea = document.getElementById("backlog-area");
  backlogArea.innerHTML = "";
  for (let i = 0; i < task.length; i++) {
    document.getElementById("backlog-noTask").classList.add("d-none");
    document
      .getElementById("backlogContainerHeadline")
      .classList.remove("d-none");
    let imgName = task[i].imgName;
    let emailBacklog = task[i].mail;
    backlogArea.innerHTML += generateBacklogAreaHTML(
      task,
      emailBacklog,
      imgName,
      i
    );
    categoryBgColors(i);
  }
}

async function pushGuestTasks() {
  if (userInfo[0].user == "guest" && !userInfo[0].alreadyPushed) {
    let jsonData = JSON.stringify(guestTasks);
    let guestTask = JSON.parse(jsonData);
    guest = [];
    for (let i = 0; i < guestTask.length; i++) {
      guest.push(guestTask[i]);
    }
    setTaskId();
    userInfo.push({user: "guest", alreadyPushed : true});
    await backend.setItem("userInfo", JSON.stringify(userInfo));
    await backend.setItem("user", JSON.stringify(user));
  }
}

function setTaskId() {
  let i = 0;
  if(userInfo[0].user == "user") {
    ifUserTaskId(i);
  } if(userInfo[0].user == "guest") {
    ifGuestTaskId(i);
  }
}

function ifUserTaskId(i) {
  user.map((n) => {
    n["id"] = i;
    i++;
  });
}

function ifGuestTaskId(i) {
  guest.map((n) => {
    n["id"] = i;
    i++;
  });
}

async function deleteTask(i) {
  if(userInfo[0].user == "guest") {
    await ifGuestTask(i);
  } if(userInfo[0].user == "user") {
    await ifUserTask(i);
  }
  await init();
  toastDeleteTask();
}

async function ifUserTask(i) {
  await backend.deleteItem("user");
  user.splice(i, 1);
  await backend.setItem("user", JSON.stringify(user));
  setTimeout(() => {
    if(user == null || user.length <= 0) {
      alert('There´s no task available. Please create a task')
      window.location.href = "../html/addtask.html"
    } 
  }, 300);
}

async function ifGuestTask(i) {
  await backend.deleteItem("guest");
  guest.splice(i, 1);
  await backend.setItem("guest", JSON.stringify(guest));
  setTimeout(() => {
    if(guest == null || guest.length <= 0) {
      alert('There´s no task available. Please create a task')
      window.location.href = "../html/addtask.html"
    }
  }, 300);
}

function openDetails(i) {
  document.getElementById("backlogOpenDetails").innerHTML += openDetailsHTML(i);
  let showDetails = document.getElementById("backlogDetailsContainer");
  showDetails.classList.remove("d-none");
  openDetailLoadContent(i);
}

function closeDetails() {
  let showBacklogDetails = document.getElementById("backlogDetailsContainer");
  let showBacklogDetailsContainer =
    document.getElementById("backlogOpenDetails");
  showBacklogDetailsContainer.innerHTML = "";
  showBacklogDetails.classList.add("d-none");
}

function clickToCopy(mail) {
  mail.textContent;
  navigator.clipboard.writeText(mail);
  toastCopy();
}

function ifClickToCopy(i) {
  if(userInfo[0].user == "guest") {
    let mail = guest[i].mail;
    clickToCopy(mail)
  } if(userInfo[0].user == "user") {
    let mail = guest[i].mail;
    clickToCopy(mail)
  }
}

function openDetailLoadContent(i) {
  ifUserOpenDetailLoadContent(i);
  ifGuestOpenDetailLoadContent(i);
}

function ifUserOpenDetailLoadContent(i) {
  if(userInfo[0].user == "user") {
    document.getElementById("inputDetailContainer").value = user[i].title;
  document.getElementById("textareaDetailContainer").value =
    user[i].description;
  document.getElementById("taskCategory").innerText = user[i].category;
  document.getElementById("dateDetailContainer").value = user[i].date;
  document.getElementById("urgencyDetailContainer").innerText =
    user[i].urgency;
  document.getElementById("assignedToDetailContainer").innerText =
    user[i].assignedAccount;
  }
}

function ifGuestOpenDetailLoadContent(i) {
  if(userInfo[0].user == "guest") {
    document.getElementById("inputDetailContainer").value = guest[i].title;
  document.getElementById("textareaDetailContainer").value =
    guest[i].description;
  document.getElementById("taskCategory").innerText = guest[i].category;
  document.getElementById("dateDetailContainer").value = guest[i].date;
  document.getElementById("urgencyDetailContainer").innerText =
    guest[i].urgency;
  document.getElementById("assignedToDetailContainer").innerText =
    guest[i].assignedAccount;
  }
}

function openDetailGetEditContent(i) {
  let title = document.getElementById("inputDetailContainer").value;
  let description = document.getElementById("textareaDetailContainer").value;
  ifUserOpenDetailGetEditContent(i, title, description);
  ifGuestOpenDetailGetEditContent(i, title, description);
}

function ifUserOpenDetailGetEditContent(i, title, description) {
  if(userInfo[0].user == "user") {
    let category =
    taskCategoryBacklog == undefined
      ? user[i].category
      : taskCategoryBacklog;
  let date = document.getElementById("dateDetailContainer").value;
  let urgency =
    taskUrgencyBacklog == undefined ? user[i].urgency : taskUrgencyBacklog;
  let assignedAccount =
    worker == undefined ? user[i].assignedAccount : worker;
  let imgName =
    assignedAccount == undefined
      ? user[i].imgName
      : assignedAccount.split(" ").slice(0, 1).join("");
  let mail = taskEmail == undefined ? user[i].mail : taskEmail;
  pushEditContent(
    title,
    description,
    category,
    date,
    urgency,
    assignedAccount,
    imgName,
    mail,
    i
  );
  }
}

function ifGuestOpenDetailGetEditContent(i, title, description) {
  if(userInfo[0].user == "guest") {
    let category =
    taskCategoryBacklog == undefined
      ? guest[i].category
      : taskCategoryBacklog;
  let date = document.getElementById("dateDetailContainer").value;
  let urgency =
    taskUrgencyBacklog == undefined ? guest[i].urgency : taskUrgencyBacklog;
  let assignedAccount =
    worker == undefined ? guest[i].assignedAccount : worker;
  let imgName =
    assignedAccount == undefined
      ? guest[i].imgName
      : assignedAccount.split(" ").slice(0, 1).join("");
  let mail = taskEmail == undefined ? guest[i].mail : taskEmail;
  pushEditContent(
    title,
    description,
    category,
    date,
    urgency,
    assignedAccount,
    imgName,
    mail,
    i
  );
  }
}

async function pushEditContent(
  title,
  description,
  category,
  date,
  urgency,
  assignedAccount,
  imgName,
  mail,
  i
) {
  let newTask = {
    title: title,
    category: category,
    description: description,
    date: date,
    urgency: urgency,
    assignedAccount: assignedAccount,
    imgName: imgName,
    mail: mail,
    board: board,
  };
  afterPushEditContent(newTask, i);
}

async function afterPushEditContent(newTask, i) {
  await ifUserAfterPushEditContent(newTask, i);
  await ifGuestAfterPushEditContent(newTask, i);
  init();
  clearOpenDetailTasks();
  closeDetails();
  toastEditTask();
}

async function ifUserAfterPushEditContent(newTask, i) {
  if(userInfo[0].user == "user") {
    await backend.deleteItem("user");
    user.splice(i, 1);
    user.push(newTask);
    setTaskId();
    await backend.setItem("user", JSON.stringify(user));
  }
}

async function ifGuestAfterPushEditContent(newTask, i) {
  if(userInfo[0].user == "guest") {
    await backend.deleteItem("guest");
    guest.splice(i, 1);
    guest.push(newTask);
    setTaskId();
    await backend.setItem("guest", JSON.stringify(guest));
  }
}

function clearOpenDetailTasks() {
  taskCategoryBacklog = undefined;
  taskUrgencyBacklog = undefined;
  worker = undefined;
  taskEmail = undefined;
}

function toastDeleteTask() {
  let deleteToast = document.getElementById("backlog");
  deleteToast.innerHTML += toastDeleteHTML();
  setTimeout(function () {
    clearToastEditTask();
  }, 3000);
}

function toastEditTask() {
  let editToast = document.getElementById("backlog");
  editToast.innerHTML += toastEditHTML();
  setTimeout(function () {
    clearToastEditTask();
  }, 3000);
}

function clearToastEditTask() {
  let clearToast = document.getElementById("toastEditContainer");
  clearToast.parentNode.removeChild(clearToast);
}

function toastCopy() {
  let toastCopy = document.getElementById("backlog");
  toastCopy.innerHTML += toastCopyHTML();
  setTimeout(function () {
    clearCopyToast();
  }, 3000);
}

function clearCopyToast() {
  let toastCopy = document.getElementById("toastCopyContainer");
  toastCopy.parentNode.removeChild(toastCopy);
}

function toast() {
  let backlog = document.getElementById("backlog");
  backlog.innerHTML += toastHTML();
  setTimeout(function () {
    clearToast();
  }, 3000);
}

function clearToast() {
  let clearToast = document.getElementById("toastContainer");
  clearToast.classList.add("d-none");
}

function chooseCategoryBacklog(name) {
  taskCategoryBacklog = name;
}

function chooseUrgencyBacklog(name) {
  taskUrgencyBacklog = name;
}

window.addEventListener("resize", function () {
  if(user !== null || guest !== null) {
    if(userInfo[0].user == "user") {
      forUserResize()
    } if(userInfo[0].user == "guest") {
      forGuestResize();
    }
  }
});

function forUserResize() {
  for (let i = 0; i < user.length; i++) {
    const currentCategory = user[i].category;
    const color = colors[currentCategory];
    if (window.matchMedia("(max-width: 800px)").matches) {
      document.getElementById(
        `assignedTo${i}`
      ).style = `border-bottom: 1px solid ${color}`;
    } else {
      document.getElementById(`assignedTo${i}`).style = "border-bottom: none";
    }
  }
}

function forGuestResize() {
  for (let i = 0; i < guest.length; i++) {
    const currentCategory = guest[i].category;
    const color = colors[currentCategory];
    if (window.matchMedia("(max-width: 800px)").matches) {
      document.getElementById(
        `assignedTo${i}`
      ).style = `border-bottom: 1px solid ${color}`;
    } else {
      document.getElementById(`assignedTo${i}`).style = "border-bottom: none";
    }
  }
}

function chooseAssignedAccountBacklog(position, name, email) {
  workerBorderWhite();
  let workerBorder = document.getElementById("workerBacklog-" + position);
  if (workerBorder.style.border == "1px solid red") {
    workerBorder.style.border = "1px solid white";
  } else {
    workerBorder.style.border = "1px solid red";
  }
  worker = name;
  taskEmail = email;
}

function workerBorderWhite() {
  document.getElementById("workerBacklog-1").style.border = "1px solid white";
  document.getElementById("workerBacklog-2").style.border = "1px solid white";
  document.getElementById("workerBacklog-3").style.border = "1px solid white";
}

function categoryBgColors(i) {
  if(userInfo[0].user == "guest") {
    const currentCategory = guest[i].category;
    setCategoryBgColors(i, currentCategory)
  } if(userInfo[0].user == "user") {
    const currentCategory = user[i].category;
    setCategoryBgColors(i, currentCategory)
  }
}

function setCategoryBgColors(i, currentCategory) {
  const color = colors[currentCategory];
  document.getElementById(`categoryBgColor${i}`).style.backgroundColor = color;
}
