import { Link, Switch, Route } from 'react-router-dom';
import Profile from '../../../assets/images/DashboardImgs/profile.png';
import { destroySession } from '../../../Helpers/Functions';
import Header from './Header';
import history from '../../../Utils/history';
import { EmailVerifySuccess } from '../../../Pages/pageListAsync';
import { ProtectedRoute } from '../../../Components/Layouts/AdviseeSignUpLayout/ProtectedRoute';
import './main.css';
import MainFooter from '../MainFooter';

import { Dashboard } from './../AdviseeLayout/pageListAsync';

function Main() {
  function checkCurrentPath(url) {
    return history.location.pathname === '/signupwizard/' + url ? true : false;
  }
  function logout() {
    localStorage.clear();
    destroySession();
  }

  return (
     <>
      <Header />
        <div className='wrapper footerfix'>
          <Route path='/Advisee/Dashboard' exact>
            <Dashboard />
          </Route>
        </div>
     <MainFooter/>
     </>
  );
}

export default Main;
