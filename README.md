code_samples
============

A sample of programming and code I've created for various projects

# Google Maps

"Google Maps" - PHP, MySQL, JavaScript, Google Maps API v3. A project to integrate an interactive, dynamic map on a PHP/MySQL website for a farmers' market association with over 65 unique markets. Through PHP a MySQL database is queried, and echo array created in JavaScript that populates interactive markers and corresponding information including Market Name, Location, Hours, Season, Directions, and Social Media Link. A working, interactive example of the resulting map, is on my website. I simulated a date of March 28th to show open vs closed markets, and links have been replaced with dummy placeholders for example purposes. See it at: http://jpost-design.com/#interactive-map


# Picturefill
A Responsive Images approach that you can use today that mimics the [proposed picture element](http://www.w3.org/TR/2013/WD-html-picture-element-20130226/) using `span`s, for safety sake.


* Originating Author: Scott Jehl (c) 2012
* License: MIT/GPLv2

**Improvements:** Added JavaScript to add class, ID and title to img element. 

Add a class in top parent span that will be added to all span tags with "data-class"

Add specific classes based on child spans with "class"

```
<span data-class="parentClassApplied">
    <span class="specificClassOne" ...etc...  ></span>
    <span class="specificClassTwo" ...etc...  ></span>
</span>
```

Add titles with "data-title" and ID with with "data-id" 

You can combine top parent class names with specific names too. The script adds them with a space in the middle. From the preceding example, the complete class added to the first image span would be class="parentClassApplied specificClassOne"

# simulatedChat
A proof of concept, jQuery and Bootstrap based simluated chat for a tech exercise for Monitise. Colors and graphics soley for demo. Branding to be done at a later time.

**Goals:**
* Improve UX
* Give customer feedback that agent is replying
* Smooth interaction/animation
* Responsive design to adapt to multiple screen sizes

**Accomplishments**
* Completed over one weekend
* Hand-coded jQuery
* SVG "profile photo" graphics exported from Illustrator
* Automatic scroll and animated fade-in of new messages
* Sample robot script written in array
* Randomized auto-reply to help simulate proof of concept
* Prevents empty input, or "blank" messages