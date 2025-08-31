import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className="max-w-5xl mx-auto p-8 text-center">
            {/* Logos */}
            <div className="flex justify-center gap-8">
                <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                    <img
                        src={viteLogo}
                        alt="Vite"
                        className="h-24 w-auto p-6 transition hover:drop-shadow-[0_0_2em_#646cffaa]"
                    />
                </a>
                <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                    <img
                        src={reactLogo}
                        alt="React"
                        className="h-24 w-auto p-6 transition hover:drop-shadow-[0_0_2em_#61dafbaa] animate-spin-slow"
                    />
                </a>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold mt-6">Vite + React</h1>

            {/* Card */}
            <div className="bg-zinc-800 p-8 rounded-xl shadow-lg mt-8 inline-block">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
                >
                    count is {count}
                </button>
                <p className="mt-4 text-gray-300">
                    Edit <code className="bg-gray-800 px-1 py-0.5 rounded">src/App.tsx</code> and
                    save to test HMR.
                </p>
            </div>

            {/* Footer */}
            <p className="mt-6 text-gray-400">Click on the Vite and React logos to learn more</p>
        </div>
    );
}

export default App;
