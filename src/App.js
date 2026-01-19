import './App.css';
import React from 'react';
import Function_name from './Components/Function_Components';
import ExpenseEntryItem from './Components/Class_Component';
function App() {
  return (
    <div className="App">
      <h1>
        <Function_name 
            name="Rony" 
        />
      </h1>
      <h1>
        <Function_name age='30' />
      </h1>
      <h><ExpenseEntryItem/></h>
    </div>
  );
}

export default App;