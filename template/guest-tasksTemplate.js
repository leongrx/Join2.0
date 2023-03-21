function generateGuestBacklogAreaHTML(emailBacklog, imgName, i) {
  return /*html*/ `
              <div class="backlogContainerContent">
                <div class="backlogContent">
                    <div id="assignedTo${i}" class="assignedTo">
                        <div id="categoryBgColor${i}" class="categoryBgColor"></div>
                        <div>
                            <img class="backlogImg" src="../img/${imgName}.jpg" alt="">
                        </div>
                        <div class="assignedToProfile">
                            <span id="backlog-title" title="${guestTasks[i]["assignedAccount"]}">${guestTasks[i]["assignedAccount"]}</span>
                            <span id="copyEmail" title="${emailBacklog}">${emailBacklog}</span>
                        </div>
                        <div class="copyDiv">
                            <img class="copy" title="click to copy" onclick="clickToCopy(${i})" src="../img/copy.png">
                            <span class="copySpan d-none">Copy E-Mail</span>
                        </div>
                    </div>
                    <div class="marketing">
                        <span>${guestTasks[i]["category"]}</span>
                    </div>
                    <div class="details">
                        <button class="detailsBtn" onclick="openDetails(${i})">Details lesen</button>
                        <button class="deleteTaskBtn" onclick="deleteTask(${i})">Delete</button>
                    </div>
                </div>
            </div>`;
}

guestTasks = [
  {
    title: "Button anpassen",
    board: "toDo",
    category: "Software Development",
    description:
      "Bitte passen Sie das Design vom Button entsprechend dem neuen Look der Website an",
    date: "2023-02-28",
    urgency: "Medium",
    assignedAccount: "Max Mustermann",
    imgName: "Max",
    mail: "l.groschek@outlook.de"
  },
  {
    title: "UX-Design Fehlermeldung beheben",
    board: "toDo",
    category: "Software Development",
    description:
      "Bitte beheben Sie den Fehler bezüglich dem UX-Design",
    date: "2023-02-20",
    urgency: "High",
    assignedAccount: "Anastasiia Ünal",
    imgName: "Anastasiia",
    mail: "l.groschek@outlook.de"
  },
  {
    title: "Unit Test",
    board: "toDo",
    category: "Software Development",
    description:
      "Bitte führen Sie ein Unit Test durch und beheben gegebenenfalls die Fehler",
    date: "2023-02-25",
    urgency: "Low",
    assignedAccount: "Leon Groschek",
    imgName: "Leon",
    mail: "l.groschek@outlook.de"
  },
];
