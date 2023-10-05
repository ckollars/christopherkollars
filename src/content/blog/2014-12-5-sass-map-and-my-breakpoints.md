---
title: "Sass map and my breakpoints"
author: Christopher Kollars
excerpt: "Looking at a new way to handle breakpoints in Sass."
date: 2014-12-05
---

My most recent project I decided to use Sass maps. It all started from an [article](http://www.sitepoint.com/managing-responsive-breakpoints-sass/) in which I basically took the example and applied it to my project.

It's been really useful. I can see setting up a config file with a huge map of all your variables, colors, breakpoints and so on. For now though here is the what I used for my breakpoints and it's mixin if you didn't read the article.

In my `_variables.scss` I declare my breakpoint Sass map.

```scss
$breakpoints: (
    "mobile": (
        max-width: 767px,
    ),
    "small": (
        min-width: 768px,
    ),
    "medium": (
        min-width: 960px,
    ),
    "large": (
        min-width: 1200px,
    ),
);
```

Then in my `_mixins.scss` I have this nice little function called `respond-to()` that I use to filter through my map.

```scss
@mixin respond-to($name) {
    $value: map-get($breakpoints, $name);

    @if map-has-key($breakpoints, $name) {
        @media #{inspect(map-get($breakpoints, $name))} {
            @content;
        }
    } @else {
        @warn "Unfortunately, no value could be retrieved from '#{$name}'. "
        + "Please make sure it is defined in '$breakpoints' map.";
    }
}
```

Now whenever I need to define a breakpoint in one of my styles I just include my mixin.

```scss
.class-name {
    width: 100%;

    @include respond-to(medium) {
        width: 60%;
    }
}
```

Then you end up with this css.

```css
.class-name {
    width: 100%;
}
@media (min-width: 960px) {
    .class-name {
        width: 60%;
    }
}
```
