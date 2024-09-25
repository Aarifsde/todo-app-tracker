import { useState, useEffect } from 'react';
import todosData from '../todos.json';
import peopleData from '../people.json';
import Loader from '../components/Loader';

const TodoListPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTodo, setNewTodo] = useState({ Name: '', Description: '', AssigneeId: 'P-1' });
  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState({ date: '', assignee: '' });

  useEffect(() => {
    setTimeout(() => {
      setTodos(todosData);
      setLoading(false);
    }, 1000);
  }, []);

  const handleAddTodo = () => {
    const newTask = {
      ...newTodo,
      Id: `T-${todos.length + 1}`,
      CreatedAt: new Date().toISOString(),
    };
    setTodos([...todos, newTask]);
    setShowAddForm(false);
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.Id !== id));
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="container mx-auto p-5">
      <h2 className="text-2xl font-bold mb-5">To-do List</h2>

      <button
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? "Cancel" : "Add To-do"}
      </button>

      {showAddForm && (
        <div className="bg-gray-100 p-4 rounded shadow-lg mb-6">
          <input
            type="text"
            placeholder="To-do Title"
            className="border p-2 w-full mb-4 rounded"
            value={newTodo.Name}
            onChange={(e) => setNewTodo({ ...newTodo, Name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 w-full mb-4 rounded"
            value={newTodo.Description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, Description: e.target.value })
            }
          />
          <select
            className="border p-2 w-full mb-4 rounded"
            value={newTodo.AssigneeId}
            onChange={(e) => setNewTodo({ ...newTodo, AssigneeId: e.target.value })}
          >
            {peopleData.map((person) => (
              <option key={person.Id} value={person.Id}>
                {person.Name}
              </option>
            ))}
          </select>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            onClick={handleAddTodo}
          >
            Submit
          </button>
        </div>
      )}

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {todos
          .filter(todo => 
            (!filters.date || todo.CreatedAt.includes(filters.date)) &&
            (!filters.assignee || todo.AssigneeId === filters.assignee)
          )
          .map((todo) => (
            <div key={todo.Id} className="p-4 bg-white shadow-md rounded-lg">
              <h3 className="text-xl font-semibold mb-2">{todo.Name}</h3>
              <p className="mb-2">{todo.Description}</p>
              <p className="text-sm text-gray-600">
                Assigned to:{" "}
                {peopleData.find((person) => person.Id === todo.AssigneeId)?.Name}
              </p>
              <p className="text-sm text-gray-600">
                Created At: {new Date(todo.CreatedAt).toLocaleDateString()}
              </p>
              <button
                className="mt-2 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                onClick={() => handleDeleteTodo(todo.Id)}
              >
                Delete
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoListPage;
