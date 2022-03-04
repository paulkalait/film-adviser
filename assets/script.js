var reviewsContainerEl = document.querySelector(".search-container")
var movieInput = document.querySelector("#input-field")
var movieFormEl = document.querySelector("#movieform")

var getMovieApi = function () {
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  fetch("https://imdb-api.com/en/API/SearchMovie/k_jn3i9qrj/" + movieInput)
    .then(function (response) {
      // console.log(response)
      return response.json();
    })

    .then(function (moviedata) {
      //i want to nest the id var instead of tt1375666
      console.log(moviedata)
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
              reviewsContainerEl=``
            for(var i = 0; i < reviewData.items.length; i++){
                if( i <= 5){
                    //insert back tiks in here 
                    // reviewsQuery = `<div class="review">
                    // <h2 class="username">User: ${reviewData.items[i].username} </h2>
                    // <h3 class="username">User: ${reviewData.items[i].title} </h3>
                    //<a class="review-text>" ${reviewData.items[i].content}</a>
                    //</div>`
                    console.log(reviewData)
                }else{
                    return
                }
            }
            // console.log(reviewData);
          });
      }
    });
};
getMovieApi();



// https://imdb-api.com/api/#SearchTitle-header
// var requestOptions = {
//     method: 'GET',
//     redirect: 'follow'
//   };

//   fetch('https://imdb-api.com/en/API/SearchMovie/k_1234567/Inception 2010', requestOptions)
//     .then(response => response.text())
//     .then(result => console.log(result))
//     .catch(error => console.log('error', error));
