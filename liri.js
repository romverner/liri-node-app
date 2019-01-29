require("dotenv").config();

var fs      = require('fs');
var axios   = require("axios");
var Spotify = require('node-spotify-api');
var keys    = require("./keys.js");
var moment  = require('moment');
var arg     = process.argv[2];

var userEntry = [];

for (var i = 3; i < process.argv.length; i++) {
    userEntry.push(process.argv[i]);
};

var spotify = new Spotify(keys.spotify);

// Case-switch for user-commands
var mainLoop = function(arg) {

    switch(arg) {

        // Uses the bandsintown API to get event information
        case 'concert-this':

            userEntry = userEntry.join("%20").trim();

            axios
                .get("https://rest.bandsintown.com/artists/"
                    + userEntry
                    + "/events?app_id=codingbootcamp")
                
                .then(function(response) {
                    for (var i = 0; i < 8; i++) {
                        console.log(
                            "\nVenue: " 
                                + response.data[i].venue.name +
                            "\nLocation: " 
                                + response.data[i].venue.city
                                + ", " + response.data[i].venue.country +
                            "\nDate: " 
                                + moment(response.data[i].datetime).format("MM-DD-YYYY")
                                + "\n"
                        );
                    };
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
            
            if (typeof userEntry === 'array') {
                userEntry = userEntry.join("-").trim();
            } else if (userEntry.length == 0) {
                userEntry = "The-Sign";
            };

            spotify.search({ type: 'track', query: userEntry }, function(err, data) {
                if (err) {
                return console.log('Error occurred: ' + err);
                };
            
                console.log(
                    "\nArtist: " + data.tracks.items[0].artists[0].name +
                    "\nSong: " + data.tracks.items[0].name +
                    "\nPreview: " + data.tracks.items[0].preview_url +
                    "\nAlbum: " + data.tracks.items[0].album.name + "\n"
                );
            }); 
            
            break;

        case 'movie-this':

            if (userEntry.length != 0) {
                userEntry = userEntry.join("+").trim();
            } else {
                userEntry = "Mr.+Nobody";
            };

            axios.get('http://www.omdbapi.com/?apikey=9f6a6d94&t=' + userEntry)
                .then(function (response) {
                    console.log(
                        "\n Title: " + response.data.Title +
                        "\n Released: " + response.data.Year +
                        "\n IMDB Rating: " + response.data.imdbRating +
                        "\n Rotten Tomatoes: " + response.data.Ratings[1].Value +
                        "\n Country: " + response.data.Country +
                        "\n Plot: " + response.data.Plot +
                        "\n Actors/Actresses: " + response.data.Actors + "\n"
                    );
                })
                .catch(function (error) {
                    console.log(error);
                });
            break;

        case 'do-what-it-says':
            fs.readFile('random.txt', function(err, data) {
                var local = data.toString();
                local = local.split(",");

                userEntry = local[1];
                mainLoop(local[0]);
            });
            break;
    };
};

mainLoop(arg)