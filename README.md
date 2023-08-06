➕➖✖➗
# devmentor.pl - Javascript: Events

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [What I learned](#what-i-learned)
    -   [Useful resources](#useful-resources)
-   [Author](#author)
-   [Acknowledgments](#acknowledgments)

## Overview

### The challenge

The goal was to create a slider image gallery based on vanilla Javascript and Customs Events and learn how to work with code written by another developer. I was not allowed to change any HTML or CSS.

The functionality of the slider:

-   images are grouped randomly in groups (nice/good) by JS code,
-   when the image is clicked, the slider opens and based on images from the same group, the gallery under the main image is created,
-   when the user clicks on the right or on the left arrow, the main image changes and the yellow indicator points to the current image,
-   when the user clicks on the space around the main image, the gallery disappears.

Additional tasks:

-   to create an infinity gallery, where if there is no next image, then the gallery shows the first one (and another way around),
-   to create an interval with functionality of a slide show, which stops when the arrow is clicked or when the gallery closes.

### Screenshot

![](./assets/img/img1.png)

### Links

-   Live Site URL: [Check it out here]()

## My process

### What I learned

To complete this task I learned a lot about events, event objects, and custom events. I had to read and understand the code written by another person and to be able to write my part of the code to make the application work. I added event listeners to arrows and layout elements and had to work out where to take advantage of the bubbling or capturing phase to stop the propagation of the events. I wrote three functions that are responsible for handling click events and refactored them after to keep my code up to the DRY principle and to make it more readable. One of the biggest challenges was to select the right argument to create an infinite gallery and to comit elements with class `js-slider__thumbs-item--prototype`. In the end, I learned how to use intervals. I encountered problems with clearing intervals after it was called. The method clearInterval() cleared only the first interval and the function was still running in the back after the gallery was closed.  I found a great solution searching Stackoverflow and applied it to my code.

### Useful resources

-   [devmentor.pl](https://devmentor.pl/) - for this project I mainly used materials provided to me by my mentor.

## Author

-  Github - Mike161pl (https://github.com/Mike161pl)
-  LinkedIn - [@Michał Plaszczak](https://www.linkedin.com/in/michal-plaszczak/)

## Acknowledgments

Thanks to my [Mentor - devmentor.pl](https://devmentor.pl/) - for providing me with this task and for code review.
