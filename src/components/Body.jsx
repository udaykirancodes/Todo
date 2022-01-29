import React from "react";
import { useState , useEffect} from "react";
import { AiFillDelete ,AiTwotoneEdit} from 'react-icons/ai';
export default function Body() {
  const [state, setstate] = useState('');
  const [todos, setTodos] = useState([]);
  const [edit , setEdit ] = useState({id:"",state:false}); 
  const handleChange = (e) => {
    setstate(e.target.value);
  };
  const addTodo = () => {
    setTodos(todos.concat({id: Date.now() , todo:state}));
    setstate('')
};
const deleteTodo = (id) => {
    let newTodos = todos.filter((todo)=> todo.id !== id);
    setTodos(newTodos);
};
const editTodo = (id) =>{
    setEdit({id:id , state: true}); 
    let todo = todos.filter((todo) => todo.id === id); 
    setstate(todo[0].todo); 
}
const AddorEdit = () =>{
    if(edit.state){
        let id = edit.id ; 
        let newTodos = []
        for(let i=0 ; i<todos.length ; i++){
            let element = todos[i]; 
            if(id === element.id){
                    element.todo = state 
                    setstate(''); 
                    setEdit({id:'',state:false}); 
            }
            newTodos.push(element); 
        }
        setTodos(newTodos); 
      }else{
          addTodo(); 
      }
  }

  const getLocalData = () => {
    let data = localStorage.getItem('todos'); 
    if(data){
        let MYTODOS = JSON.parse(data); 
        setTodos(MYTODOS); 
    }else{
        localStorage.setItem('todos',JSON.stringify(todos)); 
    }
  }

  useEffect(() => {
    getLocalData(); 
  });
  
  useEffect(() => {
    localStorage.setItem('todos',JSON.stringify(todos)); 
  }, [todos]);
  
  return (
    <>
      <section className="section container">
        <p className="sectionTitle">Add Todo</p>
        <form action="/" className="form">
          <input
            className="input"
            value={state}
            onChange={handleChange}
            type="text"
            placeholder="Todo..."
          />
        </form>
        <button disabled={!state.length} className="button" onClick={()=>AddorEdit(state)}>
          {edit.state ? 'Edit Todo' : 'Add Todo '}
        </button>
      </section>
      <section className="section container">
        <p className="sectionTitle">{todos.length > 0 ? 'Your Todos' : 'Add Todos to show : )'}</p>
        {todos.map((todo) => {
          return <div key={todo.id}  className="note">
                <p className="noteTitle">{todo.todo}</p>
                <div className="buttonContainer">
                  <button className="button edit" onClick={()=>editTodo(todo.id)}>Edit <AiTwotoneEdit className="icon"/> </button>
                  <button className="button" onClick={()=>deleteTodo(todo.id)}>Delete <AiFillDelete className="icon"/> </button>
                </div>
              </div>
        })}
      </section>
    </>
  );
}
