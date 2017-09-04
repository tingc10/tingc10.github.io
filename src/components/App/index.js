// Following this tutorial: https://medium.com/@pshrmn/a-simple-react-router-v4-tutorial-7f23ff27adf
// The primary function of this component is to route the application
import React from 'react';
import Main from 'Main';
import Header from 'Header';
import './App.css';

// import logo from 'assets/logo.svg';
// import './App.css';
// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
)

export default App;
