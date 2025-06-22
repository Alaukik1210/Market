import AddItem from "./components/AddItem";
import Home from "./components/Home";
import Navbar from "./components/Navbar"; 
import { Provider } from 'react-redux';
import { store } from './store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddItem />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
