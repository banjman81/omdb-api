import axios from "axios"
import React, { Component } from "react"
import { Link } from "react-router-dom"
require('dotenv').config()

export class Movies extends Component {
    state = {
        searchArray : ["Superman", "lord of the ring", "batman", "Pokemon", "Harry Potter", "Star Wars", "avengers", "Terminator"],
        isLoading: false,
        movieArray: [],
        apiKey : process.env.REACT_APP_API_KEY,
    }

    async componentDidMount() {
        const ranNum = Math.floor(Math.random() * this.state.searchArray.length)

        this.setState({
            isLoading: true,
        })
        try {
            let payload = await axios.get(`https://www.omdbapi.com/?apikey=${this.state.apiKey}&s=${this.state.searchArray[ranNum]}`)
        
            let movieIdArray = payload.data.Search.map((item) => item.imdbID)

            let promisedMovieArray = movieIdArray.map(async (item) => {
                return await axios.get(`https://www.omdbapi.com/?apikey=${this.state.apiKey}&i=${item}`)
            })

            Promise.all(promisedMovieArray)
                            .then((result) => {
                                this.setState({
                                    movieArray: result,
                                    isLoading : false
                                })
                                
                                console.log(this.state.movieArray)
                            })
                            .catch((e) => {
                                console.log(e)
                            })

            // console.log(resultArray)

        }catch(e){
            console.log(e)
        }
    }

    render(){
        return(
            <div className="App" style={{display : "flex", flexWrap : 'wrap'}}>
                {this.state.isLoading ? ("...Loading") : (
                    this.state.movieArray.map((item) => {
                        return (
                            <div key={item.data.imdbID} style={{margin: "20px", border: "1px solid gray", width: "350px", borderRadius: "10px", textDecoration : "none"}}>
                                <Link to={`/get-movie/${item.data.imdbID}`}>
                                    <table style={{margin : "0 auto", color: "black"}}>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <h2>{item.data.Title}</h2>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style={{textAlign : "center"}}>
                                                    <img src={item.data.Poster} alt="" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <h2>{item.data.Title}</h2>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Link>
                            </div>
                        )
                    })
                )}
            </div>
        )
    }
}