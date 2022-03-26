import { Container, CssBaseline } from '@mui/material';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import TestGrid from './components/TestGrid';

export default function App() {
  return (
    <Container maxWidth="sm">
      <CssBaseline />
      <Router>
        <Routes>
          {/* <Route path="/" element={<Task />} /> */}
          <Route path="/" element={<TestGrid />} />
        </Routes>
      </Router>
    </Container>
  );
}
