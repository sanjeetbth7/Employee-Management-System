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
const personalDetails = body.querySelector(".personal-details");
const attendance = body.querySelector(".attendance");
const task = body.querySelector(".task");


function showSectionDetails(sectionClass) {
    const selectedValue = sectionClass;

    // Hide all admin cards
    dashboard.style.display = "none";
    personalDetails.style.display = "none";
    attendance.style.display = "none";
    task.style.display = "none";

    // Show the selected admin card
    const selectedCard = document.querySelector(`.${selectedValue}`);
    selectedCard.style.display = "";
}


// Initialize with default admin
showSectionDetails('dashboard');






