---
toc: True
comments: false
layout: post
title: HTML and JavaScript w/ DOM interaction
description: stuff
courses: {plans: {week: 5}}
type: hacks
hide: true
---

<html>
<!-- the ID must be specified on the elements --> 
<button id="myButton">Dark Mode</button>

<div id="window" style="background-color: white">
    <h1 id=>Default title</h1>
    <p>“According to all known laws of aviation, there is no way that a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyways. Because bees don't care what humans think is impossible.”</p>
</div>
</html>

<!-- our javascript goes here -->
<script>

function changeBackgroundColor() {
    var windowElement = document.getElementById("window");
    
    // Define the new background color
    var newBackgroundColor = "black"; // Change this to your desired color
    
    // Update the background color of the "window" element
    windowElement.style.backgroundColor = newBackgroundColor;
}
</script>