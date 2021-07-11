import { lazy } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import AuthRoute from './routes/AuthRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import SuspenseLoader from './components/Suspense/SuspenseLoader';

import 'antd/dist/antd.css';
import './styles/style.css';

// common pages

const RedirectPage = lazy(() => import('./pages/RedirectPage'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Feedback = lazy(() => import('./pages/Feedback'));
const ViewBooking = lazy(() => import('./pages/ViewBooking'));

// user pages
const ParkingSection = lazy(() => import('./pages/user/ParkingSection'));
const BookVehicle = lazy(() => import('./pages/user/BookVehicle'));

// admin pages

function App() {
  return (
    <Router>
      <Switch>
        <ErrorBoundary>
          {/* common routes */}
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
          <AuthRoute path='/view-booking' component={ViewBooking} />

          {/* user routes */}

          <AuthRoute path='/parking-section' component={ParkingSection} />
          <AuthRoute path='/book-vehicle' component={BookVehicle} />

          {/* admin routes */}

          {/* for all other routes */}

          <Route path='*'>
            <SuspenseLoader>
              <RedirectPage />
            </SuspenseLoader>
          </Route>
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default App;
