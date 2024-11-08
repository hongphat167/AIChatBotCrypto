import React, { useState } from 'react';
import PromptMessage from './PromptMessage';
import ResponseMessage from './ResponseMessage';
import axios from 'axios';

const Chatbot = () => {
    const [response, setResponse] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showWelcome, setShowWelcome] = useState(true);
    const [error, setError] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const handleFetchCoinDetails = async (prompt) => {
        setLoading(true);
        setError(false);
        try {
            const { data } = await axios.post("https://treadingplatform-production.up.railway.app/ai/chat", { prompt });
            const botResponse = { message: data.message, type: 'bot' };
            setResponse(prev => [...prev, botResponse]);
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError(true);
            }
        }
        setLoading(false);
    };

    const handleSendMessage = () => {
        if (inputValue.trim()) {
            const userMessage = { message: inputValue.trim(), type: 'user' };
            setResponse(prev => [...prev, userMessage]);
            handleFetchCoinDetails(inputValue.trim());
            setShowWelcome(false);
            setError(false);
            setInputValue('');
        }
    };

    return (
        <div className="chatbox-container" style={{ width: '800px', margin: '0 auto' }}>
            {/* Header */}
            <div className="chatbox-header">
                <h1 className="chatbox-title">Chat bot</h1>
                <span className="status-indicator">• Online</span>
                <img className="header-avatar" src="https://cdn.pixabay.com/photo/2023/05/29/18/53/cyborg-8026949_640.jpg" alt="Bot" />
            </div>

            {/* Chat Messages */}
            <div className="chatbox-messages">
                {response.map((item, index) => (
                    item.type === 'bot' ? (
                        <div className="message-bot" key={index}>
                            <img src="https://cdn-icons-png.freepik.com/256/2814/2814666.png?ga=GA1.1.109364194.1730991071&semt=ais_hybrid" alt="Bot" className="message-avatar" />
                            <PromptMessage message={item.message} />
                        </div>
                    ) : (
                        <div className="message-user" key={index} style={{ textAlign: 'right' }}>
                            <ResponseMessage message={item.message} />
                        </div>
                    )
                ))}

                {loading && (
                    <div className="message-bot">
                        <div className="loading-indicator">...</div>
                    </div>
                )}

                {error && (
                    <div className="message-bot error-message">
                        AI ngủ chưa dậy vui lòng nhập lại
                    </div>
                )}

                {showWelcome && (
                    <div className="welcome-message">
                        <p>Chào mừng tới Crypto Chatbot</p>
                        <p>Hỏi về dữ liệu thị trường</p>
                    </div>
                )}
            </div>

            {/* Input Section */}
            <div className="chatbox-input-section">
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            handleSendMessage();
                        }
                    }}
                    type="text"
                    className="chatbox-input"
                    placeholder="Type Message"
                />
                <button className="send-button" onClick={handleSendMessage}>
                    <img src="https://cdn-icons-png.freepik.com/256/11121/11121740.png?ga=GA1.1.109364194.1730991071&semt=ais_hybrid" alt="Send" />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
