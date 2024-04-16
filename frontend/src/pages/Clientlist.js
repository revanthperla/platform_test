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
          const response = await fetch('http://43.204.201.158:8000/api/clientlist/');
          const data = await response.json();
          console.log(data);
          setClients(data[0]);
          console.log(data.clients);
          console.log(clients);
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
                        <td>{client.entityName}</td> {/* Assuming entityName is the client's name */}
                        <td>
                            <button onClick={() => handleViewDetails(client.id)}>View Details</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {selectedClientId && (
            <div>
                <ClientDetails client={clients.find(client => client.id === selectedClientId)} />
                <button onClick={handleCloseDetails}>Close</button>
            </div>
        )}
    </div>
);
}

export default ClientList;