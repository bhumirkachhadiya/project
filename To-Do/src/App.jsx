import { useState , useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


function App() {
    const [todo, setTodo] = useState("")
    const [todos, setTodos] = useState([])
    const [ShowFinished, setShowFinished] = useState(true)

    useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
     let todos = JSON.parse(localStorage.getItem("todos"))
     setTodos(todos)
      }
    }, [])

    const savetols = () => {
      localStorage.setItem("todos",JSON.stringify(todos))
    }
    
    const toggleFinished = (e) =>{
      setShowFinished(!ShowFinished)

      
    }
    


    const handleEdit = (e, id)=>{
      let t = todos.filter(i=>i.id===id)
      setTodo(t[0].todo)
      let newTodos = todos.filter(item=>{
        return item.id!==id
      });
      setTodos(newTodos)
      savetols()
  } 
    const handleDelete = (e, id)=>{
      let index = todos.findIndex(item=>{
        return item.id === id;
      })
      let newTodos = todos.filter(item=>{
        return item.id!==id
      });
      setTodos(newTodos)
      savetols()
    }
    const handleAdd = ()=>{
        setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
        setTodo("")
        savetols()
    }
    const handleChange = (e)=>{
        setTodo(e.target.value)
    }
    const handleCheckbox = (e) => {
      // console.log(e,e.target)
      let id = e.target.name;
      // console.log(`Id ${id}`)
      let index = todos.findIndex(item=>{
        return item.id === id;
      })
      // console.log(index)
      let newTodos = [...todos];
      newTodos[index].isCompleted = !newTodos[index].isCompleted;
      setTodos(newTodos);
      savetols()
      // console.log(newTodos,todos)
    }
  return (
    <>
    <Navbar/>
      <div className=" mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-violet-300 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center text-2xl'>iTask - Manage your at once place</h1>
          <div className="addTodo my-5 flex flex-col gap-4">
            <h1 className='text-xl font-bold'>Add a Todo</h1>
            <div className="flex">

            <input onChange={handleChange} value={todo} type="text" className='w-full rounded-full py-1 px-5'/>
            <button onClick={handleAdd} disabled={todo.length<=3} className='disabled:bg-violet-600 bg-violet-800 hover:bg-violet-950 p-2 py-1 mx-2 rounded-full text-white  text-sm font-bold'>Add</button>
            </div>
          </div>
          <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={ShowFinished}/><label className='mx-2' htmlFor="show">Show Finished</label>
          <div className='h-[1px] bg-black opacity-15 w-90% mx-auto my-2'></div>
          <h2 className='text-xl font-bold'>Your Todos</h2>
          <div className="todos">
            {todos.length===0 && <div className='my-3'>No Todos To Display</div> }
            {todos.map(item=>{

            return (ShowFinished || !item.isCompleted) && <div key={item.id} className="todo flex my-3 justify-between ">
              <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e)=>handleEdit(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><FaEdit/></button>
                <button onClick={(e)=>handleDelete(e,item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold'><MdDelete /></button>
              </div>
            </div>
            })}
          </div>
      </div>
    </>
  )
}

export default App
