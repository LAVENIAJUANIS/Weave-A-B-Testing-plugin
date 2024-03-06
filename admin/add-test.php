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
            <form method="post" action="<?php echo admin_url('admin-post.php'); ?>">
                <input type="hidden" name="action" value="ab_testify_start_test">
                <h2>Test information</h2>
                <label for="test_name">Test Name:</label><br>
                <input type="text" id="test_name" name="test_name" required placeholder="Add your test name here..."><br>
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
                                    'fields' => 'ids'
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
                    <select id="content-select" name="content" onchange="updateTargetElement()">
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

                    <h2>Target Elements</h2>
                    <input type="checkbox" id="title_variation_checkbox" name="title_variation_checkbox" onchange="toggleTitleInput()">
                    <label for="title_variation_checkbox">Title</label><br>
                    <div id="title_variation_input" style="display: none;">
                        <!-- Title variation input field -->
                        <input type="text" id="title_variation_text" name="title_variation_text" placeholder="Enter title variation...">
                        <button type="button" id="save_button" onclick="saveTitleVariation()">Save</button>

                    </div>
                    <div id="saved_title_variation" style="display: none;"></div>
                   
                        <div class="input-field">
                            <input type="checkbox" id="description_variation_checkbox" onchange="toggleDescriptionInput()">
                            <label for="description_variation_checkbox">Description</label>
                            <div id="description_variation_input" style="display: none;">
                                <!-- Description variation input field -->
                                <textarea id="description_variation_text" placeholder="Enter description variation"></textarea>
                                <button type="button" id="description_save_button" onclick="saveDescriptionVariation()" style="display: none;">Save</button>
                            </div>
                            <div id="saved_description_variation" class="saved-variation"></div>
                        </div>


                        <div class="input-field">
                        <input type="checkbox" id="image_variation_checkbox" onchange="toggleImageInput()">
                        <label for="image_variation_checkbox">Image Variation</label>
                        <div id="image_variation_input" style="display: none;">
                            <!-- Button to upload an image -->
                            <input type="file" id="image_upload_button" accept="image/*" style="display: none;">
                            <button type="button" onclick="uploadImage()">Upload Image</button>
                            <!-- Saved image variations -->
                            <div id="saved_image_variations" class="saved-variation" style="display: none;">
                                <!-- Image variations will be displayed here -->
                            </div>
                        </div>
                    </div>



    </div>
    <?php
}

// Process form submission
add_action('admin_post_ab_testify_start_test', 'ab_testify_process_test_submission');

function ab_testify_process_test_submission() {
    if(isset($_POST['ab_testify_submit']) && $_POST['ab_testify_submit'] == 'Start Test') {

        // Get the selected content (page/post ID)
        $selected_content_id = isset($_POST['content']) ? $_POST['content'] : 0;

        // Get the selected content's title
        $selected_content_title = '';
        if ($selected_content_id) {
            $selected_content = get_post($selected_content_id);
            if ($selected_content) {
                $selected_content_title = $selected_content->post_title;
            }
        }

        // Now you have the selected page/post title to target for testing
        // You can further process this data as needed for A/B testing

        wp_redirect(admin_url('admin.php?page=ab-testify-dashboard'));
        exit();
    }
}

?>