# Improvements: 

Added JavaScript to add class, ID and title to img element. 

Forked original library by Scott Jehl and opened pull request for improvement. Pull request details at https://github.com/scottjehl/picturefill/pull/115 

# Problem:

Picurefill ver2 could not apply classes, ID, or titles to child img elements. This caused issues with combining Picturefill and the Bootstrap framework due to dependencies on img element level classes like "img-responsive" and "img-circle".

# Solution:

Added JavaScript to add class, ID and title to img element. 

Add a class in top parent span that will be added to all span tags with "data-class"

Add specific classes based on child spans with "class"

```
<span data-class="parentClassApplied">
    <span class="specificClassOne" ...etc...  ></span>
    <span class="specificClassTwo" ...etc...  ></span>
</span>
```

Add titles with "data-title" and ID with with "data-id" 

**Description**

You can combine top parent class names with specific names too. The script adds them with a space in the middle. From the preceding example, the complete class added to the first image span would be class="parentClassApplied specificClassOne"

**Example**

From an example on my site at http://jpost-design.com/Picturefill.html you can see how the parent data-class in the span combines with the child span class for each image element. 

For the "large" image for browser min-width 800px, for example, the resulting code is:

```
<span class="specificSpan-lrg" data-media="(min-width: 800px)" data-src="Picturefill_files/large.jpg">

    <img class="parentSpanClass specificSpan-lrg" alt="A giant stone face at The Bayon temple in Angkor Thom, Cambodia" title="Statue at The Bayon temple in Cambodia" src="Picturefill_files/large.jpg"></img>
```

Here the class "specificSpan-lrg" is applied directly to the img element, and so is the class "parentSpanClass". 

This incorporates DRY fundamentals so you Don't Repeat Yourself.
