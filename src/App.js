import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';

import 'antd/dist/antd.css';
import './styles/style.css';

function App() {
  return (
    <Router>
      <Switch>
        <ErrorBoundary>
          <Route exact path='/' component={<Redirect to='/login' />} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default App;
