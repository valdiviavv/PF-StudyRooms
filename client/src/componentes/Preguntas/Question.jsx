//import comments from '../../recursos/comments.png'
//import views from '../../recursos/eye.png'
import upVote from '../../recursos/thumbs.png'
import stars from '../../recursos/star.png'
import {Link} from "react-router-dom";
import React from "react";


export default function Question({questionId, title, description, ratingAverage, voteCount}) {
    
    return(

    <div>
        <div className="row">
        <p>title:</p>   
        <p className="row"><Link to={`/questions/${questionId}`}>{title}</Link></p>
    
        <div className="col">
            <p>rating:</p>
            <p>{ratingAverage}</p>
            <img src={stars} alt="" height="20px" width="20px"/>
        </div>
        <div className="col">
             <p>votes:</p>
             <p>{voteCount}</p>
             <img src={upVote} alt="" height="20px" width="20px" />
        </div>
        <div className="row">
            <p>description:</p>
            <p>{description}</p>
        </div>
    </div>
    </div>


    );
}