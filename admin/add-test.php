<?php

add_action('admin_menu', 'ab_testify_add_test_page');

function ab_testify_add_test_page() {
    add_submenu_page('ab-testify-dashboard', 'Add Test', 'Add Test', 'manage_options', 'ab-testify-add-test', 'ab_testify_test_page');
}

// Testing page
function ab_testify_test_page() {
    ?>
    <div class="wrap">
         <h1>Add Test</h1>
        <div class="card">
       
        <form method="post" action="">
            <h2>Test information</h2>
            <label for="test_name">Test Name:</label><br>
            <input type="text" id="test_name" name="test_name" required placeholder="Add your test name here..."><br>
        </div>
            <h2>Conversion Goals</h2>
            <div class="card">
            <div id="action-section">
                <h3>Action</h3>
                    <input type="checkbox" id="goal-cta" name="conversion_goals[]" value="cta" onchange="toggleCTADropdown()">
                    <label for="goal-cta">Clicking CTA</label><br>

                    <div id="cta-dropdown" style="display: none;">
                        <label for="cta-select">Select CTA Button:</label>
                        <select id="cta-select" name="cta_select">
                          <!-- Options will be dynamically generated here -->
                        </select>
                    </div>

                    <input type="checkbox" id="goal-inquiry" name="conversion_goals[]" value="inquiry" onchange="toggleInquiryDropdown()">
                    <label for="goal-inquiry">Contact Form Inquiries</label><br>

                    <div id="inquiry-dropdown" style="display: none;">
                        <label for="inquiry-select">Select Contact Form:</label>
                        <select id="inquiry-select" name="inquiry_select">
                        <?php
                        // Retrieve contact forms dynamically
                        $contact_forms = get_posts(array(
                            'post_type' => 'wpcf7_contact_form', // Assuming using contact Form 7 plugin
                            'posts_per_page' => -1,
                            'fields' => 'ids' // Retrieve only post IDs
                        ));
                        if ($contact_forms) {
                                foreach ($contact_forms as $form_id) {
                                    $form_name = get_the_title($form_id);
                                    echo '<option value="' . esc_attr($form_id) . '">' . esc_html($form_name) . '</option>';
                                }
                        } else {
                                echo '<option value="">No contact forms found</option>';
                        }
                        ?>
                        </select>
                    </div>
                    </div>
                    </div>
            <div class="card">
            <h2> Choose Content</h2>
            <label for="content-select">Select Content:</label>
            <select id="content-select" name="content">
                <?php
                $args = array(
                    'post_type' => array('post', 'page'),
                    'posts_per_page' => -1,
                );
                $posts = get_posts($args);
                if ($posts) {
                    // Store posts by category
                    $post_categories = array();
                    foreach ($posts as $post) {
                        $category = get_the_category($post->ID);
                        if (!empty($category)) {
                            $category_name = $category[0]->name;
                            $post_categories[$category_name][] = $post;
                        } else {
                            $post_categories['Page category'][] = $post;
                        }
                    }

                    // Display dropdown options by category
                    foreach ($post_categories as $category_name => $category_posts) {
                        echo '<optgroup label="' . esc_attr($category_name) . '">';
                        foreach ($category_posts as $post) {
                            $post_title = get_the_title($post->ID);
                            $post_title = apply_filters('the_title', $post_title, $post->ID);
                            echo '<option value="' . esc_attr($post->ID) . '">' . esc_html($post_title) . '</option>';
                        }
                        echo '</optgroup>';
                    }
                } else {
                    echo '<option>No posts found</option>';
                }
                ?>
            </select>

            <h2>Target Elements<h2>
            <div>
                <input type="checkbox" id="element-title" name="target_elements[]" value="title" onchange="toggleTargetElements()">
                <label for="element-title">Title</label><br>
                <div id="title-variation-input" style="display: none;">
                    <input type="text" id="title-variation" placeholder="Enter title variation">
                </div>
                
                <div id="title-buttons" style="display: none;">
                    <button class="action-button link-button" data-action="editElement" data-element-id="title">Edit</button>
                    <button id="preview-button">Preview</button>
                </div>
                <div id="preview-section">
                    
                </div>

                <div id="title-variations" style="display: none;">
                    <button class="action-button link-button" data-action="addVariation" data-element-id="title">Add Variation</button>
                </div>

                
            </div>





                <input type="checkbox" id="element-description" name="target_elements[]" value="description">
                <label for="element-description">Description</label><br>

                <input type="checkbox" id="element-image" name="target_elements[]" value="image">
                <label for="element-image">Image</label><br>

                <input type="checkbox" id="element-layout" name="target_elements[]" value="layout">
                <label for="element-layout">Layout</label><br>

                

                <h2> Create Variations</h2>

                <input type="submit" name="ab_testify_submit" class="button-primary" value="Start Test">

        </form>
    </div>
    </div>
    <?php
}

// Process form submission
add_action('admin_init', 'ab_testify_process_test_submission');

function ab_testify_process_test_submission() {
    if(isset($_POST['ab_testify_submit']) && $_POST['ab_testify_submit'] == 'Start Test') {
        
        $elements_to_test = isset($_POST['elements_to_test']) ? $_POST['elements_to_test'] : array();
    
        wp_redirect(admin_url('admin.php?page=ab-testify-dashboard'));
        exit();
    }
}




?>
