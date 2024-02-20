<?php
/*
Plugin Name: Weave A/B Testify
Description: A plugin for A/B testing in WordPress.
Version: 1.0
Author: Lavenia Juanis
Plugin URI: https://example.com/ab-testing-plugin
*/


function ab_testing_enqueue_scripts() {

    // Enqueue jQuery
    // wp_enqueue_script('jquery');

    // Enqueue the JavaScript file
    wp_enqueue_script('ab-testing-script', plugin_dir_url(__FILE__) . 'ab-testing.js', array('jquery'), '1.0', true);
}

add_action('admin_enqueue_scripts', 'ab_testing_enqueue_scripts');
// Activation hook
register_activation_hook(__FILE__, 'ab_testify_activate');

function enqueue_my_plugin_styles() {
    wp_enqueue_style( 'my-plugin-styles', plugins_url ('styles.css', __FILE__));
}

add_action('wp_enqueue_scripts', 'enqueue_my_plugin_styles');

function ab_testify_activate() {
    // Add activation tasks here
    // For example, create database tables or initialize settings
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'ab_testify_deactivate');

function ab_testify_deactivate() {
    // Add deactivation tasks here
    // For example, clean up database tables or reset settings
}

// Include admin files
include_once(plugin_dir_path(__FILE__) . 'admin/dashboard.php');
include_once(plugin_dir_path(__FILE__) . 'admin/add-test.php');
include_once(plugin_dir_path(__FILE__) . 'admin/preview-page.php');



?>
