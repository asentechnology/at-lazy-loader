<?php

class AT_Lazy_Load_Images
{
  function __construct()
  {
    if (!is_admin()) {
      add_filter('the_content', array(__CLASS__, 'edit_content'), 99);
    }
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

    list($width, $height) = getimagesize($image_src);

    unset($attributes['src'], $attributes['data-lazy-src']);

    $attributes_str = self::build_attributes_string($attributes);

    return '<img src="' .
      plugin_dir_url(__FILE__) .
      'blank.png" data-at-lazy-load-src="' .
      $image_src .
      '" width="' .
      $width .
      '" height="' .
      $height .
      '" ' .
      $attributes_str .
      '>';
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
