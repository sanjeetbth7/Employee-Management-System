const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");
let getMode = localStorage.getItem("mode");



if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}
let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}
modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});
sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})




/* Toggle admin pannel */

const dashboard = body.querySelector(".dashboard");
const department = body.querySelector(".department");
const employee_details = body.querySelector(".employee_details");
const payroll = body.querySelector(".payroll");
const addEmployee = body.querySelector(".addEmployee");


function showSectionDetails(sectionClass) {
    const selectedValue = sectionClass;

    // Hide all admin cards
    dashboard.style.display = "none";
    department.style.display = "none";
    employee_details.style.display = "none";
    payroll.style.display = "none";
    addEmployee.style.display = "none";

    // Show the selected admin card
    const selectedCard = document.querySelector(`.${selectedValue}`);
    selectedCard.style.display = "";
}


// Initialize with default admin
showSectionDetails('dashboard');


/* Submit add employee from */
const addEmployeeForm = document.querySelector("#addEmployeeForm")
// function submitForm() {
    
//     const formData = new FormData(addEmployeeForm);

//     console.log(formData);
//     // Convert FormData to a regular object
//     const formObject = {};
//     formData.forEach((value, key) => {
//         formObject[key] = value;
//     });

//     console.log(formObject);
//     fetch('/addEmployee', {
//         method: 'POST',
//         body: formObject,
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

//     console.log(formObject);
//     addEmployeeForm.reset();
// }



