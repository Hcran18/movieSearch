// The IMDB API has recently been updated and now requires AWS
// This code will not work without AWS
// I have included a link to the new API documentation in the README.md file

document.getElementById("movieSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("movieInput").value;
  if (value === "")
    return;
  console.log(value);
  const url = "https://imdb-api.com/en/API/SearchMovie/k_3aqst5sb/" + value;
  var ID;
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
        ID = json.results[0].id;
        console.log(ID);
        const url2 = "https://imdb-api.com/en/API/FullCast/k_3aqst5sb/" + ID;
        
      let results = "";
      
      results += "<h2 class=title>" + json.results[0].title; + "<h2/>";
      results += "<div></div>";
      results += "<img src=" + json.results[0].image + " class=poster>";
     
      document.getElementById("movieResults").innerHTML = results;
      
    fetch(url2)
    .then(function(response) {
        return response.json();
    }).then(function(json) {	
        let results = "";
        
        results += "<h2>" + json.directors.job + "</h2>";
        for (let i = 0; i < json.directors.items.length; i++) {
            results += "<p>" + json.directors.items[i].name + "</p>"
            
        }
        document.getElementById("movieResults").innerHTML += results;
        results = "";
        
        results += "<h2>Cast</h2>";
        
        for (let i = 0; i < json.actors.length; i++) {
            results += "<p>" + json.actors[i].name + " -- " + json.actors[i].asCharacter + "<p/>";
            
        }
        document.getElementById("movieResults").innerHTML += results;
    })
    .catch(err => alert(err));
    })
    .catch(err => alert(err));
    
    
    
});
