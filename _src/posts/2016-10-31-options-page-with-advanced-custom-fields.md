---
layout: post
title: 'Options page with Advanced Custom Fields'
author: Christopher Kollars
tags:
  - Wordpress
  - ACF
---

Recently I was introduced to the options attribute for Advanced Custom Fields and it’s been an eye opener. I’m going to start using this feature more but it’s also not "blow you away" eye opener. 

Across many sites there is content or information that’s used globally on the website. Say a contact email address or a physical mailing address. Maybe even a tag-line. My old ways I would code these into a template as static content. I sometimes even use [Advance Custom Fields](http://advancecustomfields.com) (ACF) and add them as a field per page use. 

There is actually a better way to set up some of these global content and information by using what's called the [Options Page](https://www.advancedcustomfields.com/add-ons/options-page/) with ACF. First you have to activate it within the `functions.php` file of your theme.

```php
if( function_exists('acf_add_options_page') ) {

  acf_add_options_page();

}
```

This is just a simple starting point to turn on this page feature but you can dive a  deeper and setup it's menu name and page title for the admin page.

```php
if( function_exists('acf_add_options_page') ) {
  acf_add_options_page(array(
    'page_title'  => 'Options for this theme',
    'menu_title'  => 'Options',
    'redirect'    => false
  ));
}
```

There is even more available [options](https://www.advancedcustomfields.com/resources/acf_add_options_page/) but for now this is what I'm currently using for my theme. As you can see you might want to change the page and menu title from option to say “Global Settings” or “Theme Settings”.

To add any ACF field to this page you'll have to set the ACF Location option "Show this field group if" dropdown to be `Options page` and is equal to "Theme Options" or whatever value you gave to the `menu_title`. 

That's basically it. Easy peasy.

