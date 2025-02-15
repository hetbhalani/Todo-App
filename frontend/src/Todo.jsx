import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Todo() {
  const [todo, setTodo] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchTodo();
  }, []);

  async function fetchTodo() {
    try {
      const response = await fetch('http://localhost:3000/todo', {
        method:'GET',
        credentials: 'include',
      })
  
      if (!response.ok) {
        if (response.status === 401) {
          console.error("Unauthorized! Please log in first.");
          alert("You need to log in to access todos.");
          return;
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data);
      setTodo(data.getTodo || []); 
    } catch (err) {
      console.error("Some error occurred:", err);
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

  async function deleteTodo(id) {
    try {
      await fetch(`http://localhost:3000/todo/${id}`, {
        method: "DELETE",
        credentials: 'include',
      });

      setTodo(todo.filter(itm => itm._id !== id));
    } catch (err) {
      console.error("Error deleting todo:", err);
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
      <h1 className='mb-4 text-white'>Todo-App</h1>
      <div className='container bg-white p-5 rounded shadow d-flex' style={{ width: '1200px', height: '500px' }}>
        <div className='container bg-light border border-primary p-5 rounded h-100 ms-0' style={{ width: '45%' }}>
          <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1"
              placeholder="Enter title here..."
              value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"
              value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
          </div>
          {editId ? (
            <button className='btn btn-warning' onClick={() => editTodo(editId)}>Update todo</button>
          ) : (
            <button className='btn btn-primary' onClick={addTodo}>Add todo</button>
          )}
        </div>
        <div className='container bg-light border border-primary p-5 ms-3 rounded h-100 me-0'>
          <h4 className="text-primary">Your Todos</h4>
          {todo.length === 0 ? (
            <p>No todos available</p>
          ) : (
            <ul className="list-group">
              {todo.map(item => (
                <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{item.title}</strong>
                    <p className="mb-0">{item.description}</p>
                  </div>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteTodo(item._id)}>Delete</button>
                  <button className="btn btn-warning btn-sm" onClick={() => fillInput(item)}>Edit</button>
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
