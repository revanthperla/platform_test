import React from 'react';

function ClientDetails({ client }) {
    return (
        <div className="container">
            <h1>Client Details</h1>
            <div className="client-details">
                <p><span className="static-text">Entity Name:</span> {client.entityName}</p>
                <p><span className="static-text">Organization Status:</span> {client.organizationStatus}</p>
                <p><span className="static-text">Establishment Year:</span> {client.estYear}</p>
                <p><span className="static-text">Proprietor Name:</span> {client.proprieterName}</p>
                <p><span className="static-text">Office Address:</span> {client.officeAddress}</p>
                <p><span className="static-text">Branch Address:</span> {client.branchAddress}</p>
                <p><span className="static-text">Company Person:</span> {client.companyPerson}</p>
                <p><span className="static-text">Company Designation:</span> {client.companyDesignation}</p>
                <p><span className="static-text">Company Number:</span> {client.companyNumber}</p>
                <p><span className="static-text">Company Fax:</span> {client.companyFax}</p>
                <p><span className="static-text">Company Email:</span> {client.companyEmail}</p>
                <p><span className="static-text">Industry Nature:</span> {client.industryNature}</p>
                <p><span className="static-text">Company CIN:</span> {client.companyCIN}</p>
                <p><span className="static-text">Company PAN:</span> {client.companyPAN}</p>
                <p><span className="static-text">Company GST:</span> {client.companyGST}</p>
                <p><span className="static-text">Business Development Partner Name:</span> {client.bdpName}</p>
                <p><span className="static-text">Business Development Partner Managar Name:</span> {client.bdpmName}</p>
                <p><span className="static-text">Account Manager:</span> {client.accountManager}</p>
                <p><span className="static-text">Billing City:</span> {client.billingCity}</p>
                <p><span className="static-text">Billing Country:</span> {client.billingCountry}</p>
            </div>
        </div>
    );
}

export default ClientDetails;
