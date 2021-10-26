import MovieDetail from './MovieDetail'
import axios from 'axios'
import React, { Component } from 'react'
require('dotenv').config()



export class Movies extends Component {

    state = {
        title : "",
        poster: "",
        year: "",
        searchArray : ["Superman", "lord of the ring", "batman", "Pokemon", "Harry Potter", "Star Wars", "avengers", "Terminator"],
        movieArray: [],
        search : "",
        apiKey : process.env.REACT_APP_API_KEY,
        isError : false,
        errorMessage: "",
        isLoading: false,
    }

    async componentDidMount(){
        
        const ranNum = Math.floor(Math.random() * this.state.searchArray.length)

        this.fetchMovieApi(this.state.searchArray[ranNum])
    }

    fetchMovieApi = async (search) => {
        this.setState({
            isLoading : true
        })

        try{
            let result = await axios.get(`https://www.omdbapi.com/?apikey=${this.state.apiKey}&s=${search}`)
            console.log(result)
            if(result.data.Response === "False"){
                this.setState({
                    isError: true,
                    errorMessage : result.data.Error,
                    isLoading : false
                })
            }else{
                let movie = result.data.Search[Math.floor(Math.random() * result.data.Search.length)]
                this.setState({
                    title : movie.Title,
                    poster: movie.Poster,
                    year: movie.Year,
                    isLoading : false
                })
            }

        }catch(e) {
            console.log(e.response)
            if( e&& e.response.status === 404){
                this.setState({
                    isError : true,
                    errorMessage : e.response.data,
                    isLoading: false
                })
            }
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        }
        )
    }

    handleSearch = async () => {
        if(this.state.search.length === 0){
            this.setState({
                isError: true,
                errorMessage : "Please enter a title"
            })
        }
        else{
            this.fetchMovieApi(this.state.search)
        }
        
    }
    
    render(){
        return (
            <div>
                <div style={{margin : "10px"}}>
                    <input type="text" name="search" placeholder="title" value={this.state.search} onChange={this.handleOnChange}/>
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                <div>
                    {this.state.isError ? (<span style={{color : "red"}}>{this.state.errorMessage}</span>) : ""}
                </div>
                
                {this.state.isLoading ? ("...Loading") :
                    this.state.isError ? ("") :
                    <MovieDetail 
                        title = {this.state.title}
                        poster = {this.state.poster}
                        year = {this.state.year}
                    />
                }
            </div>
        )
    }
    
}

export default Movies
