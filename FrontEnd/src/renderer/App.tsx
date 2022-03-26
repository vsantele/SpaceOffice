import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Task from './components/Task';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Task />} />
      </Routes>
    </Router>
  );
}
