import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import JobList from './pages/Joblist';
import AssessmentForm from './pages/Assessmentview';
import JobListWithAssessments from './pages/Candidateapproval';
import JobAndCandidateList from './pages/Reportgeneration';
import JobAndCandidateSelection from './pages/Inovicerequest';
import GenerateInvoice from './pages/Generateinvoice';
import Profile from './pages/Employeeprofile';
import ADashboard from './pages/Amanagersashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/employeeregistration" element={<EmployeeRegistration />} />
        <Route path="/usernameregistration" element={<RegistrationPage />} />
        <Route path="/employeedashboard" element={<Dashboard />} />
        <Route path="/bdpdashboard" element={<BdpDashboard />} />
        <Route path="/bdpmdashboard" element={<BdpmDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/managerdashboard" element={<ManagerDashboard />} />
        <Route path="/amanagerdashboard" element={<ADashboard />} />
        <Route path="/clientregistration" element={<ClientRegistration />} />
        <Route path="/jobform" element={<JobDescription />} />
        <Route path="/joblist" element={<JobList />} />
        <Route path="/jobview" element={<JobDescriptionDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
};

export default App;