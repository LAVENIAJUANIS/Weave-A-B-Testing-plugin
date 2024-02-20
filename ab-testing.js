function toggleCTADropdown() {
    var ctaCheckbox = document.getElementById('goal-cta');
    var ctaDropdown = document.getElementById('cta-dropdown');

    if (ctaCheckbox.checked) {
        ctaDropdown.style.display = 'block';
        populateCTAOptions();
    } else {
        ctaDropdown.style.display = 'none';
    }
}

function populateCTAOptions() {
    var ctaSelect = document.getElementById('cta-select');
    ctaSelect.innerHTML = ''; 

    var ctaButtons = document.querySelectorAll('.cta-buttonn');

    ctaButtons.forEach(function(button, index) {
        var option = document.createElement('option');
        option.value = 'button' + (index + 1); 
        option.textContent = 'Button'+ (index + 1);
        ctaSelect.appendChild(option);
    });
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

// for title
function toggleTargetElements() {
    var titleCheckbox = document.getElementById('element-title');
    var titleVariationInput = document.getElementById('title-variation-input');
    var titleButtons = document.getElementById('title-buttons');
    var titleVariations = document.getElementById('title-variations');

    if (titleCheckbox.checked) {
        titleVariationInput.style.display = 'block';
        titleButtons.style.display = 'block';
        titleVariations.style.display = 'block';
    } else {
        titleVariationInput.style.display = 'none';
        titleButtons.style.display = 'none';
        titleVariations.style.display = 'none';
    }
}

function editElement(elementId) {
    console.log('Edit action for element', elementId);
}

function previewElement(elementId) {
    console.log('Preview action for element:', elementId);
}

function addVariation(elementId) {
    console.log('Add variation action for element:', elementId);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.action-button').forEach(function(button) {
        button.addEventListener('click', function() {
            var action = this.getAttribute('data-action');
            var elementId = this.getAttribute('data-element-id');
            if (action && elementId) {
                window[action](elementId);
            }
        });
    });
});

// Preview

function previewElement(elementId) {
    var selectedContentId = document.getElementById('content-select').value;
    var titleVariation = document.getElementById('title-variation').value;
    var previewSection = document.getElementById('preview-section');

    if (previewSection) {
        previewSection.innerHTML = '<h3>Preview:<h3><p>Title:' + titleVariation + '</p>';
    }

}

document.addEventListener('DOMContentLoaded', function() {
    var previewButton = document.getElementById('preview-button');
    if(previewButton) {
        previewButton.addEventListener('click', function() {
            previewElement('title');
        });
    }
});



