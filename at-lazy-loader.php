<?php
/**
 * Plugin Name: AT Lazy Loader
 * Description: Lazy loads assets into a Wordpress Site
 * Version: 1.0.0
 * Author: Asen Technology
 * Author URI: https://www.asentechnology.com
 */

define('AT_LAZY_LOADER_URL', plugin_dir_url(__FILE__));
define('AT_LAZY_LOADER_DIR', plugin_dir_path(__FILE__));

require AT_LAZY_LOADER_DIR . '/models/AT_Lazy_Loader.php';
require AT_LAZY_LOADER_DIR . '/models/AT_Lazy_Load_Images.php';

new AT_Lazy_Loader();
