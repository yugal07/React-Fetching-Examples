import { useState } from "react";
const Child = ({setCount}) => {
    return <div>
        <button onClick={() => setCount((prevCount) => prevCount + 1) }>+</button>
        <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
    </div>
}

const Parent = () => {
    const [count , setCount] = useState(0);
    return <div>
        <h1>{count}</h1>
        <Child setCount={setCount} />
    </div>
}

export default Parent;