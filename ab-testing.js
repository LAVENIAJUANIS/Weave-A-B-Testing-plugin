function toggleCTADropdown() {
    var ctaCheckbox = document.getElementById('goal-cta');
    var ctaDropdown = document.getElementById('cta-dropdown');

    if (ctaCheckbox.checked) {
        ctaDropdown.style.display = 'block';
    } else {
        ctaDropdown.style.display = 'none';
    }
}

function toggleInquiryDropdown() {
    var inquiryCheckbox = document.getElementById('goal-inquiry');
    var inquiryDropdown = document.getElementById('inquiry-dropdown');

    if (inquiryCheckbox.checked) {
        inquiryDropdown.style.display = 'block';
    
    } else {
        inquiryDropdown.style.display = 'none';
    }
}

// Function to track button clicks

function trackButtonClick(buttonId) {
    if (!localStorage.getItem(buttonId)) {
        localStorage.setItem(buttonId, 1);
    } else {
        let clicks = parseInt(localStorage.getItem(buttonId));
        localStorage.setItem(buttonId, clicks + 1);
    }
}

// Add event listeners to all buttons with class "tracked-btton"
let buttons = document.querySelectorAll('.tracked-button');
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        let buttonId = this.id;
        trackButtonClick(buttonId);
    });

});


// Calculate CTR for all tracked buttons
function calculateCTR(buttonId) {
    let totalClicks = parseInt(localStorage.getItem(buttonId)) || 0;
    let totalVisitors = parseInt(localStorage.getItem('totalVisitors')) || 0;

    if (totalVisitors === 0) {
        return 0; // Avoid divison by zero
    }

    return (totalClicks / totalVisitors) * 100;
    
}

buttons.forEach(function(button) {
    let buttonId = button.id;
    let ctr = calculateCTR(buttonId);

    console.log('CTR for' + buttonId + ':', ctr + '%');

});


// Function to track form submissions
function trackFormSubmission(formId) {
    if (!localStorage.getItem(formId)) {
        localStorage.setItem(formId, 1);
    } else {
        let submissions = parseInt(localStorage.getItem(formId));
        localStorage.setItem(formId, submissions + 1);
    }


}


document.addEventListener('submit', function(event) {
    if (event.target.tagName.toLowerCase() === 'form') {
        var form = event.target;
        var formId = form.id; // Assuming each form has an ID attribute
        trackFormSubmission(formId);
    }
}, false);




