let userFullName = document.querySelector('#userFullName')
let userEmail = document.querySelector('#email')
let userPassword = document.querySelector('#password')
let signUpBtn = document.querySelector('#signUpBtn')
let logInBtn = document.querySelector('#loginBtn')
let formEle = document.querySelector('form')
let nameError = document.querySelector('.nameError')
let emailError = document.querySelector('.emailError')
let passwordError = document.querySelector('.pass-error')
// 
// 
// regex
const userNameRegex = /^[a-zA-Z0-9]+(\s[a-zA-Z0-9]+)*$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;


//saving data in localStorage
let users = JSON.parse(localStorage.getItem("newUsers")) || [];

// 
signUpBtn.addEventListener('click', function () {
	let name = userFullName.value.trim();
	let email = userEmail.value.trim();
	let password = userPassword.value.trim();


	// double check before submitting or going to login page if the email is used before or not
	if (isEmailUsed(email)) {
		alert("This email is already used!");
		return;
	}

	// checking if all inputs are empty
	if (name === '' || email === '' || password === '') {
		userFullName.classList.add("is-invalid");
		userEmail.classList.add("is-invalid");
		userPassword.classList.add("is-invalid");
		alert("Please fill in all fields");
		return;
	}

	// creatin an object
	let newUser = {
		name: userFullName.value,
		email: userEmail.value,
		password: userPassword.value
	}

	// pushing object on the array
	users.push(newUser)
	// storing every new user into the local storage
	localStorage.setItem("newUsers", JSON.stringify(users));
	// if all is done this alert will apear
	alert("Account created successfully!");
	// then directing user to the loin page 
	window.location.href = 'login.html';
	// after clicking on the signup btn the inputs will be reseted
	resetInputs()
});

// validating inputs

// validating user full name input
userFullName.addEventListener('input', validateFullName);

function validateFullName() {
	const value = userFullName.value.trim();
	const valueWithoutSpaces = value.replace(/\s/g, '');

	userFullName.classList.remove("is-valid", "is-invalid");
	nameError.textContent = '';

	if (value === "") {
		nameError.textContent = "Full name is required.";
		userFullName.classList.add("is-invalid");
		return false;
	}

	if (!userNameRegex.test(value)) {
		nameError.textContent = "Full name must not start or end with spaces and can only contain letters, numbers, and spaces in between.";
		userFullName.classList.add("is-invalid");
		return false;
	}

	if (valueWithoutSpaces.length < 3) {
		nameError.textContent = "Full name must contain at least 3 letters or numbers.";
		userFullName.classList.add("is-invalid");
		return false;
	}

	userFullName.classList.add("is-valid");
	return true;
}

// validating user email
function isEmailUsed(email) {
	let users = JSON.parse(localStorage.getItem("newUsers")) || [];
	return users.some(user => user.email.toLowerCase() === email.toLowerCase());

}
userEmail.addEventListener("input", isEmailValid)

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
	if (isEmailUsed(value)) {
		emailError.textContent = "Email is already used.";
		userEmail.classList.add("is-invalid");
		return false;
	}

	userEmail.classList.add("is-valid");
	return true;
}

// validating password

userPassword.addEventListener("input", isPasswordValid)
function isPasswordValid() {
	const value = userPassword.value.trim();
	userPassword.classList.remove("is-valid", "is-invalid");
	passwordError.textContent = '';

	if (value === '') {
		passwordError.textContent = 'Password is required';
		userPassword.classList.add("is-invalid");
		return false;
	}
	if (!passwordRegex.test(value)) {
		passwordError.textContent = "Password must be at least 6 characters, include letters and numbers.";
		userPassword.classList.add("is-invalid");
		return false;
	}
	userPassword.classList.add("is-valid");
	return true;
}


// reset inputs
function resetInputs() {
	userFullName.value = "";
	userEmail.value = "";
	userPassword.value = "";
}


