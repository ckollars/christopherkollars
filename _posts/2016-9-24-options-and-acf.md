---
layout: post
title: 'Options and ACF'
author: Christopher Kollars
published: false
---
## 

Recently I’ve been introduced to the options attribute for Advanced Custom Fields and it’s been an eye opener.

I mean it’s been something I’m going to start using more but it’s not blow you away. 

Many times there is content or information that’s used across the website. Say a contact email address or a physical mailing address. Maybe even a tagline. My old ways I would code these into a template as static content. I'd sometimes even use [Advance Custom Fields](http://advancecustomfields.com) (ACF) and add them as a field per page use. 

There is actually a better way to set up some of this global content by using what's called the [Options Page](https://www.advancedcustomfields.com/add-ons/options-page/) with ACF. First you have to activate it within the `functions.php` file of your theme.

```
if( function_exists('acf_add_options_page') ) {

  acf_add_options_page();

}
```

This is just a simple starting point to turn on this page feature but you can dive a little deeper and setup it's menu name and page title for this admin feature.

```
if( function_exists('acf_add_options_page') ) {

  // add parent
  $parent = acf_add_options_page(array(
    'page_title'  => 'Options for this theme',
    'menu_title'  => 'Options',
    'redirect'    => false
  ));
}
```

There is even more available [options](https://www.advancedcustomfields.com/resources/acf_add_options_page/) but for now this is what I'm currently using for my theme. As you can see you might want to change the page and menu title from option to say “Global Settings” or “Theme Settings”.

To add any ACF field to this page you'll have to set your newly created ACF Location to be `Options page` verses a post type or page.

