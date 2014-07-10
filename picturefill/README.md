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

You can combine top parent class names with specific names too. The script adds them with a space in the middle. From the preceding example, the complete class added to the first image span would be class="parentClassApplied specificClassOne"
