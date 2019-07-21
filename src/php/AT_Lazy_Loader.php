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
      'Lazy Loader',
      'manage_options',
      'at_lazy_loader_menu_slug',
      array(__CLASS__, 'at_lazy_loader_options_page')
    );
  }

  static function at_lazy_loader_options_page()
  {
    $blank_selected =
      get_option('at_lazy_loader_image_placeholder') == 'blank'
        ? 'selected'
        : '';
    $low_res_image_selected =
      get_option('at_lazy_loader_image_placeholder') == 'low-res-image'
        ? 'selected'
        : '';
    ?>
      <div>
        <h1>AT Lazy Loader</h1>
        <form method="post" action="options.php">
          <?php settings_fields('at_lazy_loader_settings'); ?>
          <table class="form-table">
            <tbody>
              <tr valign="top">
                <th scope="row">Image Placeholder</th>
                <td>
                  <label>
                    <input type="radio" name="at_lazy_loader_image_placeholder" value="blank" <?= $blank_selected
                      ? 'checked'
                      : '' ?>> Blank<br>
                  </label>
                  <label>
                    <input type="radio" name="at_lazy_loader_image_placeholder" value="low-res-image" <?= $low_res_image_selected
                      ? 'checked'
                      : '' ?>> Low Res Image
                  </label>
                </td>
              </tr>
            </tbody>
          </table>
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
