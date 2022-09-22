import axios from "axios";
// addQuestions getQuestions

export const GET_QUESTIONLIST= "GET_QUESTIONSLIST";
export const ADD_QUESTION= "ADD_QUESTION";

export function getQuestions() {
    return async function (dispatch) {
        const info = await axios.get("http://localhost:3001/questions",{ });
        return dispatch({
        type: GET_QUESTIONLIST,
        payload: info.data.data
    })
}}
export function addQuestions(data){
    return async function (dispatch){
        var info = await axios.post("http://localhost:3001/questions",data);
        return dispatch({
        type: ADD_QUESTION,
        payload: info.data
    })
}}
