// Show the button when the user scrolls down 100px from the top
window.onscroll = function() {
    const backToTopButton = document.getElementById("backToTop");
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
};

// Scroll to the top when the button is clicked
document.getElementById("backToTop").onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Theme toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('themeToggle');
    const currentTheme = localStorage.getItem('theme') || 'light-mode';

    document.body.classList.add(currentTheme);

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');

        const newTheme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
        localStorage.setItem('theme', newTheme);
    });

    // Scroll animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            } 
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        observer.observe(section);
    });

    // Email validation function
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    const validate = () => {
        const $result = $('#emailValidationResult');
        const email = $('#email').val();
        $result.text('');

        if (validateEmail(email)) {
            $result.text(email + ' is valid.'); 
            $result.css('color', 'green');
        } else {
            $result.text(email + ' is invalid.');
            $result.css('color', 'red');
        }
        return false;
    };

    // Validate email on input
    $('#email').on('input', validate);

    // Form submission notification
    document.getElementById('contactForm').addEventListener('submit', function() {
        const formNotification = document.getElementById('formNotification');
        formNotification.classList.add('show');
        setTimeout(() => {
            formNotification.classList.remove('show');
        }, 2000);
    });

    document.getElementById('emailIcon').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the default anchor behavior
        const email = 'lakindud@yahoo.com'; // Email to copy
        navigator.clipboard.writeText(email).then(() => {
            // Show the notification
            const notification = document.getElementById('notification');
            notification.style.display = 'block'; // Show the notification
            notification.textContent = 'Email copied to clipboard!'; // Set the notification text

            // Hide the notification after 3 seconds
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    });
});
