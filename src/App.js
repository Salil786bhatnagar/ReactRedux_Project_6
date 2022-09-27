import logo from './logo.svg';
import './App.css';
import './Custom.css';
import Product_page from './Component/Produt/ProductPage'
import Indexpage from './Component/index'
import {BrowserRouter as Router, Route} from 'react-router-dom';
function App(props) {
  return (
    <div className="App">
    <Router>
       <Route
         path='/Product_page'
         exact
         strict
         component={Product_page}
         history={props.history}
       />
    </Router>
    </div>
  );
}

export default App;
