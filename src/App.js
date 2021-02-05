// import logo from './logo.svg';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./Component/Navbar/Navbar";
import Signin from "./Component/Starting/Signin/Signin";
import Signup from "./Component/Signup/Signup";
import Dashboard from "./Component/Dashboard/Dashboard";
import Proatected from "./Component/protected/Proatected";
import Protectfree from "./Component/protected/Protectfree";
import Error from "./Component/Error/Error"
import Logout from "./Component/Logout/Logout"
import Matrialpalate from "./Component/Matrialplate/Matrialpalate"
// import './App.css';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
     <Navbar />
     <Switch>
   
 
   <Protectfree exact path= "/signup" component= {Signup} />
   <Protectfree exact path= "/" component= {Signin} />
  

   <Proatected exact path="/dashboard" component={Dashboard} />
   <Proatected exact path="/logout" component={Logout} />
   <Route path="/matrial" component={Matrialpalate} />
   <Route component={Error} />
   </Switch>
   </BrowserRouter>

    </div>
  );
}

export default App;
