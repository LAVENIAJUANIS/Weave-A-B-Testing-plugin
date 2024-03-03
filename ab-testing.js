function toggleCTADropdown() {
    var ctaDropdown = document.getElementById('cta-dropdown');
    ctaDropdown.style.display = document.getElementById('goal-cta').checked ? 'block' : 'none';
}

function toggleInquiryDropdown() {
    var inquiryDropdown = document.getElementById('inquiry-dropdown');
    inquiryDropdown.style.display = document.getElementById('goal-inquiry').checked ? 'block' : 'none';
}

function toggleTargetElements() {
    toggleElementDisplay('element-title', 'title-variation-input', 'save-title-button');
    toggleElementDisplay('element-description', 'description-variation-input');
    toggleElementDisplay('element-image', 'image-variation-input');
    toggleElementDisplay('element-layout', 'layout-variation-input');
}

function toggleElementDisplay(checkboxId, variationInputId, saveButtonId) {
    var checkbox = document.getElementById(checkboxId);
    var variationInput = document.getElementById(variationInputId);
    var saveButton = document.getElementById(saveButtonId);

    if (checkbox.checked) {
        variationInput.style.display = 'block';
        if (saveButton) {
            saveButton.style.display = 'inline-block';
        }
    } else {
        variationInput.style.display = 'none';
        if (saveButton) {
            saveButton.style.display = 'none';
        }
    }

    if (checkboxId === 'element-image') {
        // Call image preview function
        previewImage();
    }
}

function toggleTestDuration() {
    var durationOptions = document.getElementById('duration_options');
    if (durationOptions.style.display === 'none') {
        durationOptions.style.display = 'block';
    } else {
        durationOptions.style.display = 'none';
    }
}

function saveVariation(elementId) {
    var variationInput = document.getElementById(elementId + '-variation');
    var savedVariations = document.getElementById('saved-' + elementId + 's');

    if (variationInput.value.trim() !== '') {
        var savedVariation = document.createElement('div');
        savedVariation.textContent = variationInput.value;
        savedVariations.appendChild(savedVariation);
        variationInput.value = ''; // Clear input field after saving
    } else {
        alert('Please enter a variation before saving.');
    }
}

function previewImage() {
    var input = document.getElementById('image-variation');
    var preview = document.getElementById('preview-image-section');

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            preview.innerHTML = `<h3>Image Preview:</h3><img src="${e.target.result}" alt="Uploaded Image" style="max-width: 100%;">`;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function addVariation(elementId) {
    var variationInput = document.getElementById(elementId + '-variation');
    var variationsContainer = document.getElementById(elementId + '-variations');

    if (variationInput.value.trim() !== '') {
        var savedVariation = document.createElement('div');
        savedVariation.textContent = variationInput.value;
        variationsContainer.appendChild(savedVariation);
        variationInput.value = ''; // Clear input field after saving
    } else {
        alert('Please enter a variation before saving.');
    }
}

function previewDescriptionElement() {
    var descriptionVariation = document.getElementById('description-variation').value;
    var previewDescriptionSection = document.getElementById('preview-description-section');

    if (previewDescriptionSection) {
        previewDescriptionSection.innerHTML = '<h3>Preview:</h3><p>Description: ' + descriptionVariation + '</p>';
    }
}

function previewTitleElement() {
    var titleVariation = document.getElementById('title-variation').value;
    var previewTitleSection = document.getElementById('preview-title-section');

    if (previewTitleSection) {
        previewTitleSection.innerHTML = '<h3>Preview:</h3><p>Title: ' + titleVariation + '</p>';
    }
}


function editVariation(elementId, variationId) {
    // Get the variation element by ID
    var variationElement = document.getElementById(variationId);
    
    // Create an input field to allow editing
    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = variationElement.textContent;

    // Replace the variation element with the input field
    variationElement.parentNode.replaceChild(inputField, variationElement);

    // Add event listener to save changes when input field loses focus
    inputField.addEventListener('blur', function() {
        variationElement.textContent = inputField.value;
        // You may want to save the changes to the server here
    });
}

function previewVariation(elementId, variationId) {
    // Get the variation element by ID
    var variationElement = document.getElementById(variationId);
    
    // Display the variation content for preview
    alert(variationElement.textContent); // Replace alert with your preferred preview method
}

document.addEventListener('DOMContentLoaded', function() {
    var checkboxes = [
        document.getElementById('element-title'),
        document.getElementById('element-description'),
        document.getElementById('element-image'),
        document.getElementById('element-layout')
    ];

    checkboxes.forEach(function(checkbox) {
        checkbox.addEventListener('change', toggleTargetElements);
    });

    var previewButtons = document.querySelectorAll('.preview-button');
    previewButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            var id = button.getAttribute('data-preview-id');
            window['preview' + id.charAt(0).toUpperCase() + id.slice(1) + 'Element'](); // Corrected the template literal to concatenate strings
        });
    });

    var addVariationButtons = document.querySelectorAll('[data-action="addVariation"]');
    addVariationButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var elementId = button.getAttribute('data-element-id');
            saveVariation(elementId); // Call saveVariation instead of addVariation
        });
    });

    var layoutCheckbox = document.getElementById('element-layout');
    layoutCheckbox.addEventListener('change', function() {
        toggleElementDisplay(layoutCheckbox.id, 'variation-input-' + layoutCheckbox.id, 'save-' + layoutCheckbox.id);
    });

    var saveButton = document.getElementById('save-title-button');
    saveButton.addEventListener('click', function() {
        saveVariation('title');
    });

    var editButtons = document.querySelectorAll('.edit-button');
    editButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var variationId = button.getAttribute('data-variation-id');
            editVariation('title', variationId);
        });
    });

    var previewButtons = document.querySelectorAll('.preview-button');
    previewButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            var variationId = button.getAttribute('data-variation-id');
            previewVariation('title', variationId);
        });
    });

    
    var selectDurationBtn = document.getElementById('select_duration_btn');
    selectDurationBtn.addEventListener('click', toggleTestDuration);

    
    var durationOptions = document.querySelectorAll('input[name="test_duration"]');
    durationOptions.forEach(function(option) {
        option.addEventListener('change', function() {
            // Store the selected test duration value
            var selectedDuration = option.value;
            console.log('Selected test duration:', selectedDuration);
            // You can perform further actions based on the selected duration
        });
    });

});
