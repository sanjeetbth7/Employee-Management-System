import express from "express";
import bodyParser from "body-parser";
import path from "path";
import ejs from "ejs";
import dotenv from "dotenv";
import mysql from "mysql2"


import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { ifError } from "assert";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// Now you can use __dirname in your code


dotenv.config();
const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');
app.set('strict routing', true);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public",{index : " "}));  // When public folder have index.html then in dfault route instead of app.get("/"), It show index.html.  To avoid this i have added {index : " "}



// Create the connection pool. The pool-specific settings are the defaults
// instead of creating connection, here creating pool of connections, so that for each query , did not need to stablish connection
const pool = mysql.createPool({
    host: process.env.dbHOST,
    user: process.env.dbUSER,
    password: process.env.dbPASSWORD,
    database: process.env.dbNAME
}).promise(); // here using promise so we can use async ,instead of clasic callback



let curentUser={
  role:"",
  username:"",
  password:""
}


app.get("/", async (req, res) => {
    try {
        res.sendFile(__dirname+"/index.html");
        
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    } 
});

  
app.get("/admin-dashboard", async (req, res) => {
    try {
      if (curentUser.role==="admin") {
            const results = await pool.query('SELECT * FROM admin WHERE username =?', [curentUser.username]);
            
            // Check if user with provided username exists
            if (results.length > 0) {
              const [user] = results[0];
              if (curentUser.password === user.password) {
                const Department= await pool.query("SELECT * FROM department");
                const Payroll= await pool.query("SELECT * FROM payroll")
                const Employees = await pool.query("SELECT * FROM Employee");
                res.render("admin-dashboard",{user:user,employees:Employees[0],payroll:Payroll[0],department:Department[0]});
              } 
              else {
                res.send('Incorrect password');
              }
            } 
            else {
              res.send('User not found');
            }
        
      } else{
        res.redirect("/login");
      }
        
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).send('Internal Server Error');
    } 
});



app.get("/login", async(req,res)=>{
    try {
        res.render("login");
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

app.get("/logout", (req,res)=>{
  res.redirect("/login");
})


app.post('/login', async (req, res) => {
  try {
    const {role, username, password } = req.body;
    curentUser={role,username,password};
    if (role==="admin") {
          const results = await pool.query('SELECT * FROM admin WHERE username =?', [username]);
          
          // Check if user with provided username exists
          if (results.length > 0) {
            const [user] = results[0];
            if (password === user.password) {
              const Department= await pool.query("SELECT * FROM department");
              const Payroll= await pool.query("SELECT * FROM payroll")
              const Employees = await pool.query("SELECT * FROM Employee");
              res.render("admin-dashboard",{user:user,employees:Employees[0],payroll:Payroll[0],department:Department[0]});
            } 
            else {
              res.send('Incorrect password');
            }
          } 
          else {
            res.send('User not found');
          }
      
    } else {
          // Fetch user from the Employee database
        const results = await pool.query('SELECT * FROM Employee WHERE email =?', [username]);
          
        // Check if user with provided username exists
        if (results.length > 0) {
          const [user] = results[0];
          if (password === user.password) {
            res.render("dashboard",{user:user});
          } 
          else {
            res.send('Incorrect password');
          }
        } 
        else {
          res.send('User not found');
        }
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/addEmployee', (req, res) => {
   const formData=req.body;

  pool.query('INSERT INTO Employee SET ?', formData, (err, results) => {
    if (err) {
      console.log('Error inserting data into the database:', err);
    } else {
      console.log('Data inserted successfully');
    }
  });
  res.redirect("/admin-dashboard");
});

app.post("/logout", (req,res)=>{
  res.redirect("/login");
}) 










// 404 error handling
app.use((req, res, next) => {
    res.status(404).render("404");
});

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`Server started on port ${PORT}`);
});
