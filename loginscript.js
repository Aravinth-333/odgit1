// Existing functionality for toggling forms
const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const wrapper = document.querySelector('.wrapper');

signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

function togglePasswordVisibility(id) {
    const passwordInput = document.getElementById(id);
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
    } else {
        passwordInput.type = 'password';
    }
}



// const signInBtnLink = document.querySelector('.signInBtn-link');
// const signUpBtnLink = document.querySelector('.signUpBtn-link');
// const wrapper = document.querySelector('.wrapper');

// signUpBtnLink.addEventListener('click', () => {
//   wrapper.classList.toggle('active');
// });

// signInBtnLink.addEventListener('click', () => {
//   wrapper.classList.toggle('active');
// });

// function togglePasswordVisibility(id) {
//   const passwordInput = document.getElementById(id);
//   if (passwordInput.type === 'password') {
//     passwordInput.type = 'text';
//   } else {
//     passwordInput.type = 'password';
//   }
// }

// function validateEmail(email) {
//   const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
//   return re.test(String(email).toLowerCase());
// }

// function validatePassword(password) {
//   const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//   return re.test(String(password));
// }

// const existingUsers = [
//   { username: "user1", password: "Password1!", email: "user1@example.com" },
//   { username: "user2", password: "Password2@", email: "user2@example.com" }
// ];

// function validateSignUp() {
//   const username = document.getElementById('signup-username').value;
//   const email = document.getElementById('signup-email').value;
//   const password = document.getElementById('signup-password').value;

//   if (!validateEmail(email)) {
//     alert("Please enter a valid email address.");
//     return false;
//   }

//   if (!validatePassword(password)) {
//     alert("Password must be at least 8 characters long and include at least one uppercase letter, one special symbol, and one number.");
//     return false;
//   }

//   const userExists = existingUsers.some(user => user.username === username);
//   if (userExists) {
//     alert("Username already exists. Please choose a different username.");
//     return false;
//   }

//   alert("Sign Up successful!");
//   return true;
// }

// function validateLogin() {
//   const username = document.getElementById('login-username').value;
//   const password = document.getElementById('login-password').value;

//   const user = existingUsers.find(user => user.username === username && user.password === password);
//   if (!user) {
//     alert("Username or password is incorrect.");
//     return false;
//   }

//   alert("Login successful!");
//   return true;
// }