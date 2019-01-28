require("dotenv").config();

var axios   = require("axios");
var Spotify = require('node-spotify-api');
var keys    = require("./keys.js");
var arg     = process.argv[2];

// Case-switch for user-commands
switch(arg) {

    // Uses the bandsintown API to get event information
    case 'concert-this':

        var artist = [];

        for (var i = 3; i < process.argv.length; i++) {
            artist.push(process.argv[i]);
        };

        artist = artist.join("-").trim();
        console.log(artist);

        axios
            .get("https://rest.bandsintown.com/artists/"
                + artist
                + "/events?app_id=codingbootcamp")
            
            .then(function(response) {
                console.log(response);
            })

            .catch(function(error) {
                if(error.response) {
                    console.log(error.response);
                };
                console.log(error.request);
            });
        break;

    // Uses Node-Spotify-API to acquire Artist + Song information
    case 'spotify-this-song':
        
        var spotify = Spotify(keys.Spotify);

        var song = [];

        for (var i = 3; i < process.argv.length; i++) {
            song.push(process.argv[i]);
        };

        song = song.join("-").trim();
        console.log(song);

        spotify.search({ type: 'track', query: song }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            console.log(data); 
        });    
        break;

    case 'movie-this':
        break;
    case 'do-what-it-says':
        break;
}