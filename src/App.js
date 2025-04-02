import React from 'react';
import './App.css';
import requests from './requests';
import Row from "./Row";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  return (
    <div className="app">
      <Nav />
      <Banner />
      <Row
        title="Top picks by Sahil"
        fetchUrl={requests.fetchTrending}
        isLargeRow={true}
      />
      <Row title="Most Viewed" fetchUrl={requests.fetchTopRated} />
      <Row title="Trending Now" fetchUrl={requests.fetchNetflixOriginals} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Romance Movies" fetchUrl={requests.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
      
    </div>
  );
}

export default App;
