setURL("https://leon-groschek.developerakademie.net/smallest_backend_ever");

async function loadNavBar() {
  await includeHTML();
  await downloadFromServer();
  userInfo = await JSON.parse(backend.getItem("userInfo"));
  user = await JSON.parse(backend.getItem("user"));
  //   guestTask = await JSON.parse(backend.getItem("guestTask"));
  console.log(user);
}

async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/*
 * Responsive Menu
 */
function openResponsiveMenu() {
  document.getElementById("menu-links").classList.remove("d-none");
  document.getElementById("resp-header").classList.add("d-none");
}

function closeResponsiveMenu() {
  document.getElementById("menu-links").classList.add("d-none");
  document.getElementById("resp-header").classList.remove("d-none");
}

function noTaskAvailableBacklog() {
  if (userInfo[0].user == "user") {
    if (user == null || user.length <= 0) {
      noTaskToast();
    } else {
      window.location.href = "../html/backlog.html";
    }
  }

  if (userInfo[0].user == "guest") {
    if (!userInfo[0].alreadyPushed) {
      window.location.href = "../html/backlog.html"
    } else if (guest == null || guest.length <= 0) {
      noTaskToast();
    } else {
      window.location.href = "../html/backlog.html";
    }
  }
}

async function noTaskAvailableBoard() {
  if (userInfo[0].user == "user") {
    if (user == null || user.length <= 0) {
      noTaskToast();
    } else {
      window.location.href = "../html/board.html";
    }
  }

  if (userInfo[0].user == "guest") {
    if (!userInfo[0].alreadyPushed) {
      window.location.href = "../html/board.html"
    } else if (guest == null || guest.length <= 0) {
      noTaskToast();
    } else {
      window.location.href = "../html/board.html";
    }
  }

  
}

function noTaskToast() {
  const url = new URL(window.location.toLocaleString());
  if (url.pathname.includes("addtask.html")) {
    alert("There´s no task available. Please create a task");
  } else {
    alert("There´s no task available. Please create a task");
    window.location.href = "../html/addtask.html";
  }
}

function deleteNoTaskHTML() {
  let clearNoTask = document.getElementById("noTaskToastContainer");
  clearNoTask.parentNode.removeChild(clearNoTask);
}
