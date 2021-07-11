import { lazy } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import AuthRoute from './routes/AuthRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SuspenseLoader from './components/Suspense/SuspenseLoader';

import 'antd/dist/antd.css';
import './styles/style.css';

const RedirectPage = lazy(() => import('./pages/RedirectPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const ParkingSection = lazy(() => import('./pages/ParkingSection'));
const BookVehicle = lazy(() => import('./pages/BookVehicle'));
const ViewBooking = lazy(() => import('./pages/ViewBooking'));
const Feedback = lazy(() => import('./pages/Feedback'));

function App() {
  return (
    <Router>
      <Switch>
        <ErrorBoundary>
          <Route exact path='/'>
            <SuspenseLoader>
              <RedirectPage />
            </SuspenseLoader>
          </Route>
          <Route path='/login'>
            <SuspenseLoader>
              <Login />
            </SuspenseLoader>
          </Route>
          <Route path='/register'>
            <SuspenseLoader>
              <Register />
            </SuspenseLoader>
          </Route>

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
