
document.addEventListener('DOMContentLoaded', function () {
    var ctx = document.getElementById('attendanceChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Attendance',
                data: [15, 18, 20, 23, 22, 19, 16, 20, 22, 21, 17, 15], // Adjusted values in the range of 0 to 25
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 28 // Set the maximum value for the y-axis
                }
            }
        }
    });
});
