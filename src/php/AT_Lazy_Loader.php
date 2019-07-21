<?php

class AT_Lazy_Loader
{
  const version = '1.0.0';

  function __construct()
  {
    add_action('wp_enqueue_scripts', array(__CLASS__, 'load_script'));
    add_action('admin_init', array(__CLASS__, 'register_settings'));
    add_action('admin_menu', array(__CLASS__, 'register_options_page'));

    self::load_loaders();
  }

  static function load_script()
  {
    wp_enqueue_script(
      'at-lazy-loader-script',
      plugin_dir_url(__FILE__) . 'at-lazy-loader.js',
      array(),
      time(),
      true
    );
  }

  static function register_settings()
  {
    add_option('at_lazy_loader_image_placeholder', 'blank');
    register_setting(
      'at_lazy_loader_settings',
      'at_lazy_loader_image_placeholder'
    );
  }

  static function register_options_page()
  {
    add_options_page(
      'AT Lazy Loader',
      'AT Lazy Loader',
      'manage_options',
      'at_lazy_loader_menu_slug',
      array(__CLASS__, 'at_lazy_loader_options_page')
    );
  }

  static function at_lazy_loader_options_page()
  {
    $blank_selected =
      get_option('at_lazy_loader_image_placeholder') == 'Blank'
        ? 'selected'
        : '';
    $low_res_image_selected =
      get_option('at_lazy_loader_image_placeholder') == 'Low Res Image'
        ? 'selected'
        : '';
    ?>
      <div>
        <h1>AT Lazy Loader</h1>
        <h3>Image Settings</h3>
        <form method="post" action="options.php">
          <?php settings_fields('at_lazy_loader_settings'); ?>
          <label for="at_lazy_loader_image_placeholder">Image Placeholder:</label>
          <select id="at_lazy_loader_image_placeholder" name="at_lazy_loader_image_placeholder">
            <option <?= $blank_selected ?>>Blank</option>
            <option <?= $low_res_image_selected ?>>Low Res Image</option>
          </select>
          <?php submit_button(); ?>
        </form>
      </div>
    <?php
  }

  static function load_loaders()
  {
    new AT_Lazy_Load_Images();
  }
}

new AT_Lazy_Loader();
?>
