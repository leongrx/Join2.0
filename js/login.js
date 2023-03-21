setURL("https://leon-groschek.developerakademie.net/smallest_backend_ever");
/**
 * Login to Join
 */
const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-form-submit");
const loginErrorMsg = document.getElementById("login-error-msg");
const loginGuestBtn = document.getElementById("login-guest");
userInfo = [];
user = [];
guest = [];

async function inits() {
  await downloadFromServer();
  userInfo = await JSON.parse(backend.getItem("userInfo"));
  user = await JSON.parse(backend.getItem("user"));
  guest = await JSON.parse(backend.getItem("guest"));
  console.log(user);
  console.log(guest);
}

async function login() {
  // Get the values input by the user in the form fields
  const username = loginForm.username.value;
  const password = loginForm.password.value;

  if (username === "user" && password === "web") {
    // If the credentials are valid, show an alert box and reload the page
    // toggleModal();
    userInfo = [];
    userInfo.push({user: "user"});
    await backend.setItem("userInfo", JSON.stringify(userInfo));
    window.location.href = "../html/main.html";
  } else {
    // Otherwise, make the login error message show (change its oppacity)
    loginErrorMsg.style.opacity = 1;
  }
};

async function openJoin() {
  userInfo = [];
  userInfo.push({ user: "guest", alreadyPushed: false });
  await backend.setItem("userInfo", JSON.stringify(userInfo));
  window.location.href = "../html/main.html";
}

