import './App.css';
import Auth from "../Auth/Auth";
import { Route, Routes} from "react-router-dom";
import Reg from "../Reg/Reg";

function App() {


  return (
    <div className="App">
        <Routes>
            <Route path={'/auth'} element={<Auth/>}/>
            <Route path={'/reg'} element={<Reg/>}/>
        </Routes>
    </div>
  );
}
export default App;
