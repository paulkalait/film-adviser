var reviewsContainerEl = document.querySelector(".display-reviews");
var movieInput = document.querySelector("#input-field");
var movieFormEl = document.querySelector("#movieform");
var submitbtnEl = document.querySelector("#search-btn");

// Get the modal
//var modal = document.querySelector("#myModal");

// Get the button that opens the modal
//var btn = document.querySelector("#myBtn");

// Get the <span> element that closes the modal
//var span = document.querySelector(".close")[0];



var getMovieApi = function (event) {
  event.preventDefault();
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  console.log(movieInput.value);
  fetch(
    "https://imdb-api.com/en/API/SearchMovie/k_cp05hpvo/" + movieInput.value
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
        var reviewsApi = "https://imdb-api.com/en/API/Reviews/k_cp05hpvo/" + id;
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
                   <div class="flex justify-center m-2 items-start ">
                  <div class="block p-6 rounded-lg shadow-lg bg-white max-w-sm ">
                 <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">User: ${reviewData.items[i].username}</h5>
                <h6 class="text-gray-900 text-xl leading-tight font-medium mb-2">Review: ${reviewData.items[i].title} </h6>
                <img class="images" src="${moviedata.results[i].image}"/>
                <button id="myBtn">READ REVIEWS</button>
                      <div id="myModal" class="modal">
                      <div class="modal-content">
                      <span class="close">&times;</span>
                      <p class="text-gray-700 text-base mb-4 reviewText">${reviewData.items[i].content}</p>
                  </div>
                    </div>
                 </div>
                    </div>
                    ` 
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
// When the user clicks on the button, open the modal
//btn.onclick = function() {
//  modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }
submitbtnEl.addEventListener("click", getMovieApi);