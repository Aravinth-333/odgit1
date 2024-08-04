const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { Script } = require('vm');
const port = 3085;
const app = express();

//passing css file into html
app.use(express.static(__dirname));//to export css
app.use(express.urlencoded({ extended: true }));
//connecting with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/login1')
    const db = mongoose.connection;
    db.once('open', () => {
      console.log('MongoDB connection successfully established');
    });


//creating schema for the loginpage with name in html
const userSchema = new mongoose.Schema({
  Username:String,
  Email:String,
  Password:String
});
//creating model for the defined schema with collection name
const Users = mongoose.model('Users', userSchema); // Corrected the model name and schema
 //sending html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'login1.html'));
});
// Function to validate email
function validateEmail(email) {
  // Modified email validation regex
  const re = /^\d{9}@rajalakshmi\.edu\.in$/;
  return re.test(String(email).toLowerCase());
}


// Function to validate password
function validatePassword(password) {
  // Modified password validation regex
  const re = /^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;
  return re.test(String(password));
}


// Function to validate username
function validateUsername(username) {
  // Modified username validation regex to allow any length and more than one special character
  const re = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
  return re.test(String(username));
}


app.post('/post', async (req, res) => {
  const { Username,Email,Password } = req.body;

  
  // Validate input
let errorMessage = '';


// Check username validation
if (!validateUsername(Username)) {
  errorMessage += ':)Username must include at least one uppercase letter and one special character.\\n';
}

// Check email validation
if (!validateEmail(Email)) {
  errorMessage += ':)Invalid email format.\\n';
}

// Check password validation
if (!validatePassword(Password)) {
  errorMessage += ':)Password must be at least 8 characters long, include at least one uppercase letter, and more than one special character.\\n';
}



// If there are any validation errors, alert the user
if (errorMessage) {
  return res.send(`
    <script>
      alert('${errorMessage}');
      window.location.href = '/login1.html';
    </script>
  `);
}



   
 // Check if the user already exists
 const existingUser = await Users.findOne({ Username });
 if (existingUser) {
   return res.send(`<script>alert('Username already taken'); window.location='/login1.html';</script>`);
 }

 const existingUserByEmail = await Users.findOne({ Email });
if (existingUserByEmail) {
  const registeredUsername = existingUserByEmail.Username;
  return res.send(`
    <script>
      alert('Email already registered with username: ${registeredUsername}. You can directly login.');
      window.location.href = '/login1.html';
    </script>
  `);
}
 

  const user = new Users({
    Username,
    Email,
    Password
  });
  await user.save();
  console.log(user);
  return res.sendFile(path.join(__dirname, 'success.html'));

});

// Login endpoint
app.post('/login', async (req, res) => {
  const { Username, Password } = req.body;

  // Find the user by username
  const user = await Users.findOne({ Username });
  console.log('User found:', user); // Debugging statement

  if (!user) {
    // Username does not exist
    return res.send(`
      <script>
        alert('Username does not exist. You need to sign up first.');
        window.location.href = '/login1.html';
      </script>
    `);
  }
  console.log('Password entered:', Password); // Debugging statement
  console.log('Password in DB:', user.Password); // Debugging statement
  if (user.Password !== Password) {
    // Password is incorrect
    return res.send(`
      <script>
        alert('Username is correct but the password is incorrect.');
        window.location.href = '/login1.html';
      </script>
    `);
  }

  // Successful login
  return res.send(`
    <script>
      alert('Login successful');
      window.location.href = '/gemini.html';
    </script>
  `);
});


//listening to which port it has been runnning
app.listen(port, () => {
  console.log(`Server connected on port ${port}`);
});




// const express = require('express');
// const mongoose = require('mongoose');
// const path = require('path');
// const port = 3080;
// const app = express();

// // Passing CSS file into HTML
// app.use(express.static(__dirname)); // to export css
// app.use(express.urlencoded({ extended: true }));

// // Connecting with MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/login1');
// const db = mongoose.connection;
// db.once('open', () => {
//   console.log('MongoDB connection successfully established');
// });

// // Creating schema for the login page with names in HTML
// const userSchema = new mongoose.Schema({
//   Username: String,
//   Email: String,
//   Password: String
// });

// // Creating model for the defined schema with collection name
// const Users = mongoose.model('Users', userSchema);

// // Sending HTML file
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'login1.html'));
// });

// // Function to validate email
// function validateEmail(email) {
//   // Modified email validation regex
//   const re = /^\d{9}@rajalakshmi\.edu\.in$/;
//   return re.test(String(email).toLowerCase());
// }

// // Function to validate password
// function validatePassword(password) {
//   // Modified password validation regex
//   const re = /^(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;
//   return re.test(String(password));
// }

// // Function to validate username
// function validateUsername(username) {
//   // Modified username validation regex to allow any length and more than one special character
//   const re = /^(?=.*[A-Z])(?=.*[\W_]).+$/;
//   return re.test(String(username));
// }

// app.post('/post', async (req, res) => {
//   const { Username, Email, Password } = req.body;

//   // Validate input
//   let errorMessage = '';

//   if (!validateEmail(Email)) {
//     errorMessage += 'Invalid email format.\n';
//   }
//   if (!validatePassword(Password)) {
//     errorMessage += 'Password must be at least 8 characters long, include at least one uppercase letter, and more than one special character.\n';
//   }
//   if (!validateUsername(Username)) {
//     errorMessage += 'Username must include at least one uppercase letter and one special character.\n';
//   }

//   if (errorMessage) {
//     return res.send(`<script>alert('${errorMessage}'); window.location='/login1.html';</script>`);
//   }

//   // Check if the user already exists
//   const existingUser = await Users.findOne({ Username });
//   if (existingUser) {
//     return res.send(`<script>alert('Username already taken'); window.location='/login1.html';</script>`);
//   }

//   const user = new Users({
//     Username,
//     Email,
//     Password
//   });
//   await user.save();
//   console.log(user);
//   res.send('Form submission successful');
// });

// // Listening to which port it has been running
// app.listen(port, () => {
//   console.log(`Server connected on port ${port}`);
// });

