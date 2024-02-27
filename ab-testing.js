function toggleCTADropdown() {
    var ctaDropdown = document.getElementById('cta-dropdown');
    ctaDropdown.style.display = document.getElementById('goal-cta').checked ? 'block' : 'none';
}

function toggleInquiryDropdown() {
    var inquiryDropdown = document.getElementById('inquiry-dropdown');
    inquiryDropdown.style.display = document.getElementById('goal-inquiry').checked ? 'block' : 'none';
}



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
}

function previewTitleElement() {
    var titleVariation = document.getElementById('title-variation').value;
    var previewTitleSection = document.getElementById('preview-title-section');

    if (previewTitleSection) {
        previewTitleSection.innerHTML = '<h3>Preview:</h3><p>Title: ' + titleVariation + '</p>';
    }
}

function previewDescriptionElement() {
    var descriptionVariation = document.getElementById('description-variation').value;
    var previewDescriptionSection = document.getElementById('preview-description-section');

    if (previewDescriptionSection) {
        previewDescriptionSection.innerHTML = '<h3>Preview:</h3><p>Description: ' + descriptionVariation + '</p>';
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


    var contentSelect = document.getElementById('content-select');
    contentSelect.addEventListener('change', function() {
        updatePreview();
    });

    var previewButtons = document.querySelectorAll('.preview-button');
    previewButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault();

            var id = button.getAttribute('data-preview-id');
            if (id === 'title') {
                previewTitleElement(); // Call previewTitleElement function for title preview
            } else if (id === 'description') {
                previewDescriptionElement(); // Call previewDescriptionElement function for description preview
            } else if (id === 'image') {
                previewImage();
            } else if (id === 'layout') {
                previewLayout();
            } else {
                window['preview' + id + 'Element'](); // For other elements
            }
                
        });
    });

    var layoutCheckbox = document.getElementById('element-layout');
    layoutCheckbox.addEventListener('change', function() {
        toggleElementDisplay(layoutCheckbox.id, 'variation-input-' + layoutCheckbox.id, 'buttons-' + layoutCheckbox.id, 'variations-' + layoutCheckbox.id);
    });

    

});
