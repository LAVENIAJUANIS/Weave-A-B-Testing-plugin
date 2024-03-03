<?php
/*
Plugin Name: Weave A/B Testing
Description: A plugin for A/B testing in WordPress.
Version: 1.0
Author: Lavenia Juanis
Plugin URI: https://example.com/ab-testing-plugin
*/


function ab_testing_enqueue_scripts() {

    wp_enqueue_script('jquery');
    wp_enqueue_script('ab-testing-script', plugin_dir_url(__FILE__) . 'ab-testing.js', array('jquery'), '1.0', true);
}

add_action('admin_enqueue_scripts', 'ab_testing_enqueue_scripts');

register_activation_hook(__FILE__, 'ab_testify_activate');

// function weave_testing_enqueue_styles() {
//     wp_enqueue_style( 'weave-testing-style', plugins_url ('styles.css', __FILE__));
// }

add_action('wp_enqueue_scripts', 'enqueue_my_plugin_styles');

// AJAX
function get_page_content_callback() {

    if(isset($_POST['post_id'])) {
        $post_id = intval($_POST['post_id']);

        $post_content = get_post_field('post_content', $post_id);
        echo $post_content;
    } else {
        echo 'Error: Missing post ID parameter.';
    }
    wp_die();

}

add_action('wp_ajax_get_page_content', 'get_page_content_callback');

// AJAX handleer function
// function ab_testify_process_test_submission() {
//     if(isset($_POST['ab_testify_submit']) && $_POST['ab_testify_submit'] == 'Start Test') {
//         // Process form submission logic here

//         // For demonstration purposes, you can return a JSON response

//         $response = array(
//             'success' => true,
//             'message' => 'Test started successfully!'
//         );
//         wp_send_json_success($response);
//     } else {
//         wp_send_json_error('Invalid AJAX request');
//     }
// }
add_action('wp_ajax_ab_testify_process_test_submission', 'ab_testify_process_test_submission');
add_action('wp_ajax_nopriv_ab_testify_process_test_submission', 'ab_testify_process_test_submission');

function ab_testify_activate() {
   
}

register_deactivation_hook(__FILE__, 'ab_testify_deactivate');

function ab_testify_deactivate() {
   
}

// Include admin files
include_once(plugin_dir_path(__FILE__) . 'admin/dashboard.php');
include_once(plugin_dir_path(__FILE__) . 'admin/add-test.php');
include_once(plugin_dir_path(__FILE__) . 'admin/preview-page.php');



?>
