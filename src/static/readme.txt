=== AT Lazy Loader ===
Contributors: asentechnology
Tags: lazy loading
Tested up to: 5.2.2
Requires PHP: 5.2.4
Stable tag: 1.0.1
License: GPLv2 or later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

A simple and effective lazy loader.

== Description ==
This plugin lazy loads images by initially serving either blank images or low-res images and then loads the high-res version according to their distance from the initial scroll position.

== Installation ==
Install like any other plugin, directly from your plugins page. Go to the plugin settings page at Settings->Lazy Loader and select whether you want to use blank or low-res placeholder images.

== Frequently Asked Questions ==
How is this plugin different from other lazy loaders?
Most lazy loading plugins will only begin loading images when the user scrolls to the image's position. Although this is a good approach in some cases, the issue comes when the images are large (or the user has a slow connection) and the loading doesn't begin until the user arrives at the image's location which leads to the user always waiting for images to load throughout the entire user experience. This plugin uses a different approach in that it initially loads a placeholder image (either blank or low-res) and once the page has been loaded, it scans the page for all images and then groups them into manageable groups based on the image's location's distance from the current scroll position and then loads group after group resulting in all images eventually loading in the background while the user is already viewing the page's content.

Is the plugin only lazy loading images?
Yes. We do plan on adding additional features in future updates but for now, it's handling just images.

In what order are the images loaded?
When a page is loaded, the plugin determines each image's distance from the current scroll position and then organizes the images into groups based each group's distance from the scroll position. Then it loads group after group from the groups closest to the scroll position to the farthest till all images are loaded.

It's set to use 'low-res' images as placeholders, but no image is showing until the high-res image loads, what's wrong?
If you uploaded images before installing AT Lazy Load, you will need to regenerate all your image thumbnails since this plugin uses a custom size for the low-res image. There are several free plugins that can do this for you.

How will this plugin effect the site's SEO?
Since the plugin initially quickly loads a small placeholder and loads the high-res images only after the pageload is complete, this leads to dramatically faster page load times which will significantly boost your SEO performance. In fact, this approach is the exact approach that Google and other search engines recommend.

Where is the source code?
The source code can be found at our github page: github.com/asentechnology/at-lazy-loader

How can I contact you with questions and comments?
You can reach us by visiting: www.asentechnology.com/contact
