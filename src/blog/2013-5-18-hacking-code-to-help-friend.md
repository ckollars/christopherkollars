---
title: "Hacking Code to Help a Friend"
excerpt: Learning is so much easier when you are solving problems. Even if the problem is small it's still worth the effort and the ability to learn.
date: 2013-05-22
tags: learn, solve problems, javascript
---

The other day my friend Carl sent me a Google chat asking how much I know about javascript. I first thought to myself, hey I'm somewhat decent instead I replied back with I'm pretty good. Once saying this I realized I may be in a world of hurt so he sent me over a code snippet.

<script src="https://gist.github.com/ckollars/5632128.js"></script>

My first glance it looked simple enough. Carl wanted to use classes instead of an ID. Doing this would we could specify one class and use it on multiple DOM elements on the page.

I started with changing the javascript to jQuery. I didn't change much of logic since it was already working but doing just this ended up as a fail. A couple more changes and I got things working, well sort of. It was animating the scroll effect but it was doing this on all classes on the page. Plus it was only scrolling the width of the container not the inner content width.

I started dissecting the code more and decided to do this as OOP programming. It's something I haven't had a lot of experience with but I wanted to learn and needed to learn. Referencing code samples across the internet. This got me understanding creating objects. I ended up looking at the jQuery from a Drupal module called Quicktabs that I was using on another project. From this I really started to understand objects and extending them.

It was a lot of trial and error; reading Stackoverflow and watching tutorials on jquery.com. And with all this I ended up get things working.

<script src="https://gist.github.com/ckollars/5632122.js"></script>

Now the only thing is to slow down the speed of scrolling so it's legible. The culprit is <code>animate()</code> so I'm looking at implementing <code>setTimeout()</code> that would move in increments per millisecond. I'm still working through this problem and hope to add to the functionality.
