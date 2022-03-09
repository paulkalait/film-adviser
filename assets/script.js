var reviewsContainerEl = document.querySelector(".display-reviews");
var movieInput = document.querySelector("#input-field");
var movieFormEl = document.querySelector("#movieform");
var submitbtnEl = document.querySelector("#search-btn");

var getMovieApi = function (event) {
  event.preventDefault();
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  console.log(movieInput.value);
  fetch(
    "https://imdb-api.com/en/API/SearchMovie/k_jn3i9qrj/" + movieInput.value
  )
    .then(function (response) {
      // console.log(response)
      return response.json();
    })

    .then(function (moviedata) {
      //i want to nest the id var instead of tt1375666
      console.log(moviedata);
      if (moviedata.results != null) {
        var id = moviedata.results[0].id;

        console.log(moviedata);
        // var id = results[0].id
        //id = is this
        var reviewsApi = "https://imdb-api.com/en/API/Reviews/k_jn3i9qrj/" + id;
        fetch(reviewsApi)
          .then(function (response) {
            return response.json();
          })
          .then(function (reviewData) {
            var reviewsQuery = ``;
            for (var i = 0; i < reviewData.items.length; i++) {
              if (i <= 5) {
                //insert back tiks in here
                reviewsQuery += `
                   <div class="flex justify-center m-2 items-start">
                  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                 <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">User: ${reviewData.items[i].username}</h5>
                <h6 class="text-gray-900 text-xl leading-tight font-medium mb-2">Review: ${reviewData.items[i].title} </h6>
                <p class="text-gray-700 text-base mb-4">${reviewData.items[i].content}</p>
                 </div>
                </div>`
                console.log(reviewData);
              }
            }
            reviewsContainerEl.innerHTML = reviewsQuery;
            // console.log(reviewData);
          });
      }
    });
};


// getMovieApi();

submitbtnEl.addEventListener("click", getMovieApi);