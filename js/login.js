let userEmail = document.querySelector('#email')
let userPassword = document.querySelector('#password')
let loginBtn = document.querySelector('#loginBtn')
let emailError = document.querySelector('.emailError')
let passwordError = document.querySelector('.pass-error')
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
let errorMessage=document.querySelector("#errorMessage")


function isEmailValid() {
	const value = userEmail.value.trim();
	userEmail.classList.remove("is-valid", "is-invalid");
	emailError.textContent = '';


	if (value === '') {
		emailError.textContent = "Email is required.";
		userEmail.classList.add("is-invalid");
		return false;
	}

	if (!emailRegex.test(value)) {
		emailError.textContent = " Enter a valid email.";
		userEmail.classList.add("is-invalid");
		return false;
	}
	

	userEmail.classList.add("is-valid");
	return true;
}


function isUserExist(email, password){
	let users = JSON.parse(localStorage.getItem("newUsers")) || [];
	return users.some(user => 
		user.email.toLowerCase() === email.toLowerCase() && user.password === password
	);
}


loginBtn.addEventListener("click",handleLogIn)

function handleLogIn(){
	let email = userEmail.value.trim();
	let password = userPassword.value.trim();
if (!isEmailValid()) {
		return;
	}

	if (email === '' || password === '') {
		
			userEmail.classList.add("is-invalid");
			userPassword.classList.add("is-invalid");	
			alert("Please fill in all fields");
		return;
	}
if(!isUserExist(email,password)){
errorMessage.textContent = "email or password is incorrect";
errorMessage.classList.add("text-danger");

}
	if(isUserExist(email,password)){
errorMessage.textContent=" ";
errorMessage.classList.remove("text-danger");

	let users = JSON.parse(localStorage.getItem("newUsers")) || [];
	let currentUser = users.find(users => users.email.toLowerCase() === email.toLowerCase());

	
	localStorage.setItem("currentUserName", currentUser.name);
		alert("Logged In  successfully!");
	// after clicking on the signup btn the inputs will be reseted

	// then directing user to the loin page 
	window.location.href = 'home.html';

	}

}
