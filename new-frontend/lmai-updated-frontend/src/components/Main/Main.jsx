import React, { useContext, useState } from 'react';
import UploadPdf from './UploadPdf';
import { assets } from '../../assets/assets';
import './Main.css';
import UploadLink from './UploadLink';
import { Context } from '../../context/Context';

const Main = () => {
    const [isUpload2Open, setIsUpload2Open] = useState(false);
    const [isUpload1Open, setIsUpload1Open] = useState(false);

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input, suggestedQuestions, handleSuggestedQuestionClick } = useContext(Context);

    const handleCardClick1 = () => {
        setIsUpload1Open(true);
    };

    const handleCloseUpload1 = () => {
        setIsUpload1Open(false);
    };

    const handleUploadSuccess1 = () => {
        setIsUpload1Open(false);
        // Additional actions you want to perform on successful upload of link
    };

    const handleCardClick2 = () => {
        setIsUpload2Open(true);
    };

    const handleCloseUpload2 = () => {
        setIsUpload2Open(false);
    };

    const handleUploadSuccess2 = () => {
        setIsUpload2Open(false);
        // Additional actions you want to perform on successful upload
    };

    return (
        <>
            <div className='main'>
                <div className='nav'>
                    <p>LastMinute.ai</p>
                    <img src={assets.user_icon} alt="" />
                </div>

                <div className="main-container">

                    {!showResult
                        ? <>
                            <div className="greet">
                                <p><span>Hello,</span></p>
                                <p>How can I be of use?</p>
                            </div>

                            <div className="cards">

                                <div className="card" onClick={handleCardClick1}>
                                    <p>Provide a video lecture URL</p>
                                    <img src={assets.yt_icon} alt="" />
                                </div>

                                <div className="card" onClick={handleCardClick2}>
                                    <p>Upload a .pdf file</p>
                                    <img src={assets.pdf_icon} alt="" />
                                </div>
                            </div>
                        </>
                        : <div className="result">
                            <div className="result-title">
                                <img src={assets.user_icon} alt="" />
                                <p>{recentPrompt}</p>
                            </div>
                            <div className='result-data'>
                                <img src={assets.gemini_icon} alt="" />
                                {loading
                                    ? <div className='loader'>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                        <div className="dot"></div>
                                    </div>
                                    : <div>
                                        <p>{resultData}</p>
                                        {loading
                                            ? <div className='loader'>
                                                <div className="dot"></div>
                                                <div className="dot"></div>
                                                <div className="dot"></div>
                                            </div>
                                            : <div className="suggested-questions">
                                                {suggestedQuestions.length > 0 && (
                                                    <div>
                                                        <h3>Suggested Questions</h3>
                                                        {suggestedQuestions.map((question, index) => (
                                                            <button
                                                                key={index}
                                                                onClick={() => handleSuggestedQuestionClick(question)}
                                                                className='suggested-question'
                                                            >
                                                                {question}
                                                            </button>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>}

                                    </div>}

                            </div>
                        </div>
                    }

                    <div className="main-bottom">
                        <div className="search-box">
                            <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Enter a prompt to chat with your data...' />
                            <div>
                                <img onClick={() => onSent()} src={assets.send_icon} alt='' />
                            </div>
                        </div>
                        <p className='bottom-info'>
                            Random footer text just for fun
                        </p>
                    </div>
                </div>
            </div>
            {isUpload1Open && (
                <UploadLink onClose={handleCloseUpload1} onUploadSuccess1={handleUploadSuccess1} />
            )}
            {isUpload2Open && (
                <UploadPdf onClose={handleCloseUpload2} />
            )}
        </>
    )
}

export default Main;
