import React, { Component } from 'react';
import SearchForm from './SearchForm';
import PhotoList from './PhotoList';
import Nav from './Nav';
import axios from 'axios';
import flickrAPIKey from '../config';

class Search extends Component {
  
  constructor() {
    super();
    this.state = {
      photos: [],
      loading: true
    };
  } 

  componentDidMount() {
    this.performSearch();
  }

  componentDidUpdate(newProps) {
    if (newProps.match.params.searchText !== this.props.match.params.searchText) {
      this.performSearch();
    }
  }

  changeRouteWithSearch = (searchText) => {
    this.props.history.push(`/search/${searchText}`)
  }

  performSearch = () => {
    const query = this.props.match.params.searchText;
    axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrAPIKey}&tags=${query}&per_page=24&format=json&nojsoncallback=1`)
      .then(response => {
        this.setState({
          photos: response.data.photos.photo,
          loading: false
        });
      })
      .catch(error => {
        console.log('Error fetching and parsing data', error);
      });    
  }
  
  render() {
    return(
      <div class="container">
        <SearchForm onSearch={this.changeRouteWithSearch} />
        <Nav />
        <div class="photo-container">
          {
            (this.state.loading)
            ? <p>Loading...</p>
            : <PhotoList data={this.state.photos} query={this.props.match.params.searchText} />
          }
        </div>
      </div>
    )
  }
}

export default Search;