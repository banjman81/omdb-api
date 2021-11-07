import React, { Component} from 'react'
import axios from 'axios'
import MainMovieDetail from '../MainMovieDetail'
import '../../App.css';


export class MovieDetail extends Component {
    
    state = {
        title : "",
        poster: "",
        year: "",
        rating: "",
        runTime: "",
        isError : false,
        errorMessage: "",
        isLoading: false,
        apiKey : process.env.REACT_APP_API_KEY,
    }

    async componentDidMount() {
        this.setState({
            isLoading : true
        })

        console.log(this.props.match.params.id)

        try{
            let payload = await axios.get(`https://www.omdbapi.com/?apikey=${this.state.apiKey}&i=${this.props.match.params.id}`)
            console.log(payload.data)

            this.setState({
                title : payload.data.Title,
                poster: payload.data.Poster,
                year: payload.data.Year,
                rating: payload.data.imdbRating,
                runTime: payload.data.Runtime,
                isLoading : false
            })

        }catch(e){}
    }
    
    render(){
        return(
            <div className="App">
                {this.state.isLoading ? ("...Loading") : (
                    <div>
                        <h1>{this.state.title}</h1>
                        <img src={this.state.poster} alt="" />
                        <h3>{this.state.year}</h3>
                        <h3>{this.state.runTime}</h3>
                        <h3>{this.state.rating}</h3>
                    </div>
                )}
            </div>
        )
    }
}




export default MovieDetail