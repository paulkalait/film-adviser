
var getMovieApi = function(){

    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
       
      fetch('https://imdb-api.com/en/API/SearchMovie/k_jn3i9qrj/Inception', requestOptions)
        .then(function(response){
            console.log(response)
            return response.json()
        })

        .then(function(data){
            //i want to nest the id var instead of tt1375666
            var id = results[0].id
                                                                     //id = is this
            var reviewsApi = "https://imdb-api.com/en/API/Reviews/k_jn3i9qrj/tt1375666"
            fetch(reviewsApi)
            .then(function(data){
                return response.json()
            })
            .then(function(data){
                console.log(data)
            })
        })

        getMovieApi();
    }


    // https://imdb-api.com/api/#SearchTitle-header
    // var requestOptions = {
    //     method: 'GET',
    //     redirect: 'follow'
    //   };
       
    //   fetch('https://imdb-api.com/en/API/SearchMovie/k_1234567/Inception 2010', requestOptions)
    //     .then(response => response.text())
    //     .then(result => console.log(result))
    //     .catch(error => console.log('error', error));