import './App.css';
import { useState } from "react";
function App() {
  return (
    <div className="App">
        <h1>
          COUNT
        </h1>
          <Count/>
    </div>
  );
}

function Count(){
  const [count,countState] = useState(0);
  // console.log(count);
  let color = count>0 ? "rgba(0,227,0,1)" : count<0 ?  "rgba(255,0,0,1)" : "rgba(0,0,0,1)";
  return (
    <div>
      <div class="countShow" style={{color: color}}>{count}</div>
      <div>
        <button onClick = {()=>countState(count+1)}>Increate</button>
        <button onClick = {()=>countState(0)}>Reset</button>
        <button onClick = {()=>countState(count-1)}>Decreate</button>
      </div>
    </div>
  );
}
export default App;
