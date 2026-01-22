import { sub } from "./Components/Math";
import Button_Use from "./Page/User_Button_Use";
import "./App.css";
import Nested_Components from "./Components/Nested_Components";
import Header from "./Components/HeaderComponent";
import Footer from "./Components/FooterComponent";
import Sidebar from "./Components/Sidebar";
import Table_use from "./Page/Table_Use";

function App() {

  return (
    <>
      <Header />
      <Sidebar />
      <div className="App">
        <Table_use />
        <Button_Use />
      </div>
      <Footer />
    </>

  );



}

export default App;
