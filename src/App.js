import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import AuthRoute from './routes/AuthRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import { Register, Login, RedirectPage, ParkingSection } from './pages';

import 'antd/dist/antd.css';
import './styles/style.css';

function App() {
  return (
    <Router>
      <Switch>
        <ErrorBoundary>
          <Route exact path='/' component={RedirectPage} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />

          <AuthRoute path='/parking-section' component={ParkingSection} />
          <AuthRoute path='/book-vehicle' component={ParkingSection} />
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default App;
