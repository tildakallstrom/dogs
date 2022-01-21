//import React from 'react';
import './App.css';
import Dogs from './API/Dogs';


//app
function App() {
 
  return(
    
    //whats shown on the webpage
    <div>
      
      <header>
      <nav className="navbar">
                <ul>
                   
                        <li className="menu"><a href="#dogs">Dogs</a></li>
                        <li className="menu"><a href="#add">Add dog</a></li>                        
                </ul>
            </nav>
      </header>
      <Dogs></Dogs>

      


      <footer>
        <p className="whitep">Created by Tilda Källström 2022<br></br>
        JavaScriptbaserad Webbutveckling<br></br>
        Mid Sweden University</p>
      </footer>
      
    </div>
    
  );
}

export default App;