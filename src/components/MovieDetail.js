import React from 'react'

function MovieDetail(props) {
    return (
        <div style={{display : "flex", justifyContent : "center"}}>
            <table style={{textAlign : "center", border : "1px solid black", padding : "10px", margin : "15px", borderRadius : "10px", backgroundColor : "#defbf8"}}>
                <tbody>
                    <tr>
                        <td>
                            <h3 style={{margin : "3px"}}>{props.title}</h3>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src={props.poster} alt="" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <h4 style={{margin : "3px"}}>Year: {props.year}</h4> 
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default MovieDetail
