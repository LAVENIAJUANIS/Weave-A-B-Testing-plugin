function toggleTargetElements() {
    toggleElementDisplay('element-title', 'title-variation-input', 'title-buttons', 'title-variations');
    toggleElementDisplay('element-description', 'description-variation-input', 'description-buttons', 'description-variations');
    toggleElementDisplay('element-image', 'image-variation-input', 'image-buttons', 'image-variations');
    toggleElementDisplay('element-layout', 'layout-variation-input', 'layout-buttons', 'layout-variations');
}

function toggleElementDisplay(checkboxId, variationInputId, buttonsId, variationsId) {
    var checkbox = document.getElementById(checkboxId);
    var variationInput = document.getElementById(variationInputId);
    var buttons = document.getElementById(buttonsId);
    var variations = document.getElementById(variationsId);

    if (checkbox.checked) {
        variationInput.style.display = 'block';
        buttons.style.display = 'block';
        variations.style.display = 'block';
    } else {
        variationInput.style.display = 'none';
        buttons.style.display = 'none';
        variations.style.display = 'none';
    }

    if (checkboxId === 'element-image') {
        // Call image preview function
        previewImage();
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

// Edit element function
function editElement(elementId) {
    console.log('Edit action for element', elementId);
}

// Add variation function
function addVariation(elementId) {
    console.log('Add variation action for element:', elementId);
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
            window['preview' + id + 'Element'](); // Corrected the template literal to concatenate strings
        });
    });

    var layoutCheckbox = document.getElementById('element-layout');
    layoutCheckbox.addEventListener('change', function() {
        toggleElementDisplay(layoutCheckbox.id, 'variation-input-' + layoutCheckbox.id, 'buttons-' + layoutCheckbox.id, 'variations-' + layoutCheckbox.id);
    });

});
