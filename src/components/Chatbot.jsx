import React, { useState } from 'react';

const Chatbot = () => {
   const [messages, setMessages] = useState([]);
   const [userInput, setUserInput] = useState('');
   const [loading, setLoading] = useState(false);

   const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
   const apiEndpoint = 'https://api.openai.com/v1/chat/completions';

   const addMessage = (sender, message) => {
      setMessages(prevMessages => [...prevMessages, { sender, message }]);
   };

   const handleSendMessage = async () => {
      const message = userInput.trim();
      if (message.length === 0) return;

      addMessage('user', message);
      setUserInput('');
      setLoading(true);

      try {
         const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
               model: 'gpt-3.5-turbo',
               messages: [{ role: 'user', content: message }],
               max_tokens: 1024,
               top_p: 1,
               temperature: 1,
               frequency_penalty: 0.5,
               presence_penalty: 0.5,
               stop: ['문장 생성 중단 단어'],
            }),
         });

         const data = await response.json();
         const aiResponse = data.choices?.[0]?.message?.content || 'No response';
         addMessage('bot', aiResponse);
      } catch (error) {
         console.error('오류 발생!', error);
         addMessage('오류 발생!');
      } finally {
         setLoading(false);
      }
   };

   const handleKeyDown = (event) => {
      if (event.key === 'Enter') {
         handleSendMessage();
      }
   };

   return (
      <>
         <div className='mt-5 w-[90%] h-[1000px] ml-auto mr-auto border-2 border-gray-300 rounded-lg overflow-y-auto'>
            {loading && <span className="messageWait bg-blue-100 text-blue-800 font-semibold py-2 px-4 rounded">답변을 기다리고 있습니다...</span>}
            <div className="messagesContainer space-y-2 p-4">
               {messages.map((msg, index) => (
                  <div key={index} className={`message ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'} p-2 rounded shadow`}>
                     {`${msg.sender === 'user' ? '나' : '챗봇'}: ${msg.message}`}
                  </div>
               ))}
            </div>
         </div>

         <div className="flex items-center justify-center p-5 w-[90%] ml-auto mr-auto">
            <input
               type='text' placeholder='메시지를 입력하세요'
               className="w-full mb-4 p-2 border-2 border-gray-300 rounded-lg"
               value={userInput} onChange={(e) => setUserInput(e.target.value)}
               onKeyDown={handleKeyDown}
            />
            <button className=" w-44 ml-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSendMessage}>전송</button>
         </div>
      </>
   );
};

export default Chatbot;
