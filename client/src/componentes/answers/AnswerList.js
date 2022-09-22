import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getAnswerList, deleteAnswerItem} from "../../Controllers/Actions/answerActions";
import AnswerCreate from "./AnswerCreate";
import './AnswerList.css';
import AnswerEdit from "./AnswerEdit";

export default function AnswerList ({ questionId }) {

    const userInfo = useSelector(state => state.loginReducer.userInfo);
    const userId = userInfo.id;
    const dispatch = useDispatch();
    const answerList = useSelector(state => state.answerStore.answerList);
    const [showEditForm, setShowEditForm] = useState(false);
    const [answerEditId, setAnswerEditId] = useState(null);

    useEffect(() => {
        if (answerList.length === 0) {
            dispatch(getAnswerList(questionId));
        }
    }, [dispatch, questionId, answerList.length]);

    function handleShowEditForm(answerId) {
        setAnswerEditId(answerId);
        setShowEditForm(!showEditForm);
    }

    function handleHideEditForm() {
        setAnswerEditId(null);
        setShowEditForm(!showEditForm);
    }

    function handleDeleteAnswerItem(answerItem) {
        dispatch(deleteAnswerItem(answerItem));
    }

    function showCreateForm() {
        if(!userInfo || !userInfo.id) {
            return false;
        }
        const answerItem = answerList.find(item =>
            item.userId === userId
        )
        return !answerItem;
    }

    function renderAnswerItem(answerItem) {
        return (
            <div className='singleAnswer' key={answerItem.id}>
                <div className='singleAnswerTitle'>
                    <h3>Answer from {answerItem.user.userName}</h3>
                    <p>
                        <span><b>Rating:</b> {Number(answerItem.ratingAverage).toFixed(1)} </span>
                        <span>({answerItem.voteCount} votes) </span>
                        <span><b>Last update:</b> {answerItem.updatedAt}</span>
                    </p>
                </div>
                <p>{answerItem.answer}</p>
                {userId === answerItem.userId && !(showEditForm && answerEditId === answerItem.id) && (
                    <>
                        <button className="buttonAction"
                                onClick={() => handleShowEditForm(answerItem.id)}
                                disabled={showEditForm}
                        >
                            Edit
                        </button>
                        <button className="buttonCancel"
                        onClick={() => handleDeleteAnswerItem(answerItem)}
                        disabled={showEditForm}
                        >
                        Delete
                        </button>
                    </>
                )}
                {showEditForm && answerEditId === answerItem.id && (
                    <AnswerEdit userId={answerItem.userId}
                                questionId={questionId}
                                answerItem={answerItem}
                                handleAction={handleHideEditForm}
                                handleCancel={handleHideEditForm}
                    />
                )}
            </div>
        );
    }

    function renderAnswerList() {
        if (answerList.length === 0) {
            return (
                <div className='questionListContainer'>
                    <h3>The store is empty...</h3>
                </div>
            );
        }
        return (
            <div className='questionListContainer'>
                <h2>Answer List</h2>
                {answerList.map(item => renderAnswerItem(item))}
            </div>
        );
    }

    return (
        <div>
            {renderAnswerList()}
            {showCreateForm() &&
                <AnswerCreate userId={userId}
                              questionId={questionId}
                />
            }
        </div>
    );
}
