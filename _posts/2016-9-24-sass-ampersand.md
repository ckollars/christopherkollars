---
layout: post
title: 'SASS and the ampersand selector'
author: Christopher Kollars
published: false
---
## SASS and the ampersand selector

Recently I was tasked to add a new feature on a website's code base that was developed by another developer. This wasn't my first rodeo especially with working with multiple developers. What was needed was pretty simple. So I first started viewing things in the Chrome's inspector just to get a sense of what and where I needed to make the changes. Thanks to source maps, it was pretty straight forward.

I pulled up the SASS file where I need to make the change. I did a little jump to a line feature in Sublime Text but the class I was looking for wasn't on that line. It was about a 30 or so lines down further.

Everyone is aware of the ampersand selector with sass. If the `&` is before a declaration it's part of the declarations parent. If it's after the declaration then that class has to become before all the other classes in it's declaration.

```
  .block {
    &.block--modifier {
      display: block;
    }

    .block__parent & {
      display: inline-block;
    }
  }
```

Got it — Good!

Now I've been using SASS this way since I started but on this project I seen that the previous developer started using the `&` for declaring it's children classes. For instance:

```
.block {
    display: inline-block;

    &--modifier {
      display: block;
    }
}
```

Now when that outputs it'll be 2 separate classes.

```
.block {
  display: inline-block;
}
.block--modifier {
    display: block;
}
```

When I looked at this I totally get it. I see the benefits of how this will speed up coding, leaner modular code; but there was an issue I jumped at me right away.

When using source maps and inspecting an element it doesn't show exactly where this declaration is in the sass file. It ends up showing where it's parent was first declared. Now if your code is lean and which I try to strive to have mine but honestly this isn't always the case and in my case there was a lot of modifiers and elements being declared this way.

So I looked past this and tried to do a project search for `.block--modifier` but the search came up empty as it should. This class was never fully written out since it was nested inside the parent and declared as `&--modifier`.

