import './App.css';
import "../src/public/css/custom.css"
import { BrowserRouter as Router, Switch, Route, Routes } from "react-router-dom";
import MainLayout from './layout/mainLayout';
import TodoList from './component/Todolist';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<MainLayout/>}>
            <Route path="/" element={<TodoList />} />
            <Route path="*" element={<div>404 Not Found!</div>} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
