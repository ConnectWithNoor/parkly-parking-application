import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import AuthRoute from './routes/AuthRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import {
  Register,
  Login,
  RedirectPage,
  ParkingSection,
  BookVehicle,
  ViewBooking,
  Feedback,
} from './pages';

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
          <AuthRoute path='/feedback' component={Feedback} />

          {/* user routes */}

          <AuthRoute path='/parking-section' component={ParkingSection} />
          <AuthRoute path='/book-vehicle' component={BookVehicle} />
          <AuthRoute path='/view-booking' component={ViewBooking} />

          {/* admin routes */}
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default App;
