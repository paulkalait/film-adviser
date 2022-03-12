var reviewsContainerEl = document.querySelector(".display-reviews");
var movieInput = document.querySelector("#input-field");
var movieFormEl = document.querySelector("#movieform");
var submitbtnEl = document.querySelector("#search-btn");
var movieArray = []
var movieContainer = document.getElementById("search-history")
var movieHistory = ""


//local storage function starts
var movieArray = JSON.parse(localStorage.getItem("movies")) || []
var searchHistory = function () {

  var i = 0
  if(movieArray.length === 0) {
    movieArray = []
  }

  if(!movieArray.includes(movieInput.value)) {
    movieArray.push(movieInput.value)
    localStorage.setItem("movies", JSON.stringify(movieArray));
  }
  for (var i = 0; i < movieArray.length; i++) {
    var pastMovies = document.createElement("button");
    pastMovies.setAttribute("style","padding: 3px; margin: 2%; font-size: 2.00vh" )
    pastMovies.setAttribute('data-name', movieArray[i])
    pastMovies.className = "list-of-movies"
    pastMovies.textContent = movieArray[i]
    movieContainer.appendChild(pastMovies);
  }

  
}


var pastMoviesEl = document.querySelectorAll(".list-of-movies")
for(var i = 0; i < pastMoviesEl.length; i++){
  // pastMovieEl[i].textContent
  pastMoviesEl[i].addEventListener("click", getMovieApi);

}

var formSubmitHandlerHistory = function(event){

  event.preventDefault();

  var btn = event.target
  console.log(btn)
  movieInput = btn.getAttribute("data-name")
    
    if (movieInput){
      getMovieApi(movieInput);
      movieInput.value = ""
    }else{
      alert("Please enter a City")
    }
    searchHistory();
}

//local storage function ends 

var getMovieApi = function (event) {
  event.preventDefault();
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  console.log(event.target)
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

                <div class="flex items-center justify-center h-full">
                <button class="py-2 px-4  text-white rounded reviewBtn " id= "myBtn" data-i=${i} data-description="${reviewData.items[i].content}" >READ REVIEWS</button>
              </div>

                
                      
                 
                 </div>
                    </div>
                   
                    `

              }
            }
            reviewsContainerEl.innerHTML = reviewsQuery;
            // console.log(reviewData);



            var reviewBtn = document.querySelectorAll(".reviewBtn")
            for (var i = 0; i < reviewBtn.length; i++) {
              reviewBtn[i].addEventListener("click", function () {
                document.getElementById('modal').classList.toggle('hidden')
                //  var i = this.getAttribute("data-i")

                document.querySelector(".description").innerHTML = this.getAttribute("data-description")
              })
            }
          });
      }
    });
    searchHistory();
};


//modal
function toggleModal(event) {
  document.getElementById('modal').classList.toggle('hidden')
  var i = this.getAttribute("data-i")

  document.querySelectorAll(".description")[i].innerHTML = this.getAttribute("data-description")

}

//local storage

movieContainer.addEventListener("click",formSubmitHandlerHistory)

movieFormEl.addEventListener("submit", getMovieApi);