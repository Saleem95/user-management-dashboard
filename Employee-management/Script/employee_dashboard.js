document.addEventListener('DOMContentLoaded', function () {
    displayEmployees();

    // Navigation to Add Employee page
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');
    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', function () {
            window.location.href = 'employeeRegister.html';
        });
    }

    // Search functionality
    const searchBtn = document.getElementById('empSearchBtn');
    const searchInput = document.getElementById('empSearchInput');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function () {
            const searchTerm = searchInput.value.toLowerCase();
            displayEmployees(searchTerm);
        });

        searchInput.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.toLowerCase();
                displayEmployees(searchTerm);
            }
        });
    }

    // Function to display employees
    function displayEmployees(searchTerm = '') {
        const employees = JSON.parse(localStorage.getItem('employees')) || [];
        const empTableBody = document.getElementById('empTableBody');
        const paginationInfo = document.getElementById('empPaginationInfo');

        // Filter employees based on search term
        const filteredEmployees = searchTerm
            ? employees.filter(emp =>
                emp.fullName.toLowerCase().includes(searchTerm) ||
                emp.email?.toLowerCase().includes(searchTerm) ||
                emp.id.toLowerCase().includes(searchTerm))
            : employees;

        // Clear existing table rows
        empTableBody.innerHTML = '';

        // Add filtered employees to the table
        filteredEmployees.forEach(emp => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><span><img src="/" alt=""></span>${emp.id}</td>
                <td>${emp.fullName}</td>
                <td>${emp.gender}</td>
                <td>${emp.designation}</td>
                <td>${emp.phone}</td>
                <td><span class="action-icon"><i class="fa-solid fa-pen"></i> <i class="fa-solid fa-trash"></i></span></td>
            `;
            empTableBody.appendChild(row);
        });

        // Update pagination info
        const startIndex = 1;
        const endIndex = filteredEmployees.length;
        const totalEmployees = filteredEmployees.length;
        paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalEmployees} employees`;
        attachUserActions();
    }
        // edit & delete functionality

    function attachUserActions() {
        // const editIcons = document.querySelectorAll('.edit-icon');
        const deleteIcons = document.querySelectorAll('.delete-icon');

        // editIcons.forEach(icon => {
        //     icon.addEventListener('click', function () {
        //         const userId = this.dataset.id;
        //         localStorage.setItem('editUserId', userId);
        //         window.location.href = 'userEdit.html'; // Page where edit form is shown
        //     });
        // });

        deleteIcons.forEach(icon => {
            icon.addEventListener('click', function () {
                const userId = this.dataset.id;
                if (confirm('Are you sure you want to delete this user?')) {
                    let users = JSON.parse(localStorage.getItem('users')) || [];
                    users = users.filter(user => user.id !== userId);
                    localStorage.setItem('users', JSON.stringify(users));
                    displayUsers(); // Refresh table
                }
            });
        });
    }
});
