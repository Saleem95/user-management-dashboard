document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('userRegistrationForm');
    const verifyEmailBtn = document.getElementById('verifyEmailBtn');
    const verifyMobileBtn = document.getElementById('verifyMobileBtn');
    const createAccountBtn = document.getElementById('createAccountBtn');

    let emailVerified = false;
    let mobileVerified = false;

    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    // Email verification
    verifyEmailBtn.addEventListener('click', function () {
        const email = document.getElementById('email').value;

        if (!email || !validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Simulate sending OTP
        const otp = generateOTP();
        console.log(`OTP for ${email}: ${otp}`);

        document.getElementById('emailOtpContainer').classList.remove('hidden');
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
            verifyEmailBtn.classList.add('verified');
            document.getElementById('emailOtpContainer').classList.add('hidden');
            checkVerificationStatus();
        } else {
            alert('Invalid OTP. Please try again.');
        }
    });

    // Mobile verification
    verifyMobileBtn.addEventListener('click', function () {
        const mobile = document.getElementById('phone').value;

        if (!mobile || !validateMobile(mobile)) {
            alert('Please enter a valid mobile number');
            return;
        }

        // Simulate sending OTP
        const otp = generateOTP();
        console.log(`OTP for ${mobile}: ${otp}`);

        document.getElementById('mobileOtpContainer').classList.remove('hidden');
        verifyMobileBtn.textContent = 'Sending...';

        // Simulate network delay
        setTimeout(() => {
            verifyMobileBtn.textContent = 'Verify Phone';
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
            verifyMobileBtn.classList.add('verified');
            document.getElementById('mobileOtpContainer').classList.add('hidden');
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

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        // Create new user object
        const newUser = {
            id: 'USR' + (Math.floor(Math.random() * 900) + 100).toString(),
            name: document.getElementById('firstName').value + ' ' + document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            garmentsType: document.getElementById('garmentsType').value,
            phone: document.getElementById('phone').value,
            shopName: document.getElementById('shopName').value,
            shopAddress: document.getElementById('shopAddress').value
        };

        // Add to localStorage
        const users = JSON.parse(localStorage.getItem('users'));
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        alert('User account created successfully!');
        window.location.href = 'employeeDashboard.html';
    });

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