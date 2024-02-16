import React, { useState } from 'react';

function ClientDetails() {
    // Dummy client details data
    const dummyClientDetails = {
        entityName: 'ABC Corporation',
        organizationStatus: 'Private Limited Company',
        estYear: '2005',
        proprieterName: 'John Doe',
        officeAddress: '123 Main Street',
        branchAddress: '456 Elm Street',
        companyPerson: 'Jane Smith',
        companyDesignation: 'CEO',
        compnayNumber: '123-456-7890',
        companyFax: '987-654-3210',
        companyEmail: 'info@abccorp.com',
        industryNature: 'Technology',
        companyCIN: 'CIN123456789',
        companyPAN: 'PAN1234567',
        companyGST: 'GST987654321',
        bdpName: 'Michael Johnson',
        bdpmName: 'Emily Brown',
        accountManager: 'Sarah Wilson',
        billingCity: 'New York',
        billingCountry: 'United States',
    };

    return (
        <div className="container">
            <h1>Client Details</h1>
            <div className="client-details">
                <p><span className="static-text">Entity Name:</span> {dummyClientDetails.entityName}</p>
                <p><span className="static-text">Organization Status:</span> {dummyClientDetails.organizationStatus}</p>
                <p><span className="static-text">Establishment Year:</span> {dummyClientDetails.estYear}</p>
                <p><span className="static-text">Proprietor Name:</span> {dummyClientDetails.proprieterName}</p>
                <p><span className="static-text">Office Address:</span> {dummyClientDetails.officeAddress}</p>
                <p><span className="static-text">Branch Address:</span> {dummyClientDetails.branchAddress}</p>
                <p><span className="static-text">Company Person:</span> {dummyClientDetails.companyPerson}</p>
                <p><span className="static-text">Company Designation:</span> {dummyClientDetails.companyDesignation}</p>
                <p><span className="static-text">Company Number:</span> {dummyClientDetails.compnayNumber}</p>
                <p><span className="static-text">Company Fax:</span> {dummyClientDetails.companyFax}</p>
                <p><span className="static-text">Company Email:</span> {dummyClientDetails.companyEmail}</p>
                <p><span className="static-text">Industry Nature:</span> {dummyClientDetails.industryNature}</p>
                <p><span className="static-text">Company CIN:</span> {dummyClientDetails.companyCIN}</p>
                <p><span className="static-text">Company PAN:</span> {dummyClientDetails.companyPAN}</p>
                <p><span className="static-text">Company GST:</span> {dummyClientDetails.companyGST}</p>
                <p><span className="static-text">Business Development Partner Name:</span> {dummyClientDetails.bdpName}</p>
                <p><span className="static-text">Business Development Partner Managar Name:</span> {dummyClientDetails.bdpmName}</p>
                <p><span className="static-text">Account Manager:</span> {dummyClientDetails.accountManager}</p>
                <p><span className="static-text">Billing City:</span> {dummyClientDetails.billingCity}</p>
                <p><span className="static-text">Billing Country:</span> {dummyClientDetails.billingCountry}</p>
            </div>
        </div>
    );
}

export default ClientDetails;
