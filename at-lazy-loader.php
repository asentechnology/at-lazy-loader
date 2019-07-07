<?php
/**
 * Plugin Name: AT Lazy Loader
 * Description: Lazy loads assets into a Wordpress Site
 * Version: 1.0.0
 * Author: Asen Technology
 * Author URI: https://www.asentechnology.com
 */

add_action('wp_enqueue_scripts', 'enqueue_at_lazy_loader_script');

function enqueue_at_lazy_loader_script()
{
    wp_enqueue_script(
        'at-lazy-loader-script',
        plugin_dir_url(__FILE__) . 'at-lazy-loader.js',
        array(),
        '',
        true
    );
}
