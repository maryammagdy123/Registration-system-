let helloMessage = document.querySelector("#helloMessage")
let userName = localStorage.getItem("currentUserName")
let logOutBtn = document.querySelector('#logOutBtn')

if (userName) {
	helloMessage.textContent = `Welcome, ${userName}!`;
}else{
	window.location.href = "login.html"
}


logOutBtn.addEventListener("click", handleLogOut)
function handleLogOut() {
	
	window.location.href = "login.html"
}



