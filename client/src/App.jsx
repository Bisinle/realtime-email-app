import { useState } from "react";

import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className=" bg-black">
            <h1 className=" text-yellow-900">react laraaa</h1>
            <h1 className=" text-green-900">react laraaa</h1>
        </div>
    );
}

export default App;
