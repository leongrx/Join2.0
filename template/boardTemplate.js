function generateToDoAreaHTML(imgName, element) {
  return /*html*/ `
                <div draggable="true" ondragstart="startDragging(${element.id})" class="toDoTaskBox margin-box" id="toDoTask${element.id}">
                  <div class="boardWebVersion">
                    <div class="onclickOpenTaskBoard">
                        <div class="toDoTaskHeader">
                          <img class="backlogImg" src="../img/${imgName}.jpg" alt=""> 
                          <span id="backlog-title" title="${element["assignedAccount"]}">${element["assignedAccount"]}</span>
                        </div>
                        <div class="toDoTaskTitle">
                            <span>Task: ${element["title"]}</span>
                            <span>Deadline: ${element["date"]}</span>
                        </div>
                    </div>
                    <div class="boardBtnDiv">
                      <img onclick="deleteBoardTask(${element.id})" class="boardBtn" src="../img/delete.png">
                      <img onclick="openTaskBoard(${element.id})" class="boardBtn" src="../img/information.png">
                    </div>
                  </div>
                  <div class="boardMobileVersion" id="boardMobileVersion">
                      <form name="mobileBoardForm">
                        <select name="mobileBoard" id="mobileBoard${element.id}" onchange="mobileMoveToBoard(${element.id})">
                          <option value="">Choose a board to move</option>
                          <option value="inProgress">In Progress</option>
                          <option value="testing">Testing</option>
                          <option value="done">Done</option>
                        </select>
                      </form>
                  </div>
              </div>
              `;
}

function generateInProgressAreaHTML(imgName, element) {
  return /*html*/ `
              <div draggable="true" ondragstart="startDragging(${element.id})" class="toDoTaskBox margin-box" id="toDoTask${element.id}">
                <div class="boardWebVersion">
                    <div class="onclickOpenTaskBoard">
                        <div class="toDoTaskHeader">
                          <img class="backlogImg" src="../img/${imgName}.jpg">
                          <span id="backlog-title" title="${element["assignedAccount"]}">${element["assignedAccount"]}</span>
                        </div>
                        <div class="toDoTaskTitle">
                            <span>Task: ${element["title"]}</span>
                            <span>Deadline: ${element["date"]}</span>
                        </div>
                    </div>
                    <div class="boardBtnDiv">
                      <img onclick="deleteBoardTask(${element.id})" class="boardBtn" src="../img/delete.png">
                      <img onclick="openTaskBoard(${element.id})" class="boardBtn" src="../img/information.png">
                    </div>
                </div>
                <div class="boardMobileVersion" id="boardMobileVersion">
                      <form name="mobileBoardForm">
                        <select name="mobileBoard" id="mobileBoard${element.id}" onchange="mobileMoveToBoard(${element.id}, value)">
                          <option value="">Choose a board to move</option>
                          <option value="toDo">To Do</option>
                          <option value="testing">Testing</option>
                          <option value="done">Done</option>
                        </select>
                      </form>
                      <label id="mobileBoardLabel"></label>
                  </div>
              </div>
              `;
}

function generateTestingAreaHTML(imgName, element) {
  return /*html*/ `
                <div draggable="true" ondragstart="startDragging(${element.id})" class="toDoTaskBox margin-box" id="toDoTask${element.id}">
                  <div class="boardWebVersion">
                    <div class="onclickOpenTaskBoard">
                        <div class="toDoTaskHeader">
                          <img class="backlogImg" src="../img/${imgName}.jpg" alt="">
                          <span id="backlog-title" title="${element["assignedAccount"]}">${element["assignedAccount"]}</span>
                        </div>
                        <div class="toDoTaskTitle">
                            <span>Task: ${element["title"]}</span>
                            <span>Deadline: ${element["date"]}</span>
                        </div>
                    </div>
                    <div class="boardBtnDiv">
                      <img onclick="deleteBoardTask(${element.id})" class="boardBtn" src="../img/delete.png">
                      <img onclick="openTaskBoard(${element.id})" class="boardBtn" src="../img/information.png">
                    </div>  
                </div>   
                <div class="boardMobileVersion" id="boardMobileVersion">
                      <form name="mobileBoardForm">
                        <select name="mobileBoard" id="mobileBoard${element.id}" onchange="mobileMoveToBoard(${element.id})">
                          <option value="">Choose a board to move</option>
                          <option value="toDo">To Do</option>
                          <option value="inProgress">In Progress</option>
                          <option value="done">Done</option>
                        </select>
                      </form>
                      <label id="mobileBoardLabel"></label>
                  </div>             
              </div>
              `;
}

function generateDoneAreaHTML(imgName, element) {
  return /*html*/ `
                <div draggable="true" ondragstart="startDragging(${element.id})" class="toDoTaskBox margin-box" id="toDoTask${element.id}">
                  <div class="boardWebVersion">
                    <div class="onclickOpenTaskBoard">
                        <div class="toDoTaskHeader">
                          <img class="backlogImg" src="../img/${imgName}.jpg" alt="">
                          <span id="backlog-title" title="${element["assignedAccount"]}">${element["assignedAccount"]}</span>
                        </div>
                        <div class="toDoTaskTitle">
                            <span>Task: ${element["title"]}</span>
                            <span>Deadline: ${element["date"]}</span>
                        </div>
                    </div>
                    <div class="boardBtnDiv">
                      <img onclick="deleteBoardTask(${element.id})" class="boardBtn" src="../img/delete.png">
                      <img onclick="openTaskBoard(${element.id})" class="boardBtn" src="../img/information.png">
                    </div>
                </div>
                <div class="boardMobileVersion" id="boardMobileVersion">
                      <form name="mobileBoardForm">
                        <select name="mobileBoard" id="mobileBoard${element.id}" onchange="mobileMoveToBoard(${element.id})">
                          <option value="">Choose a board to move</option>
                          <option value="toDo">To Do</option>
                          <option value="inProgress">In Progress</option>
                          <option value="testing">Testing</option>
                        </select>
                      </form>
                      <label id="mobileBoardLabel"></label>
                  </div>             
              </div>
              `;
}

function generateOpenTaskHTML(task, imgName, element) {
  return /*html*/ `
              <div class="openTaskBoardContent">
                <img onclick="closeOpenTaskBoard()" class="boardBackIcon" src="../img/back.png">
                <div class="openTaskBoardLeftRight">
                  <!-- ====== LEFT ====== -->
                  <div class="openTaskLeft">
                    <div class="openTaskLeftImg">
                       <img src="../img/${imgName}.jpg">
                    </div>
                    <div class="openTaskLeftContact">
                      <h3>Kontakt</h3>
                      <ul>
                        <li>
                          <span class="gif class="><img src="../gifs/id.gif"></span>
                          <span>${task[element].assignedAccount}</span>
                        </li>
                        <li>
                          <span class="gif"><img src="../gifs/workplace.gif"></span>
                          <span>${task[element].category}</span>
                        </li>
                        <li>
                          <span class="gif"><img src="../gifs/mailing.gif"></span>
                          <a href="mailto:${task[element].mail}" class="openTaskMail">${task[element].mail}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                    <!-- ====== RIGHT ====== -->
                    <div class="openTaskRight">
                      <div class="openTaskRightContent">
                        <h3><u>Title</u></h3>
                        <span>${task[element].title}</span>
                      </div>
                      <div class="openTaskRightContent">
                        <h3><u>Category</u></h3>
                        <span>${task[element].category}</span>
                      </div>
                      <div class="openTaskRightContent">
                        <h3><u>Description</u></h3>
                        <span>${task[element].description}</span>
                      </div>
                      <div class="openTaskRightContent">
                        <h3><u>Due</u>-Date</h3>
                        <span>${task[element].date}</span>
                      </div>
                      <div class="openTaskRightContent">
                        <h3><u>Urgency</u></h3>
                        <span>${task[element].urgency}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            `;
}

function toastHTML() {
  return /*html*/ `
  <!-- Toast Container -->
  <div id="toastContainer" class="toastContainer">
     <strong>Success</strong>
     Your task has been deleted!
  </div>`;
}
