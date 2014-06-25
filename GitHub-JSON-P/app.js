/*
    # Endpoint URL #
    
    https://api.github.com/legacy/repos/search/{query}
    
    Note: Github imposes a rate limit of 60 request per minute. Documentation can be found at http://developer.github.com/v3/.
    
    # Example Response JSON #
    
    {
      "meta": {...},
      "data": {
        "repositories": [
          {
            "type": string,
            "watchers": number,
            "followers": number,
            "username": string,
            "owner": string,
            "created": string,
            "created_at": string,
            "pushed_at": string,
            "description": string,
            "forks": number,
            "pushed": string,
            "fork": boolean,
            "size": number,
            "name": string,
            "private": boolean,
            "language": number
          },
          {...},
          {...}
        ]
      }
    }
*/
$(document).ready(function () {
    //call JSON after 300ms delay from key-up
    //300ms chosen for UX due to users feeling 300 is "instant"
    function throttle(f, delay) {
        var timer = null;
        return function () {
            var context = this, args = arguments;
            clearTimeout(timer);
            timer = window.setTimeout(function () {
                f.apply(context, args);
            },
                delay || 300);
            
        };
    }
    
    
    $('#search').keyup(throttle(function () {
        
        //clear earlier key presses and return only latest
        $('#results').empty();
        
        var searchTerm = $('#search').val(),
            searchDelay = function () {
                //check search term
                console.log("Searched for: " + searchTerm);
            };
        
        searchDelay();
        
        // set search term URL
        var urlSearch = "https://api.github.com/legacy/repos/search/" + searchTerm;
        
        // set callback function
        var callback = function (data) {
            
            // verify total JSON array length
            var repoLength = data.repositories.length;
            console.log("repo array length is " + repoLength);
            
            // add ul and li list items to div with id=results
            $('#results').html('<ul id="listResults"></ul');
            var i;
            for (i = 0; i < repoLength; i++) {
                var owner = data.repositories[i].owner,
                name = data.repositories[i].name;
                $('#listResults').append('<li id="repoNumber' + i + '"><b>Owner:</b> ' + owner
                                        + ',  <b>Repo Name:</b> ' + name
                                        + '</li>');
                    }
            
            // alert box for each line item
            $('li').each(function () {
                var i = $(this).index();
                var name = data.repositories[i].name,
                    language = data.repositories[i].language,
                    followers = data.repositories[i].followers,
                    url = data.repositories[i].url,
                    description = data.repositories[i].description;
                if (description.length > 300) {
                    description = description.substring(0, 300);
                }
                $(this).click(function () {
                    alert("Repo Name: " + name
                         + "\nLanguage: " + language
                         + "\nFollowers: " + followers
                         + "\nURL: " + url
                         + "\nShort Description: " + description);
                });
            });
        };
        
        // check cached data in local storage for previous searches
        // if not found in local storage, save it
        var getCachedJSON = function (urlSearch, callback) {
            var cachedData = window.localStorage[urlSearch];
            if (cachedData) {
                console.log('Data already cached, returning from cache:', urlSearch);
                callback(JSON.parse(cachedData));
            } else {
                $.getJSON(urlSearch, function (data) {
                    console.log('Fetched data, saving to cache:', urlSearch);
                    window.localStorage[urlSearch] = JSON.stringify(data);
                    callback(data);
                });
            }
        };
        
        // call search
        getCachedJSON(urlSearch, callback);
    }));
});