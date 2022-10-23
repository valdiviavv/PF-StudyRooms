import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Filters from "./Filters";
import NavBar from "../NavBar/NavBar";
// import "../../CssAdicional/Home.css"
import Question from "../Preguntas/Question";
import { getQuestions } from "../../Controllers/Actions/questionsActions";
import '../../CssAdicional/QuestionsCss.css'
import Footer from '../Footer/Footer'
import { Navigate } from "react-router-dom";


const Home = () => {

  const token = useSelector((state) => state.loginReducer.token)
  const dispatch = useDispatch();

  const allQuestions = useSelector((state) => state.questionReducer.allQuestions.data)

  useEffect(() => {
    dispatch(getQuestions())
  }, [dispatch]);


  return (
    !token ? <Navigate to="/" replace={true} /> :
      <div className="">
        <div className="row m-0 p-0 sticky-top">
          <NavBar />
        </div>
        <div className="row m-0 p-0 h-75">
          <div className="col-2 p-0 m-0">
            <div className="row m-0 p-0 sticky">
              <Filters />
            </div>
            <div className="row m-0 p-0">
              <Link to="/Home" className="text-decoration-none m-0 p-0">
                <div className="col d-flex w-100 mt-5 justify-content-center ">

                </div>
              </Link>
            </div>
          </div>
          <div className="col p-1 m-0 ">
            {allQuestions && allQuestions.length ?
              allQuestions.map((e, id) => {
                return (
                  <div key={id} className=" colQuestions">
                    <Link to={`/QuestionDetail/${e.id}`}>
                      <Question key={e.id} title={e.title} description={e.description} ratingAverage={e.ratingAverage} ratingCount={e.ratingCount} likes={e.votesxquestions.length} userId={e.user.userName} categories={e.categories}> </Question>
                    </Link>
                  </div>

                )
              }) : <div>
                <h1 style={{ color: "white" }}> your search criteria did not match any filters </h1>
              </div>
            }
          </div>
        </div>
        <Footer />
      </div>
  );
}

export default Home;