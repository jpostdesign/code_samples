# Overview #

A skills test to write a single page JavaScript application that allows one to search Github.com for repos by keyword.

## Test Description ##

There is no one way to complete this exercise as long as the minimum requirements are met.
This should take about 2 hours to complete.

**Requirements**

1. You can only edit app.js, you cannot touch index.html. jQuery is provided.
2. index.html contains two elements: one for the search term and one for the results.
3. The results should show as a list with each item in an "owner/name" format.
4. When a result is clicked, display an alert with the repo's `language`, `followers`, `url` and `description`.
5. The search term should be cached so duplicate searches do not trigger further requests. 
6. Solution does not need to support older browsers.

## My Solution ##

* Completed in 2 hours
* Call a search after 300ms from keyup in the search box. That's the optimum time for such a delay and gives the best UX. It strikes a balance between the user feeling searches are "instant" and from not flooding the server with requests.
* Developed in an agile way. Throughout the process, utilized the console to check the search term, returned array length, and cached status
* Cached searches using Local Storage
* Simple unordered list to display results given the requirements
* Linked the alert boxes to the list item's index position, to make other values relative
* Encountered one alert box while testing that overflowed my screen with a very long description. So I made a check to see if description length > 300, if so, then extract just the first 300 characters