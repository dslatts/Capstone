# Attitune

Attitune is a data visualization app that provides the user with a visualization of their musical profile and preferences. By pulling from Spotify's API, we are able to find a variety of metrics— including valence, energy, and danceability—regarding a user's music choices. We then render these metrics using D3 graphs in order to give users a deeper look at their musical identity, both over the course of time, as well as for a comparison to other users.

Attitune also provides the user with a more interactive experience with this data, namely the ability to create playlists based on these metrics. The metrics update over time, as users add or remove songs from their playlists, allowing users to build the perfect musical setting for the event that they were looking for.

We used React and Redux for the front end and we used D3, Victory and ReCharts to render our graphs directly on the DOM. For the back end, we built an Express server with a Sequelize database to receive requests with RESTful API and to persist user information, which we initially pull and compile from Spotify's RESTful API.

The result has come out to be more than just an app—it's a deeper look into the numbers behind the musical experience, and maybe an enhancement of future musical experiences for the user.

## URL and requirements

https://attitune.herokuapp.com/

Note: it is running on heroku server as a free project, so it might take upwards of 30 seconds to load up, since heroku takes down sites that aren't regularly used. Please refresh after about 20-30 seconds, and page should show properly.

You'll need to log in with a spotify account in order to use the application.

## Application Demonstration and Walkthrough

https://www.youtube.com/watch?v=FCaZk9QRk9s&t=2s

In our presentation, we give a walkthrough of the website, as well as go over some of the challenges that we ran into during development.

## Built With

* [Express.js](https://github.com/expressjs/express) - JS server side web framework
* [React.js](https://github.com/facebook/react) - JS UI library
* [Redux](https://github.com/reactjs/redux) - State container, not specifically meant for React.js, but largely used in tandem with React.js to contain current state of the application
* [D3](https://github.com/d3/d3) - JS Library for visualizing data
* [Victory](https://github.com/FormidableLabs/victory) - JS Library of composable React components used to build interactive data visualizations
* [ReCharts](https://github.com/recharts/recharts) - JS charts library built using D3 and React

## Contributing

* https://github.com/justinzhou93
* https://github.com/angelinojoe
* https://github.com/TheBenjimoto
* https://github.com/dslatts
