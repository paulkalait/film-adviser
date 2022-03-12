var reviewsContainerEl = document.querySelector(".display-reviews");
var movieInput = document.querySelector("#input-field");
var movieFormEl = document.querySelector("#movieform");
var submitbtnEl = document.querySelector("#search-btn");
var movieArray = []
var movieContainer = document.querySelector(".search-container")
var movieHistory = ""
var historyButtons = document.querySelector(".history-buttons")

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
  console.log(movieArray)
  for (var i = 0; i < movieArray.length; i++) {
    var pastMovies = document.createElement("button");
    pastMovies.setAttribute("style","padding: 5px 15px; margin: 1.2%; font-size: 1.00rem; display: inline-block; border-radius: 25px;" )
    pastMovies.setAttribute('data-name', movieArray[i])
    pastMovies.className = "list-of-movies"
    pastMovies.textContent = movieArray[i]
    historyButtons.appendChild(pastMovies);
  }

}


var pastMoviesEl = document.querySelectorAll(".list-of-movies")
for(var i = 0; i < pastMoviesEl.length; i++){
  // pastMovieEl[i].textContent
  pastMoviesEl[i].addEventListener("click", getMovieApiHistory);

}

var formSubmitHandlerHistory = function(event){

  event.preventDefault();

  var btn = event.target
  console.log(btn)
  userInput = btn.getAttribute("data-name")
  console.log(userInput)
    
  historyButtons.innerHTML = ""
  movieContainer.innerHTML = ""
  console.log(historyButtons)
console.log(movieArray)
  console.log(movieContainer)
  
    if (userInput){
      getMovieApiHistory(userInput);
      movieInput.value = ""
    }else{
      alert("Please enter a Movie")
    }
}

//local storage function ends 

var getMovieApi = function () {
  // event.preventDefault();
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  console.log(movieInput.value);
  fetch(
    // k_sm01cn32
    "https://imdb-api.com/en/API/SearchMovie/k_efe222hb/" + movieInput.value
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
        //third key k_efe222hb
        var reviewsApi = "https://imdb-api.com/en/API/Reviews/k_efe222hb/" + id;
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

var getMovieApiHistory = function (userInput) {
  
  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  fetch(
    "https://imdb-api.com/en/API/SearchMovie/k_efe222hb/" + userInput
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
        var reviewsApi = "https://imdb-api.com/en/API/Reviews/k_efe222hb/" + id;
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

historyButtons.addEventListener("click",formSubmitHandlerHistory)

submitbtnEl.addEventListener("click", getMovieApi);