import { sub } from "./Components/Math";
import Button_Use from "./Page/User_Button_Use";
import "./App.css";
import Nested_Components from "./Components/Nested_Components";
import Header from "./Components/HeaderComponent";
import Footer from "./Components/FooterComponent";
import Sidebar from "./Components/Sidebar";

function App() {

  return (
    <>
    <div><Header/></div>
     <div>
      <Sidebar/>
     </div>
     <div className="App p-8">
      <Button_Use/>
    </div>
    <div>
    <Footer/>
    </div>
    </>
   
  );



}

export default App;
