This application is an 'Applicant Tracking System' which helps Recruiting personnel to track and monitor their applicants and jobs
assigned to them. It contains the following functionality

- User Registration and login has been implemented, and each user is set a role from the below 
    - Recruiter = He is the one who finds profiles for a certain job
    - Manager = He adds Job descriptions onto the platform and is responsible for the approvla and rejection of the candidates
    - Business Development Partner = He is responsible for getting on new clients to the company
    - Business Development Partner Manager = He is responsible for all the communacations between the company and the client
    - Account Manager = He is responsible for the billing and invoice generation

- Clients can be registered on the platform by the Business development Partner

- Manager adds a job linked to the client and assignes it to a Recruiter

- Recruiter uploads resumes and fills out an Assessment sheet for a candidate to a job

- The candidate details can then be viewed by the manager to approve or reject the candidate

- Once a list of candidates are shortlisted, the Manager can then create a report using the fields from the Assessment sheet form, which can then be shared with the client

- After the client gets back with the list of candidates shortlisted for interview, the Recruiter updates the interview schedule

- Once client confirms the selection of a candidate, the manager then create an invoice request to the account manager

- The account manager then generates an invoice which is then sent to the client and the job is closed

This application is made using React JS and Django using sql as the database. The website is being hosted on AWS and the files uploaded onto the portal are being uploaded to a S3 bucket (more on that later). The 'frontend' contains all the resources for the web pages source code as well the css style sheets. While the 'backend' contains the 'backend_app' which is the Django application. 

Few things to be noted: 
- When the resume is uploaded to the s3 bucket, the HRInputs logo is to be added onto the resume
- All the uploaded resumes have to be available to be used later on if needed 
- The invoice generated at the end has a template, and the details should be replaced in it accordingly, the script and the template are present
- Cookies are to be checked if working as intended to get the logged in user details so that the pages display information appropriately

THe website is hosted on a Amazon EC2 instance where the frontend and backend are run on two servers. The following commands are required to run the servers even if the termianl is closed for the ec2 instance
- screen -d -m sudo PORT=80 node ./node_modules/.bin/react-scripts start
- screen -d -m python3 manage.py runserver 0.0.0.0:8000

Dummy login details to check functionality

Recruiter 
Username - revanth
Password - 1234567890

Manager
Username - yash
Password - 1234567890

Business Development Partner
Username - par
Password - 1234567890

Business Development Partner Manager 
Username - akash 
Password - 1234567890

Account Manager 
Username - sarath 
Password - 1234567890