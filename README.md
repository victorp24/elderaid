# ElderAid
<p align="center">
  <img width=238 height=250 src="frontend/elderaid/src/components/images/logo.jpg" />
</p>

> ElderAid is a web-based application for bringing together the elderly and the young in these unprecedented times of COVID-19.

Sometimes we are not always available to care for the elderly and those we love. Othertimes the elderly are living far away and do not have any support, or do not have anyone to care for them. Walking outside to the supermarket to grab groceries is a health risk, especially for those that are immuno-compromised. There has been many cases of people catching COVID-19 just by going for a grocery run.

This is where our app could come in. What if those elderly and immuno-compromised could have someone to help with groceries, or food? Users could sign-up and login to be able to connect with non-immuno-compromised youth volunteers in their community. The youth would help with a grocery run and mitigate any possible exposure risk that the elderly might face otherwise.
 
  Backend:
  - Victor Parangue
  - Martin Chua
  
  
  Frontend:
  - Parmvir Shergill
  - Michael Wu


### Description

ElderAid is a website application which allows the elderly to obtain groceries and help through a simple and easy-to-use interface. Powered with a React.js frontend and Express.js server with a mongoDB database, ElderAid allows for stigma-free assistance from youth volunteers in helping out the elderly. After a verification process for youth volunteers, the elderly can view and choose different youth volunteers based on location distance. Once both users accept to be paired, they can interact with each other via the in-app chat interface or contact information listed.

ElderAid features:
  - Database: MongoDB
  - Front-end: React.js
  - Back-end: Express.js


### Technical Details

<p align="left">
  <img width=150 height=84 src="https://dwglogo.com/wp-content/uploads/2017/09/React_logo.png" />
</p>
* Frontend
  * The frontend was implemented using React Native, there is a 
  landing page where the user can register or log in, using a
  facebook integration to link their facebook account.
  * While creating an account, if the user is a waiter/waitress, they are prompted
  to enter their restaurant ID, along with entering their username/password
  combination. If the user is a customer, they will just be prompted for
  a username/password combination. 

<p align="left">
  <img width=150 height=40 src="https://buttercms.com/static/images/tech_banners/ExpressJS.8587dd0647ca.png" />
</p>
* Backend + API
  * The APIs for ElderAid was implemented using the Express.js framework. 
  * API documentation was provided which allowed the frontend developers view and use APIs to make their HTTP GET, POST, and PUT requests, located here: [API DOCUMENTATION](backend/API.md).
  * This API doc listed what is allowed for the arguments sent into what type of HTTP requests. 
  * The API queried our MongoDB database, hosted on an AWS EC2 virtual machine instance in the cloud.

<p align="left">
  <img width=150 height=64 src="http://photos1.meetupstatic.com/photos/event/3/4/c/8/highres_99553512.jpeg" />
</p>
* Database
  * The database used was mongoDB, queried from the Express.js backend.
  * We used one collection, **users**, which stored user objects that defined all the various needed arguments based on what a user could interact with on the frontend. 
  * See [API DOCUMENTATION](backend/API.md) for an user object example that could be passed in during an user sign-up POST request
