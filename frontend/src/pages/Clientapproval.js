import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientDetails from './Clientview'; // Import the ClientDetails component
import '../css/Clientapproval.css'; // Import the CSS file

function ClientApproval() {
    const [showClientDetails, setShowClientDetails] = useState(false);
    const [selectedClient, setSelectedClient] = useState(null); // To store selected client details
    const [showReasonModal, setShowReasonModal] = useState(false); // To control the visibility of the reason modal
    const [rejectionReason, setRejectionReason] = useState(''); // To store the rejection reason
    const [pendingClients, setPendingClients] = useState([]); // To store pending clients fetched from the backend

    useEffect(() => {
        fetchPendingClients();
    }, []); // Fetch pending clients when the component mounts

    const fetchPendingClients = async () => {
        try {
        const response = await axios.get('http://your-django-backend/api/pending-clients/');
        setPendingClients(response.data);
        } catch (error) {
        console.error('Error fetching pending clients:', error);
        }
    };
  
    const handleClientClick = (client) => {
      setSelectedClient(client);
      setShowClientDetails(true);
    };
  
    const handleApprove = async (pendingClientId) => {
        try {
          const response = await axios.post(`http://your-django-backend/api/client-registration/`, {
            pending_registration_id: pendingClientId,
          });
          console.log('Client Approved:', response.data);
          // Optionally update state or perform any other actions upon successful approval
        } catch (error) {
          console.error('Error approving client:', error);
        }
    };
  
    const handleReject = (clientId) => {
      // Implement reject logic here...
      console.log(`Client with ID ${clientId} rejected`);
      setShowReasonModal(true); // Show the reason modal when the reject button is clicked
    };
  
    const handleClose = () => {
      setShowClientDetails(false);
      setShowReasonModal(false); // Hide the reason modal when closing the client details view
    };
  
    const handleSubmitReason = async () => {
        if (rejectionReason.trim() !== '') {
          try {
            const response = await axios.post('http://your-django-backend/api/rejection-reasons/', {
              client: selectedClient.id,
              reason: rejectionReason
            });
            console.log('Rejection Reason Submitted:', response.data);
            setShowReasonModal(false);
          } catch (error) {
            console.error('Error submitting rejection reason:', error);
          }
        } else {
          alert('Please provide a reason for rejection.');
        }
      };
  
    return (
      <div className="container">
        <h1>Approval Page</h1>
        <table>
          <thead>
            <tr>
              <th>Client Name</th>
              <th>Actions</th> {/* Single column for Actions */}
            </tr>
          </thead>
          <tbody>
            {pendingClients.map((client) => (
              <tr key={client.id}>
                <td onClick={() => handleClientClick(client)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>{client.entityName}</td>
                <td>
                  <button onClick={() => handleApprove(client.id)}>Approve</button>
                  <button onClick={() => handleReject(client.id)}>Reject</button> {/* Reject button */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showClientDetails && (
          <div>
            <ClientDetails client={selectedClient} />
          </div>
        )}
        {showReasonModal && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={handleClose}>&times;</span>
              <h2>Provide Reason for Rejection</h2>
              <textarea value={rejectionReason} onChange={(e) => setRejectionReason(e.target.value)} />
              <button onClick={handleSubmitReason}>Submit</button>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  export default ClientApproval;