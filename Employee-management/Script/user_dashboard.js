document.addEventListener('DOMContentLoaded', function () {
    displayUsers();

    const addUserBtn = document.getElementById('addUserBtn');
    if (addUserBtn) {
        addUserBtn.addEventListener('click', function () {
            window.location.href = 'userRegister.html';
        });
    }

    const searchBtn = document.getElementById('searchBtn');
    const searchInput = document.getElementById('searchInput');

    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', function () {
            const searchTerm = searchInput.value.toLowerCase();
            displayUsers(searchTerm);
        });

        searchInput.addEventListener('keyup', function (e) {
            if (e.key === 'Enter') {
                const searchTerm = searchInput.value.toLowerCase();
                displayUsers(searchTerm);
            }
        });
    }

    // Function to display users
    function displayUsers(searchTerm = '') {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userTableBody = document.getElementById('userTableBody');
        const paginationInfo = document.getElementById('paginationInfo');

        const filteredUsers = searchTerm
            ? users.filter(user =>
                user.name.toLowerCase().includes(searchTerm) ||
                user.email.toLowerCase().includes(searchTerm) ||
                user.id.toLowerCase().includes(searchTerm))
            : users;

        userTableBody.innerHTML = '';

        filteredUsers.forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.garmentsType}</td>
                <td>${user.phone}</td>
                <td>
                    <span class="action-icon">
                        <i class="fa-solid fa-pen edit-icon" data-id="${user.id}"></i>
                        <i class="fa-solid fa-trash delete-icon" data-id="${user.id}"></i>
                    </span>
                </td>
            `;
            userTableBody.appendChild(row);
        });

        const startIndex = 1;
        const endIndex = filteredUsers.length;
        const totalUsers = filteredUsers.length;
        paginationInfo.textContent = `Showing ${startIndex}-${endIndex} of ${totalUsers} users`;

        attachUserActions();
    }
        // edit & delete functionality

    function attachUserActions() {
        const editIcons = document.querySelectorAll('.edit-icon');
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
