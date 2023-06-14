import './App.css';
import { useState } from "react";
const listFromServer=[
  {id: 1, note:"Ăn phở bò", done: true},
  {id: 2, note: "Ăn cơm gà quán bà Năm", done: false},
  {id: 3, note: "Ăn cơm mẹ nấu", done: false},
  {id: 4, note: "Ăn hết cả thế giới", done: false},
];

function App() {
  
  return (
    <div className="App">
          <Render/>
    </div>
  );
}


function Render(){
  const [localList,localListState] = useState(listFromServer.map((e)=>{return {...e, changing: false, newNote: e.note}}));
  const [renderFlag,renderFlagState] = useState(true);//use this userState because React can't detect when element inside localList change
  const [renderDoneOnly,renderDoneOnlyState] = useState(true);
  return(
  <div className="todoListContainer">
    <h1>Todo List</h1>
    <ShowDone/>
    <RenderList list={localList} doneOnly={renderDoneOnly}/>
    <AddTodo list={localList}/>
  </div>
  );

  //=========== Function for Child components

  function ShowDone(){
    return (<div className="showDone"><input type="checkbox" defaultChecked={renderDoneOnly} onChange={()=>renderDoneOnlyState(!renderDoneOnly)}/>Don't show done tags</div>);
  }

  function AddTodo({list, valueInput}){
    let newItem = null;
    let maxId = list.reduce((max, e) => e.id > max ? e.id : max, 0);
    let newId=maxId+1;
    function addItem(){
      if(newItem!==null) list.push(newItem);;
      localListState(list);
      renderFlagState(!renderFlag);

    }
    function changeAddItem(event,idInput){
      let value = event.target.value
      newItem={id: newId, note: value, done: false, changing: false, newNote: value}

    }
    return (
      <div className="addTodoContainer">
        <div className="addItem">
          <input id={`addItem-${newId}`} className="listItemInput blur" defaultValue={valueInput} onChange={(event)=>changeAddItem(event,newId)}/>                 
          <div className="listItemButtons">
            <button onClick={addItem}>Add</button>
          </div>
        </div>
      </div>
    );
  }

  function RenderList({list, doneOnly}){
    return (
      <div key="listContainerId" className="listContainer">
      {list.length?
        (list.map(
            (e)=>{
              if(!(doneOnly && e.done)) return (
                <div key={e.id} id={`listItem-${e.id}`} className="listItem">
                {(<input type="checkbox" id={`doneItem-${e.id}`} defaultChecked={e.done} onChange={()=>reverseDone(e.id)}/>)}
                {e.changing?
                  (<input id={`changingItem-${e.id}`} className="listItemInput blur" defaultValue={e.newNote} onChange={(event)=>changeItem(event,e.id)}/>)
                  :
                  (<div className={`listItemInput centerChild${e.done? " done":""}`}>{e.note}</div>)
                }
                <div className="listItemButtons">
                  {e.changing?(<button onClick={()=>saveItem(e.id)}>Save</button>):(<button onClick={()=>editItem(e.id)}>Edit</button>)}
                  <button onClick={()=>deleteItem(e.id)}>Delete</button>
                </div>
              </div>
              )
              else return "";
            }
          )
        )
      :<h2>Empty Todo List</h2>}
    </div>
    );
  }

  //========Function for click button

  function reverseDone(idInput){
    let index = localList.findIndex(e => e.id === idInput);
    if (index !== -1) {
      localList[index].done = !localList[index].done;
      localListState(localList);
      renderFlagState(!renderFlag);
    }
  }
  function changeItem(event,idInput){
    let index = localList.findIndex(e => e.id === idInput);
    if (index !== -1) {
      localList[index].newNote = event.target.value;
      localListState(localList);
      // renderFlagState(!renderFlag);
    }
  }
  function editItem(idInput){
    let index = localList.findIndex(e => e.id === idInput);
    if (index !== -1) {
      localList[index].changing = true;
      localListState(localList);
      renderFlagState(!renderFlag);
    }
  }
  function deleteItem(idInput){
    let newLocalList=localList.filter(e=>e.id!==idInput);
    localListState(newLocalList);
  }
  function saveItem(idInput){
    let index = localList.findIndex(e => e.id === idInput);
    if (index !== -1) {
      localList[index].note = localList[index].newNote;
      localList[index].changing = false;
      localListState(localList);
      renderFlagState(!renderFlag);
    }
  }
}
export default App;
