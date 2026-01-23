       // Login Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('form');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    // Create error message elements
    function createErrorElement(inputElement) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#d4a5a5';
        errorDiv.style.fontSize = '0.85rem';
        errorDiv.style.marginTop = '0.3rem';
        errorDiv.style.display = 'none';
        inputElement.parentElement.appendChild(errorDiv);
        return errorDiv;
    }
    
    const emailError = createErrorElement(emailInput);
    const passwordError = createErrorElement(passwordInput);
    
    // Email validation function
    function validateEmail(email) {
        // Check if email contains @ and .
        const hasAt = email.includes('@');
        const hasDot = email.includes('.');
        const atIndex = email.indexOf('@');
        const dotIndex = email.lastIndexOf('.');
        
        // Make sure @ comes before . and there's text before @, between @ and ., and after .
        if (!hasAt || !hasDot) {
            return 'Email must contain @ and .';
        }
        
        if (atIndex > dotIndex) {
            return 'Invalid email format';
        }
        
        if (atIndex === 0 || dotIndex === email.length - 1) {
            return 'Invalid email format';
        }
        
        if (dotIndex - atIndex <= 1) {
            return 'Invalid email format';
        }
        
        return null; // Valid
    }
    
    // Password validation function
    function validatePassword(password) {
        if (password.length < 8) {
            return 'Password must be at least 8 characters';
        }
        
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter';
        }
        
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter';
        }
        
        if (!hasSpecialChar) {
            return 'Password must contain at least one special character';
        }
        
        return null; // Valid
    }
    
    // Show error message
    function showError(errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        errorElement.previousElementSibling.style.borderColor = '#d4a5a5';
    }
    
    // Hide error message
    function hideError(errorElement) {
        errorElement.style.display = 'none';
        errorElement.previousElementSibling.style.borderColor = '#e8d5c4';
    }
    
    // Real-time validation
    emailInput.addEventListener('blur', function() {
        const error = validateEmail(this.value);
        if (error) {
            showError(emailError, error);
        } else {
            hideError(emailError);
        }
    });
    
    passwordInput.addEventListener('blur', function() {
        const error = validatePassword(this.value);
        if (error) {
            showError(passwordError, error);
        } else {
            hideError(passwordError);
        }
    });
    
    // Clear error on input
    emailInput.addEventListener('input', function() {
        if (emailError.style.display === 'block') {
            hideError(emailError);
        }
    });
    
    passwordInput.addEventListener('input', function() {
        if (passwordError.style.display === 'block') {
            hideError(passwordError);
        }
    });
    
    // Form submission validation
    loginForm.addEventListener('submit', function(e) {
        const emailValidationError = validateEmail(emailInput.value);
        const passwordValidationError = validatePassword(passwordInput.value);
        
        let hasErrors = false;
        
        if (emailValidationError) {
            showError(emailError, emailValidationError);
            hasErrors = true;
        }
        
        if (passwordValidationError) {
            showError(passwordError, passwordValidationError);
            hasErrors = true;
        }
        
        if (hasErrors) {
            e.preventDefault(); // Prevent form submission
        }
    });
});
