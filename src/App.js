import { lazy } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import AuthRoute from './routes/AuthRoute';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary';
import Suspense from './components/Suspense/SuspenseLoader';

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
            <Suspense>
              <RedirectPage />
            </Suspense>
          </Route>
          <Route path='/login'>
            <Suspense>
              <Login />
            </Suspense>
          </Route>
          <Route path='/register'>
            <Suspense>
              <Register />
            </Suspense>
          </Route>
          <AuthRoute path='/feedback'>
            <Suspense>
              <Feedback />
            </Suspense>
          </AuthRoute>

          {/* user routes */}

          <AuthRoute path='/parking-section'>
            <Suspense>
              <ParkingSection />
            </Suspense>
          </AuthRoute>
          <AuthRoute path='/book-vehicle'>
            <Suspense>
              <BookVehicle />
            </Suspense>
          </AuthRoute>
          <AuthRoute path='/view-booking'>
            <Suspense>
              <ViewBooking />
            </Suspense>
          </AuthRoute>

          {/* admin routes */}
        </ErrorBoundary>
      </Switch>
    </Router>
  );
}

export default App;
