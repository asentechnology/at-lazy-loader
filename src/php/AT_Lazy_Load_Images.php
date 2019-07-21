<?php

class AT_Lazy_Load_Images
{
  function __construct()
  {
    self::register_custom_image_size();

    if (!is_admin()) {
      add_filter('the_content', array(__CLASS__, 'edit_content'), 99);
    }
  }

  static function register_custom_image_size()
  {
    add_image_size('at-lazy-loader-low-res-image', 100);
  }

  static function edit_content($content)
  {
    return preg_replace_callback(
      '#<(img)([^>]+?)(>(.*?)</\\1>|[\/]?>)#si',
      array(__CLASS__, 'process_image'),
      $content
    );
  }

  static function process_image($matches)
  {
    $attributes = wp_kses_hair($matches[2], wp_allowed_protocols());

    if (empty($attributes['src'])) {
      return $matches[0];
    }

    $image_src = $attributes['src']['value'];

    $placeholder_image = self::get_placeholder($image_src);

    unset($attributes['src'], $attributes['data-lazy-src']);

    $attributes_str = self::build_attributes_string($attributes);

    $image = '<img src="';
    $image .= $placeholder_image;
    $image .= '" data-at-lazy-load-src="';
    $image .= $image_src;
    $image .= '" ';
    $image .= $attributes_str;
    $image .= '>';

    return $image;
  }

  static function get_placeholder($image)
  {
    switch (get_option('at_lazy_loader_image_placeholder')) {
      case 'low-res-image':
        list($width, $height) = getimagesize($image);
        $image_width = round((100 * $height) / $width);

        $placeholder_image = preg_replace(
          '/(\.[^.]+)$/',
          sprintf('%s$1', '-100x' . $image_width),
          $image
        );
        break;

      case 'blank':
        $placeholder_image = plugin_dir_url(__FILE__) . 'blank.png';
        break;
    }

    return $placeholder_image;
  }

  static function build_attributes_string($attributes)
  {
    $string = array();

    foreach ($attributes as $name => $attribute) {
      $value = $attribute['value'];

      if ('' === $value) {
        $string[] = sprintf('%s', $name);
      } else {
        $string[] = sprintf('%s="%s"', $name, esc_attr($value));
      }
    }

    return implode(' ', $string);
  }

  static function console($string)
  {
    echo '<script>';
    echo 'var results = `' . json_encode($string) . '`; ';
    echo 'results = JSON.parse(results); ';
    echo 'console.log(results); ';
    echo '</script>';
  }
}
?>
