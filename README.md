# liri-node-app

The LIRI Node app is a javascript terminal app that uses Node. It allows
users to query for the following information:

- music artist's upcoming vvents
- information about songs
- information about movies

There are four basic commands to use with this app:
1. 'concert-this'
2. 'spotify-this-song'
3. 'movie-this'
4. 'do-what-it-says'

The first command should be followed by an artists name. A list of the
next eight upcoming events (along with informatin about the venues) will
be returned.

The second command should be followed by the name of the song you wish
to learn more about. It will return information about the album from
which the song came, as well as the artist.

The third command shold be followed by the title of a movie for which
you wish to know more about. It will return the plot synoposis, as well
as ratings, and other useful information.

The fourth command does not need a follow-up query. It simply runs as is
by opening up a .txt file and using whatever search queries are found
in the file. In this example, it searches for the Backstreet Boy's
song called 'I Want It That Way'.

## Getting Started

To get this app to work you will need to clone the repo to your computer
and install the necessary packages through npm.

### Installation

Packages Required (installed through npm):
1. node-spotify-api
2. axios
3. moment
4. dotenv

While in terminal navigate to the cloned-repo and type 'npm i' followed
by a space and the name of the package. The list above is the
case-sensitive name of each of the packages.

### Built With

This app was built using the aforementioned packages, Visual Studio Code,
and Node.

### Authors

- Roman Verner (Independent Project)

### License

Creative Commons

### Acknowledgements

Big thanks to...
Quincy, the TAs for the program, and my classmates.