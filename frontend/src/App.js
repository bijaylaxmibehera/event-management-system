import './App.css';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { RouteDetails } from './components/RouteDetails';

function App() {
  return (
    <div className="App">
       <Navbar/>
       <RouteDetails/>
       <Footer/>
    </div>
  );
}

export default App;
