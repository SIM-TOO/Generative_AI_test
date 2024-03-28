import React from 'react'

const VideoGenerator = () => {

    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [videoUrl, setVideoUrl] = useState('');

    const generateVideo = async () => {
        try {
            setIsLoading(true);

            const promptData = JSON.stringify({ prompt: prompt });

            const response = await fetch('http://localhost:5000/generate_video', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: promptData,
            });

            const data = await response.json();

            if (response.ok) {
                setVideoUrl(data.url);
            } else {
                console.error('Error:', data.error);
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="w-[90%] flex ml-auto mr-auto  items-center justify-center p-5">
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="비디오 설명 입력하세요"
                    className="w-full mb-4 p-2 border-2 border-gray-300 rounded-lg"
                />

                {isLoading ?
                    <div
                        onClick={generateVideo}
                        className="w-44 ml-4 mb-4 bg-gray-600 text-white font-bold py-2 px-4 rounded"
                    >
                        비디오 생성중
                    </div>
                    :
                    <button
                        onClick={generateVideo}
                        className="w-44 ml-4 mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        비디오 생성
                    </button>}


            </div>
            {isLoading &&
                <div className='w-full h-[1050px] border-2 border-gray-300'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1" stroke="currentColor" className="mt-[15%] animate-spin w-52 h-52 ml-auto mr-auto">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                    </svg>
                </div>}

            {videoUrl &&
                <div className='w-full h-[1050px] border-2 border-gray-300 rounded-lg overflow-y-auto'>
                    <video src={videoUrl} alt="생성된 비디오" controls className='mt-2 mb-2 ml-auto mr-auto' />
                </div>}
        </>
    )
}

export default VideoGenerator