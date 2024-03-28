import React, { useState } from 'react';
import axios from 'axios';

function ImageGenerator() {
    const [prompt, setPrompt] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const generateImage = () => {
        setIsLoading(true)
        axios
            .post(
                'https://api.openai.com/v1/images/generations',
                {
                    model: "dall-e-3",
                    prompt: prompt,
                    // n: 1,
                    size: '1024x1024',
                },
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
                        'Content-Type': 'application/json',
                    },
                }
            )
            .then((response) => {
                setIsLoading(false)
                const imageUrl = response.data.data[0].url;
                setImageUrl(imageUrl);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>
            <div className="w-[90%] flex ml-auto mr-auto  items-center justify-center p-5">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="이미지 설명 입력하세요"
                    className="w-full mb-4 p-2 border-2 border-gray-300 rounded-lg"
                />

                <button
                    onClick={generateImage}
                    className="w-44 ml-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    이미지 생성
                </button>
            </div>
            {isLoading &&
                <div className='w-full h-[1050px] border-2 border-gray-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="mt-[15%] animate-spin w-52 h-52 ml-auto mr-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>}

            {imageUrl &&
                <div className='w-full h-[1050px] border-2 border-gray-300 rounded-lg overflow-y-auto'>
                    <img src={imageUrl} alt="생성된 이미지" className='mt-2 mb-2 ml-auto mr-auto' />
                </div>}
        </>
    );
}

export default ImageGenerator;
