<?php

class AT_Lazy_Loader
{
  const version = '1.0.0';

  function __construct()
  {
    add_action('wp_enqueue_scripts', array(__CLASS__, 'load_script'));
    add_action('admin_init', array(__CLASS__, 'register_settings'));

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
      'at_lazy_loader_images',
      'at_lazy_loader_image_placeholder'
    );
  }

  static function load_loaders()
  {
    new AT_Lazy_Load_Images();
  }
}

new AT_Lazy_Loader();
?>
