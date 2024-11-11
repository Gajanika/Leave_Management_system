document.getElementById('loginForm').addEventListener('submit', async function (event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        // Fetch user data with embedded employee data
        const response = await fetch(`http://localhost:3000/users?username=${username}&password=${password}&_embed=employee`);
        const users = await response.json();

        if (users.length > 0) {
            const user = users[0];
            const employee = user.employee;

            if (employee) {
                // Store the logged-in user and employee details
                const loggedInUser = {
                    username: user.username,
                    employeeId: employee.employeeId,
                    firstName: employee.firstName,
                    lastName: employee.lastName,
                    role: user.role
                };
                
                localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
                alert('Login successful!');

                // Redirect based on user role
                if (user.role === 'Employee') {
                    window.location.href = 'leaveRequest.html';
                } else if (['Admin', 'Manager','Director'].includes(user.role)) {
                    window.location.href = 'managerLeaveManagement.html';
                }
            } else {
                alert('Employee data not found.');
            }
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while logging in.');
    }
});
