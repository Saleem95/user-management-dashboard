document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('employeeRegistrationForm');
    const verifyMobileBtn = document.getElementById('verifyEmpMobileBtn');
    const createAccountBtn = document.getElementById('createEmpAccountBtn');

    let mobileVerified = false;

    if (!localStorage.getItem('employees')) {
        localStorage.setItem('employees', JSON.stringify([]));
    }

    // Mobile verification
    verifyMobileBtn.addEventListener('click', function () {
        const mobile = document.getElementById('empPhone').value;

        if (!mobile || !validateMobile(mobile)) {
            alert('Please enter a valid mobile number');
            return;
        }

        // Simulate sending OTP
        const otp = generateOTP();
        console.log(`OTP for ${mobile}: ${otp}`);

        document.getElementById('empMobileOtpContainer').classList.remove('hidden');
        verifyMobileBtn.textContent = 'Sending...';

        // Simulate network delay
        setTimeout(() => {
            verifyMobileBtn.textContent = 'Verify Phone';
            sessionStorage.setItem('empMobileOTP', otp);
            alert(`OTP sent to ${mobile}`);
        }, 1500);
    });

    document.getElementById('submitEmpMobileOtpBtn').addEventListener('click', function () {
        const enteredOtp = document.getElementById('empMobileOtp').value;
        const correctOtp = sessionStorage.getItem('empMobileOTP');

        if (enteredOtp === correctOtp) {
            mobileVerified = true;
            verifyMobileBtn.textContent = 'Verified';
            verifyMobileBtn.classList.add('verified');
            document.getElementById('empMobileOtpContainer').classList.add('hidden');
            createAccountBtn.disabled = false;
        } else {
            alert('Invalid OTP. Please try again.');
        }
    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const password = document.getElementById('empPassword').value;
        const confirmPassword = document.getElementById('empConfirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }
        // Create new employee object
        const newEmployee = {
            id: 'EMP' + (Math.floor(Math.random() * 900) + 100).toString(),
            fullName: document.getElementById('empFirstName').value + ' ' + document.getElementById('empLastName').value,
            gender: document.getElementById('empGender').value,
            designation: document.getElementById('empDesignation').value,
            phone: document.getElementById('empPhone').value,
            dob: document.getElementById('empDob').value,
            joinDate: document.getElementById('empJoinDate').value,
            salary: document.getElementById('empSalary').value,
            altPhone: document.getElementById('empAltPhone').value
        };

        // Add to localStorage
        const employees = JSON.parse(localStorage.getItem('employees'));
        employees.push(newEmployee);
        localStorage.setItem('employees', JSON.stringify(employees));

        alert('Employee account created successfully!');
        window.location.href = 'employeeDashboard.html';
    });

    // Helper functions
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function validateMobile(mobile) {
        return /^\d{10,}$/.test(mobile);
    }
});