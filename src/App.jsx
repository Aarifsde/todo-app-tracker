
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import TodoListPage from './pages/TodoListPage';
import ContactPage from './pages/ContactPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todos" element={<TodoListPage />} />
          <Route path="/contacts" element={<ContactPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


