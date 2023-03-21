let taskAssignedAccounts = [];
let user = [];
let guest = [];
let userInfo = [];
let taskIds = [];
let worker;
let taskCategory;
let taskUrgency;
let taskEmail;
let board = "toDo";
let modal = false;

setURL("https://leon-groschek.developerakademie.net/smallest_backend_ever");

async function init() {
  loadNavBar();
  await downloadFromServer();
  userInfo = await JSON.parse(backend.getItem("userInfo"));
  user = JSON.parse(backend.getItem("user")) || [];
  guest = JSON.parse(backend.getItem("guest")) || [];
  taskIds = JSON.parse(backend.getItem("taskIds")) || [];
  console.log(user)
  console.log(guest)
}


/**
 * Load the calendar in Add-Task-Form with min date current day
 */
function loadDate() {
  let currentDay = new Date().toISOString().split("T")[0];
  document.getElementById("taskDate").setAttribute("min", currentDay);
}


/**
 * Create a new Task with Date from the Task-Form and push the task in JSON-Array
 */
function createTask() {
  let title = document.getElementById("taskTitle").value;
  let category = taskCategory || "";
  let description = document.getElementById("taskDescription").value;
  let date = document.getElementById("taskDate").value;
  let urgency = taskUrgency || "";
  let assignedAccount = worker || "";
  let imgName = assignedAccount.split(" ").slice(0, 1).join("");
  let mail = taskEmail;
  generateNewTask(title, category, description, date, urgency, assignedAccount, imgName, mail);
}


/**
 * Generate a Task, push the task in JSON-Array and clean the task-form
 */
async function generateNewTask(title, category, description, date, urgency, assignedAccount, imgName, mail) {
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
  renderTask(newTask)
}


function renderTask(newTask) {
  if(userInfo[0].user == "user") {
    ifUserRenderTask(newTask);
  } if(userInfo[0].user == "guest") {
    ifGuestRenderTask(newTask);
  }
}

async function ifUserRenderTask(newTask) {
  if(user == null) {
    user = [];
  }
  user.push(newTask);
  setTaskId();
  await backend.setItem("user", JSON.stringify(user));
  showPopUpWindow();
  cleanTaskForm();
  init();
}

async function ifGuestRenderTask(newTask) {
  guest.push(newTask);
  setTaskId();
  await backend.setItem("guest", JSON.stringify(guest));
  showPopUpWindow();
  cleanTaskForm();
  init();
}


/** 
 * Every task became an ID (for drag and drop function in board)
 */
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


function chooseAssignedAccount(position, name, email) {
  workerBorderWhite();
  workerBorder = document.getElementById("worker-" + position);
  if (workerBorder.style.border == "1px solid red") {
    workerBorder.style.border = "1px solid white";
  } else {
    workerBorder.style.border = "1px solid red";
  }
  worker = name;
  taskEmail = email;
}


function workerBorderWhite() {
  document.getElementById("worker-1").style.border = "1px solid white";
  document.getElementById("worker-2").style.border = "1px solid white";
  document.getElementById("worker-3").style.border = "1px solid white";
}


function chooseCategory(position, name) {
  document.getElementById("category-" + position).style.background = "grey";
  taskCategory = name;
}


function chooseUrgency(position, name) {
  document.getElementById("urgency-" + position).style.background = "grey";
  taskUrgency = name;
}


/**
 * Show a Modal Popup Box when a task was created 
 */
function showPopUpWindow() {
  if (modal === false) {
    document.getElementById("popUpBox").style.display = "block";
    modal = true;
    window.scrollTo(0, 0);
  } else {
    document.getElementById("popUpBox").style.display = "none";
    modal = false;
  }
}


function cleanTaskForm() {
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDate").value = "";
  document.getElementById("taskDescription").value = "";
  workerBorderWhite();
  init();
}