import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ClientDetails from './Clientview';

function ClientList() {
    const [clients] = useState([
        { id: 1, name: 'Client 1' },
        { id: 2, name: 'Client 2' },
        { id: 3, name: 'Client 3' },
        // Add more dummy clients as needed
      ]);
    
      const [selectedClientId, setSelectedClientId] = useState(null);
    
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
