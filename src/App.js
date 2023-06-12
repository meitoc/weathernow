import './App.css';
import { useState } from "react";
function App() {
  return (
    <div className="App">
        <h1>
          OẢNH TÙ TÌ
        </h1>
          <Count/>
    </div>
  );
}

function Count(){
  const [hand,handState] = useState(0);
  const [hand2nd, hand2ndState] = useState(0);
  const [game,gameState] = useState(false);
  // let [hand2nd, hand2ndState] = useState(0);
  const [referee, refereeState] = useState('Hãy chọn "búa", "báo" hoặc "kéo"');
  function rockPaperScissors(input){
  handState(input);
  }
  const buttonColor = [{backgroundColor:"green"},{backgroundColor:"green"},{backgroundColor:"green"}];
  if (hand>0) buttonColor[hand-1].backgroundColor = "red";
  let handIcon = game ? choseHandIcon(hand) : "";
  let hand2ndIcon = game ? choseHandIcon(hand2nd) : "";
  let buttonRestart;
  buttonRestart = !game ? <button onClick = {startGame}>RA TAY</button> : <button onClick = {resetGame}>CHƠI LẠI</button>;
  function resetGame(){
    handState(0);
    gameState(false);
    refereeState('Hãy chọn "búa", "bao" hoặc "kéo"');
  }
  function startGame(){
    if(hand!==0) {
      refereeState("Oảnh tù tì");
      setTimeout(() => {
        refereeState("Ra cái gì");
      }, 600);
      setTimeout(() => {
        refereeState("Ra cái này");
        let hand2 = Math.floor(Math.random() * 3) + 1;
        hand2ndState(hand2);
        gameState(true);
        setTimeout(() => {
          let compare = hand-hand2;
          let compareShow = compare>0 ? ( compare%2 ? "Bạn thắng" : "Bạn thua") : compare<0 ? ( compare%2 ? "Bạn thua" : "Bạn thắng") : "Hòa nhau rồi!";
          refereeState(compareShow);
        }, 600);
      }, 1200);
    }
  }
  function ChoseButton(props){
    if(props.click) return (<button style = {buttonColor[props.index-1]} onClick = {()=>rockPaperScissors(props.index)}>{choseHandIcon(props.index)}</button>);
    else return (<button style = {buttonColor[props.index-1]}>{choseHandIcon(props.index)}</button>);
  }
  return (
    <div className="container">
      <div clsss="chooseShow">
        <ChoseButton index={1} click={!game} />
        <ChoseButton index={2} click={!game} />
        <ChoseButton index={3} click={!game} />
      </div>
      <div>
        {buttonRestart}
      </div>
      <div className="hand"><div className="handShow">{handIcon}</div></div>
      <div className="referee">Trọng tài:<br></br>{referee}</div>
      <div className="hand"><div className="handShow">{hand2ndIcon}</div></div>
    </div>
  );
}

function choseHandIcon(input){
  return input===1 ? "👊" : input===2 ?  "✋" : input===3 ? "✌" : "";
}
export default App;
