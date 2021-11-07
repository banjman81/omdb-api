import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import './App.css';

import { Movies } from './components/Movies/Movies';
import { MovieDetail } from './components/Movies/MovieDetail';


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Movies}/>
          <Route exact path="/get-movie/:id" component={MovieDetail}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
