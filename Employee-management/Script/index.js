document.addEventListener('DOMContentLoaded', function () {
    // Navigation between pages
    const addUserBtn = document.getElementById('addUserBtn');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');

    if (addUserBtn) {
        addUserBtn.addEventListener('click', function () {
            window.location.href = 'userRegister.html';
        });
    }

    if (addEmployeeBtn) {
        addEmployeeBtn.addEventListener('click', function () {
            window.location.href = 'employeeRegister.html';
        });
    }

    // User Registration Page
    const userRegistrationForm = document.getElementById('userRegistrationForm');
    if (userRegistrationForm) {
        const verifyEmailBtn = document.getElementById('verifyEmailBtn');
        const verifyMobileBtn = document.getElementById('verifyMobileBtn');
        const emailOtpContainer = document.getElementById('emailOtpContainer');
        const mobileOtpContainer = document.getElementById('mobileOtpContainer');
        const createAccountBtn = document.getElementById('createAccountBtn');

        let emailVerified = false;
        let mobileVerified = false;

        verifyEmailBtn.addEventListener('click', function () {
            const email = document.getElementById('email').value;

            if (!email || !validateEmail(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Simulate sending OTP
            const otp = generateOTP();
            console.log(`OTP for ${email}: ${otp}`);

            emailOtpContainer.classList.remove('hidden');
            verifyEmailBtn.textContent = 'Sending...';

            // Simulate network delay
            setTimeout(() => {
                verifyEmailBtn.textContent = 'Verify Email';
                sessionStorage.setItem('emailOTP', otp);
                alert(`OTP sent to ${email}`);
            }, 1500);
        });

        document.getElementById('submitEmailOtpBtn').addEventListener('click', function () {
            const enteredOtp = document.getElementById('emailOtp').value;
            const correctOtp = sessionStorage.getItem('emailOTP');

            if (enteredOtp === correctOtp) {
                emailVerified = true;
                verifyEmailBtn.textContent = 'Verified';
                verifyEmailBtn.style.backgroundColor = 'var(--success-color)';
                emailOtpContainer.classList.add('hidden');
                checkVerificationStatus();
            } else {
                alert('Invalid OTP. Please try again.');
            }
        });

        verifyMobileBtn.addEventListener('click', function () {
            const mobile = document.getElementById('mobile').value;

            if (!mobile || !validateMobile(mobile)) {
                alert('Please enter a valid mobile number');
                return;
            }

            // Simulate sending OTP
            const otp = generateOTP();
            console.log(`OTP for ${mobile}: ${otp}`);

            mobileOtpContainer.classList.remove('hidden');
            verifyMobileBtn.textContent = 'Sending...';

            // Simulate network delay
            setTimeout(() => {
                verifyMobileBtn.textContent = 'Verify Mobile';
                sessionStorage.setItem('mobileOTP', otp);
                alert(`OTP sent to ${mobile}`);
            }, 1500);
        });

        document.getElementById('submitMobileOtpBtn').addEventListener('click', function () {
            const enteredOtp = document.getElementById('mobileOtp').value;
            const correctOtp = sessionStorage.getItem('mobileOTP');

            if (enteredOtp === correctOtp) {
                mobileVerified = true;
                verifyMobileBtn.textContent = 'Verified';
                verifyMobileBtn.style.backgroundColor = 'var(--success-color)';
                mobileOtpContainer.classList.add('hidden');
                checkVerificationStatus();
            } else {
                alert('Invalid OTP. Please try again.');
            }
        });

        function checkVerificationStatus() {
            if (emailVerified && mobileVerified) {
                createAccountBtn.disabled = false;
            }
        }

        userRegistrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;

            if (password !== confirmPassword) {
                alert('Passwords do not match');
                return;
            }

            alert('User account created successfully!');
            window.location.href = 'employeeDashboard.html';
        });
    }

    // Employee Registration Page
    const employeeRegistrationForm = document.getElementById('employeeRegistrationForm');
    if (employeeRegistrationForm) {
        const verifyEmpMobileBtn = document.getElementById('verifyEmpMobileBtn');
        const empMobileOtpContainer = document.getElementById('empMobileOtpContainer');
        const createEmpAccountBtn = document.getElementById('createEmpAccountBtn');

        let mobileVerified = false;

        verifyEmpMobileBtn.addEventListener('click', function () {
            const mobile = document.getElementById('empMobile').value;

            if (!mobile || !validateMobile(mobile)) {
                alert('Please enter a valid mobile number');
                return;
            }

            // Simulate sending OTP
            const otp = generateOTP();
            console.log(`OTP for ${mobile}: ${otp}`);

            empMobileOtpContainer.classList.remove('hidden');
            verifyEmpMobileBtn.textContent = 'Sending...';

            // Simulate network delay
            setTimeout(() => {
                verifyEmpMobileBtn.textContent = 'Verify Mobile';
                sessionStorage.setItem('empMobileOTP', otp);
                alert(`OTP sent to ${mobile}`);
            }, 1500);
        });

        document.getElementById('submitEmpMobileOtpBtn').addEventListener('click', function () {
            const enteredOtp = document.getElementById('empMobileOtp').value;
            const correctOtp = sessionStorage.getItem('empMobileOTP');

            if (enteredOtp === correctOtp) {
                mobileVerified = true;
                verifyEmpMobileBtn.textContent = 'Verified';
                verifyEmpMobileBtn.style.backgroundColor = 'var(--success-color)';
                empMobileOtpContainer.classList.add('hidden');
                createEmpAccountBtn.disabled = false;
            } else {
                alert('Invalid OTP. Please try again.');
            }
        });

        employeeRegistrationForm.addEventListener('submit', function (e) {
            e.preventDefault();

            alert('Employee account created successfully!');
            window.location.href = 'employeeDashboard.html';
        });
    }

    // Helper functions
    function generateOTP() {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validateMobile(mobile) {
        return /^\d{10,}$/.test(mobile);
    }
});