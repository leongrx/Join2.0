setURL("https://leon-groschek.developerakademie.net/smallest_backend_ever");

let user = [];
let guest = [];
let userInfo = [];
let currentDraggedElement;

const toastAlert = document.getElementById("toastAlert");

const colors = {
  "Software Development": "radial-gradient(rgb(182 227 211), #8bc34a)",
  Sale: "radial-gradient(#ffeb3b, #ff9800)",
  Product: "radial-gradient(rgb(82 241 255), rgb(3 144 223))",
  Marketing: "radial-gradient(rgb(231 194 191), rgb(201 44 32 / 81%))",
};

async function init() {
  await downloadFromServer();
  userInfo = await JSON.parse(backend.getItem("userInfo"));
  user = await JSON.parse(backend.getItem("user"));
  guest = await JSON.parse(backend.getItem("guest"));
  loadRenderBoard();
  setTaskId();
  loadNavBar();
}

function loadRenderBoard() {
  pushGuestTasks();
  if (user !== null || guest !== null) {
    renderBoardToDo();
    renderBoardInProgress();
    renderBoardTesting();
    renderBoardDone();
    checkIfMobile();
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
    userInfo[0].alreadyPushed = true;
    await backend.setItem("userInfo", JSON.stringify(userInfo));
    await backend.setItem("guest", JSON.stringify(guest));
  }
}

function renderBoardToDo() {
  if(userInfo[0].user == "guest") {
    let toDo = guest.filter((a) => a.board == "toDo");
    boardToDo(toDo);
  } if(userInfo[0].user == "user") {
    let toDo = user.filter((a) => a.board == "toDo");
    boardToDo(toDo);
  }
}

function boardToDo(toDo) {
  let toDoArea = document.getElementById("toDo");
  toDoArea.innerHTML = "";
  for (let i = 0; i < toDo.length; i++) {
    let element = toDo[i];
    let imgName = toDo[i].imgName;
    toDoArea.innerHTML += generateToDoAreaHTML(imgName, element);
    categoryBgColors(element);
  }
}

function renderBoardInProgress() {
  if(userInfo[0].user == "guest") {
    let inProgress = guest.filter((a) => a.board == "inProgress");
    boardInProgress(inProgress);
  } if(userInfo[0].user == "user") {
    let inProgress = user.filter((a) => a.board == "inProgress");
    boardInProgress(inProgress);
  }
}

function boardInProgress(inProgress) {
  let inProgressArea = document.getElementById("inProgress");
  inProgressArea.innerHTML = "";
  for (let i = 0; i < inProgress.length; i++) {
    let element = inProgress[i];
    let imgName = inProgress[i].imgName;
    inProgressArea.innerHTML += generateInProgressAreaHTML(imgName, element);
    categoryBgColors(element);
  }
}

function renderBoardTesting() {
  if(userInfo[0].user == "guest") {
    let testing = guest.filter((a) => a.board == "testing");
    boardTesting(testing);
  } if(userInfo[0].user == "user") {
    let testing = user.filter((a) => a.board == "testing");
    boardTesting(testing);
  }
}

function boardTesting(testing) {
  let testingArea = document.getElementById("testing");
  testingArea.innerHTML = "";
  for (let i = 0; i < testing.length; i++) {
    let element = testing[i];
    let imgName = testing[i].imgName;
    testingArea.innerHTML += generateTestingAreaHTML(imgName, element);
    categoryBgColors(element);
  }
}

function renderBoardDone() {
  if(userInfo[0].user == "guest") {
    let done = guest.filter((a) => a.board == "done");
    boardDone(done);
  } if(userInfo[0].user == "user") {
    let done = user.filter((a) => a.board == "done");
    boardDone(done);
  }
}

function boardDone(done) {
  let doneArea = document.getElementById("done");
  doneArea.innerHTML = "";
  for (let i = 0; i < done.length; i++) {
    let element = done[i];
    let imgName = done[i].imgName;
    doneArea.innerHTML += generateDoneAreaHTML(imgName, element);
    categoryBgColors(element);
  }
}

function categoryBgColors(element) {
  const currentCategory = element.category;
  const color = colors[currentCategory];
  document.getElementById(`toDoTask${element.id}`).style.background = color;
}

function startDragging(id) {
  currentDraggedElement = id;
}

function disableMobileMoveToBoard() {
  let element = document.getElementsByClassName("boardMobileVersion");
  for (let i = 0; i < element.length; i++) {
    element[i].style.display = "none";
  }
}

function displayMobileMoveToBoard() {
  let element = document.getElementsByClassName("boardMobileVersion");
  for (let i = 0; i < element.length; i++) {
    element[i].style.display = "flex";
  }
}

function checkIfMobile() {
  if (/Android|webOS|iPhone|iPad|iPod|Opera Mini/i.test(navigator.userAgent)) {
    displayMobileMoveToBoard();
  } else {
    disableMobileMoveToBoard();
  }
}

async function deleteBoardTask(element) {
  if(userInfo[0].user == "user") {
    ifUserDeleteBoardTask(element);
  } if(userInfo[0].user == "guest") {
    ifGuestDeleteBoardTask(element);
  } 
}

async function ifUserDeleteBoardTask(element) {
  await backend.deleteItem(user);
  user.splice(element, 1);
  setTaskId();
  loadRenderBoard();
  await backend.setItem("user", JSON.stringify(user));
  await init();
  toast();
  if(user == null || user.length <= 0) {
    alert('There´s no task available. Please create a task')
    window.location.href = "../html/addtask.html"
  }
}

async function ifGuestDeleteBoardTask(element) {
  await backend.deleteItem(guest);
  guest.splice(element, 1);
  setTaskId();
  loadRenderBoard();
  await backend.setItem("guest", JSON.stringify(guest));
  await init();
  toast();
  if(guest == null || guest.length <= 0) {
    alert('There´s no task available. Please create a task')
    window.location.href = "../html/addtask.html"
  }
}

function toast() {
  let todo = document.getElementById("board");
  todo.innerHTML += toastHTML();
  setTimeout(function () {
    clearToast();
  }, 3000);
}

function clearToast() {
  let clearToast = document.getElementById("toastContainer");
  clearToast.parentNode.removeChild(clearToast);
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

function openTaskBoard(element) {
  let openTask = document.getElementById("openTaskBoard");
  openTask.classList.remove("d-none");
  ifOpenTaskBoard(openTask, element)
  
}

function ifOpenTaskBoard(openTask, element) {
  if(userInfo[0].user == "user") {
    let task = user;
    let imgName = user[element].imgName;
    openTask.innerHTML = generateOpenTaskHTML(task, imgName, element);
  } if(userInfo[0].user == "guest") {
    let task = guest;
    let imgName = guest[element].imgName;
    openTask.innerHTML = generateOpenTaskHTML(task, imgName, element);
  }
}

function closeOpenTaskBoard() {
  let openTask = document.getElementById("openTaskBoard");
  openTask.classList.add("d-none");
}

function moveTo(board) {
  if(userInfo[0].user == "user") {
    ifUserMoveTo(board);
  } if(userInfo[0].user == "guest") {
    ifGuestMoveTo(board);
  }
}

async function ifUserMoveTo(board) {
  user[currentDraggedElement].board = board;
  removeHighlight(board);
  loadRenderBoard();
  await backend.deleteItem("user");
  await backend.setItem("user", JSON.stringify(user));
  init();
}

async function ifGuestMoveTo(board) {
  guest[currentDraggedElement].board = board;
  removeHighlight(board);
  loadRenderBoard();
  await backend.deleteItem("guest");
  await backend.setItem("guest", JSON.stringify(guest));
  init();
}

async function mobileMoveToBoard(element) {
  let mobileBoardToMove = document.getElementById(`mobileBoard${element}`);
  if(userInfo[0].user == "user") {
    ifUserMobileMoveToBoard(mobileBoardToMove);
  } if(userInfo[0].user == "guest") {
    ifGuestMobileMoveToBoard(mobileBoardToMove);
  }
}

async function ifUserMobileMoveToBoard(mobileBoardToMove) {
  user[element].board = mobileBoardToMove.value;
  loadRenderBoard();
  await backend.deleteItem("user");
  await backend.setItem("user", JSON.stringify(user));
  init();
}

async function ifGuestMobileMoveToBoard(mobileBoardToMove) {
  guest[element].board = mobileBoardToMove.value;
  loadRenderBoard();
  await backend.deleteItem("guest");
  await backend.setItem("guest", JSON.stringify(guest));
  init();
}

function allowDrop(ev) {
  ev.preventDefault();
}

function highlight(id) {
  document.getElementById(id).classList.add("dragoverHighlight");
}

function removeHighlight(id) {
  document.getElementById(id).classList.remove("dragoverHighlight");
}

// async function deleteTask(task, i) {
//   await backend.deleteItem("task");
//   task.splice(i, 1);
//   await backend.setItem("task", JSON.stringify(task));
//   loadRenderBoard();
//   init();
// }
