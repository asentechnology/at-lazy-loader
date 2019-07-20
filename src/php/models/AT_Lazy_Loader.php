<?php

class AT_Lazy_Loader
{
  const version = '1.0.0';

  function __construct()
  {
    add_action('wp_enqueue_scripts', array(__CLASS__, 'load_script'));

    self::load_loaders();
  }

  static function load_script()
  {
    wp_enqueue_script(
      'at-lazy-loader-script',
      AT_LAZY_LOADER_URL . 'at-lazy-loader.js',
      array(),
      time(),
      true
    );
  }

  static function load_loaders()
  {
    new AT_Lazy_Load_Images();
  }
}
