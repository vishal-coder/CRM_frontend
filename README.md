# [FundeME100](https://easycrm.netlify.app) - Website

  [Front End](https://github.com/vishal-coder/CRM_frontend)
  [Back End](https://github.com/vishal-coder/CRM_backend)

## Brief Description

- EasyCRM website is a User basd CRM Application where  Admin, Manager and Employee have access to different functionality.
- Whenever Admin/ Manager creates any user, status of user will be "InActive"  and a account activation link will be mailed to users mail
- User can activate account by clicking on account activation link and after that user can start using CRM APP
- User can create Lead, contact and Service Request

`Manager` - All of User Features plus can create User
			-	Create and delete- Leads,Contact and service Request created by all Users under him/her
	
`Admin` - All of User Features plus
		- User created By Managers
		- Leads,Contact and service Request created by all Users and Managers

`Payment` - RazorPay Payment gateway is used to generate sharable payment link using which user can pay for services.Once the user pays service amount, details of payment will be sent to Payment gateway to check  authenticity of signature and payment ID. Once authenticated success page will be shown to user
		NOTE:- As app is using dummy emails payment link  will be shown in popup

### `Short tech summary`
  - Implemented authentication,authorization using Json Web Token for login,along with CRUD features.
  - Integrated payment gateway by RazorPay API to collect service and display transaction status.
  - Implemented [MongoDB ChangeStream](https://www.mongodb.com/docs/manual/changeStreams) for push notification to admin about payments


## Features

### `User features`
  - For using this CRM user has to activate his account by clicking on the link received in the mail after user is created in system by Manager/Admin
  - Can create lead or delete Lead
  - Can mark lead as contact and delete contact
  - Can Generate payment link and share with customer
  - Can create new service request and close service request
  
### `Manager Features`
- All of User Features plus.
- View all user created By him/her Managers
- Delete users created By him/her
- Leads,Contact and service Request created by all Users under him/her 
		
  
  
### `Admin features`
  - All of User Features plus.
  - Delete users any user of the system
  - View all user created By all Managers
  - Leads,Contact and service Request created by all Users and Managers
  - Generate and close service request for all contacts
  
  
## Tech Used
  - ReactJS
  - ExpressJS
  - NodeJS
  - MongoDB and MongoDB ChangeStream
  - Socket.io - for Push Notification
  - RazorPay Payment Gateway for Payment Integration - Sharable Payments Link is used

# ScreenShots
- Homepage
![Homepage](/ScreenShots/Home.JPG "Homepage")

- userView 
![AddLead](/ScreenShots/AddLead.JPG "UserView AddLead")

- All Lead Dashboard View 
![Lead Dashboard View](/ScreenShots/LeadDashboard.JPG "Lead Dashboard View")

- All Contact Dashboard View 
![Homepage](/ScreenShots/ContactDashboard.JPG "Contact Dashboard View")

- All Service Dashboard View
![Service Dashboard View](/ScreenShots/ServiceDashboard.JPG "Service Dashboard View")

- Admin View Add User
![Homepage](/ScreenShots/AddUser.JPG "Admin View Add User")


- All User Dashboard View 
![User Dashboard View](/ScreenShots/UserDashboard.JPG "User Dashboard View")


- Payment Link PopUP
![Payment Link PopUP](/ScreenShots/PaymentLinkPopUP.JPG "Payment Link PopUP")

- Payment Page
![Payment Page](/ScreenShots/PaymentPage.JPG "Payment Page")

- Payment Confirmation Page
![Payment Confirmation Page](/ScreenShots/PaymentConfirmationPage.JPG "Payment Confirmation Page")



