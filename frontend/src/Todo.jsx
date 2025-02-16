import { useState, useEffect, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { PartyPopper as Party } from 'lucide-react';
import confetti from 'canvas-confetti';

function Todo() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodo();
  }, []);

  const deleteTodo = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

      setTodo(prevTodo => prevTodo.filter(itm => itm._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
    }
  }, []);

  const handleConfetti = useCallback((id, event) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { x, y },
      colors: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'],
    });

    // Delete the todo after 500ms
    setTimeout(() => {
      deleteTodo(id);
    }, 500);
  }, [deleteTodo]);

  async function fetchTodo() {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        method: 'GET',
        credentials: 'include',
      })

      if (!response.ok) {
        if (response.status === 401) {
          alert("You need to log in to access todos.");
          return;
        }
      }

      const data = await response.json();
      console.log(data);
      setTodo(data.getTodo || []);
    } catch (err) {
      msg: "something wrong" + err
    }
  }

  async function addTodo() {
    if (!title || !description) {
      alert("Please enter both title and description");
      return;
    }

    try {
      await fetch('http://localhost:3000/todo', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({ title, description })
      });

      setTitle('');
      setDescription('');
      fetchTodo();
    } catch (err) {
      console.error("Error adding todo:", err);
    }
  }

  async function editTodo(id) {
    try {
      await fetch(`http://localhost:3000/todo/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: 'include',
        body: JSON.stringify({ title, description })
      });

      setTitle('');
      setDescription('');
      setEditId(null);
      fetchTodo();
    } catch (err) {
      console.error("Error editing todo:", err);
    }
  }

  function fillInput(todo) {
    setTitle(todo.title);
    setDescription(todo.description);
    setEditId(todo._id);
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className="relative">
      </div>
      <h1 className='mb-4 text-white'>Todo-App</h1>
      <div className='container bg-white p-5 rounded shadow d-flex' style={{ width: '1200px', height: '500px' }}>
        <div className='container bg-light border border-primary p-5 rounded h-100 ms-0' style={{ width: '45%' }}>
          <div className="mb-3 text-start">
            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"
              placeholder="Enter title here..."
              value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3 text-start ">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" placeholder="Add Description here"
              rows="3"
              value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          {editId ? (
            <button className='btn btn-warning' onClick={() => editTodo(editId)}>Update todo</button>
          ) : (
            <button className='btn btn-primary' onClick={addTodo}>Add todo</button>
          )}
        </div>
        <div className='container bg-light border border-primary ms-3 rounded h-100 me-0'>
          <h4 className="text-primary mt-2 mb-2">Your Todos</h4>
          {todo.length === 0 ? (
            <p>No todos available</p>
          ) : (
            <ul className="list-group m-2 custom-scrollbar" style={{ overflowY: 'auto', maxHeight: '320px' }}>
              {todo.map(item => (
                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-start">
                  <div className="me-2" style={{ width: 'calc(100% - 200px)', minWidth: 0 }}>
                    <strong className='d-block text-truncate text-start'>{item.title}</strong>
                    <p className="mb-0 text-start text-break" style={{ 
                      display: '-webkit-box',
                      WebkitLineClamp: '2',
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      fontSize: '0.9rem'
                    }}>{item.description}</p>
                  </div>
                  <div className="d-flex gap-2 flex-shrink-0">
                    <button 
                      className="btn custom-done-btn btn-sm" 
                      onClick={(e) => handleConfetti(item._id, e)}
                    >
                      Done
                    </button>
                    <button className="btn btn-warning btn-sm" onClick={() => fillInput(item)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(item._id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Todo;