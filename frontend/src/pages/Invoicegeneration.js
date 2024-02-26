import React, { useState } from 'react';
import axios from 'axios';

function InvoiceForm() {
    const [joiningDate, setJoiningDate] = useState('');
    const [cgst, setCgst] = useState('');
    const [sgst, setSGST] = useState('');
    const [finalCTC, setFinalCTC] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/invoice', {
                joiningDate,
                cgst,
                sgst,
                finalCTC
            });
            setAdditionalDetails(response.data);
        } catch (error) {
            console.error('Error fetching additional details:', error);
        }
    };

    return (
        <div>
            <h2>Invoice Form</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Joining Date:
                    <input type="date" value={joiningDate} onChange={(e) => setJoiningDate(e.target.value)} />
                </label>
                <label>
                    CGST:
                    <input type="text" value={cgst} onChange={(e) => setCgst(e.target.value)} />
                </label>
                <label>
                    SGST:
                    <input type="number" value={sgst} onChange={(e) => setSGST(e.target.value)} />
                </label>
                <label>
                    Final CTC:
                    <input type="number" value={finalCTC} onChange={(e) => setFinalCTC(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>

            {/* Display fetched additional details */}
            <div>
                <h3>Additional Details</h3>
                <p>Client Name: {additionalDetails.clientName}</p>
                <p>Client Address: {additionalDetails.clientAddress}</p>
                {/* Display other fetched details */}
            </div>
        </div>
    );
}

export default InvoiceForm;
