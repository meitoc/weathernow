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
  const [game,gameState] = useState(0); //0: play, 1: result, 2: stop
  const [hand,handState] = useState(0); //0: not, 1-3: rock, paper, scissors
  const [hand2nd, hand2ndState] = useState(0);
  const [referee, refereeState] = useState('Hãy chọn "búa", "báo" hoặc "kéo"');

  const buttonColor = [{backgroundColor:"green"},{backgroundColor:"green"},{backgroundColor:"green"}];
  if (hand>0) buttonColor[hand-1].backgroundColor = "red";
  let handIcon = game ? choseHandIcon(hand) : "";
  let hand2ndIcon = game ? choseHandIcon(hand2nd) : "";
  let buttonRestart;
  buttonRestart = game===0 ? <button onClick = {startGame}>RA TAY</button> : <button onClick = {resetGame}>CHƠI LẠI</button>;
  if(game === 1) {
    gameState(2);
    setTimeout(() => {
      const compare = hand-hand2nd;
      const compareShow = compare>0 ? ( compare%2 ? "Bạn thắng" : "Bạn thua") : compare<0 ? ( compare%2 ? "Bạn thua" : "Bạn thắng") : "Hòa nhau rồi!";
      refereeState(compareShow);
    }, 600);
  }

  function rockPaperScissors(input){
  handState(input);
  }

  function resetGame(){
    handState(0);
    gameState(0);
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
        gameState(1);
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
        <ChoseButton index={1} click={game===0} />
        <ChoseButton index={2} click={game===0} />
        <ChoseButton index={3} click={game===0} />
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
