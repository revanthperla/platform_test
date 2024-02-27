import React from 'react';


import ClientRegistration from './pages/Clientregistration';
import Login from './pages/login';
import JobDescription from './pages/Jobdescriptionform';
import RegistrationPage from './pages/registration';
import EmployeeRegistration from './pages/Employeeregistration';
import JobDescriptionDetails from './pages/Jobdescriptionview';
import Dashboard from './pages/Employeedashboard';
import ClientDetails from './pages/Clientview';
import BdpDashboard from './pages/Bdpdashboard';
import UserList from './pages/Roleassign';
import AdminDashboard from './pages/Admindashboard';
import Clientapproval from './pages/Clientapproval';
import BdpmDashboard from './pages/Bdpmdashboard';
import Notifications from './pages/Clientstatusnotifications';
import InvoiceForm from './pages/Invoicegeneration';
import ManagerDashboard from './pages/Managerdashboard';

function App() {
  return(
    <ManagerDashboard />
  )
}

export default App