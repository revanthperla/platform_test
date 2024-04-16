import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientDetails from './Clientview';

function ClientList() {
  const [clients, setClients] = useState([]);
  const [selectedClientId, setSelectedClientId] = useState(null);

  useEffect(() => {
    fetchClients();
}, []);

const fetchClients = async () => {
    try {
        const response = await fetch('http://43.204.201.158:8000/api/clients');
        const data = await response.json();
        setClients(data.clients);
    } catch (error) {
        console.error('Error fetching clients:', error);
    }
}

  const handleViewDetails = (clientId) => {
    setSelectedClientId(clientId);
  };

  const handleCloseDetails = () => {
    setSelectedClientId(null);
  };

  return (
    <div>
      <h1>List of Clients</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map(client => (
            <tr key={client.id}>
              <td>{client.name}</td>
              <td>
                <button onClick={() => handleViewDetails(client.id)}>View Details</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedClientId && (
        <div>
          <ClientDetails clientId={selectedClientId} />
          <button onClick={handleCloseDetails}>Close</button>
        </div>
      )}
    </div>
  );
}

export default ClientList;
