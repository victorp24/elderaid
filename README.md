<p align="center">
  <img width=322 height=105 src="frontend/elderaid/src/components/images/logo1.png" />
</p>

----


> ElderAid is a web-based application for bringing together the elderly and the young in these unprecedented times of COVID-19.

Sometimes we are not always available to care for the elderly and those we love. Othertimes the elderly are living far away and do not have any support, or do not have anyone to care for them. Walking outside to the supermarket to grab groceries is a health risk, especially for those that are immuno-compromised. There has been many cases of people catching COVID-19 just by going for a grocery run.

This is where our app could come in. What if those elderly and immuno-compromised could have someone to help with groceries, or food? Users could sign-up and login to be able to connect with non-immuno-compromised youth volunteers in their community. The youth would help with a grocery run and mitigate any possible exposure risk that the elderly might face otherwise.
 
  Team:
  - [Victor Parangue](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (Backend)
  - [Martin Chua](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (Backend)
  - [Parmvir Shergill](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (Frontend)
  - [Michael Wu](https://www.youtube.com/watch?v=dQw4w9WgXcQ) (Frontend)


### Description

ElderAid is a website application which allows the elderly to obtain groceries and help through a simple and easy-to-use interface. Powered with a React.js frontend and Express.js server with a mongoDB database, ElderAid allows for stigma-free assistance from youth volunteers in helping out the elderly. After a verification process for youth volunteers, the elderly can view and choose different youth volunteers based on location distance. Once both users accept to be paired, they can interact with each other via the in-app chat interface or contact information listed. ElderAid is designed to be straight-forward and uncomplicated for those who may not be as well-versed in technology.

ElderAid features:
  - Database: MongoDB
  - Front-end: React.js
  - Back-end: Express.js


### Technical Details

<p align="left">
  <img width=150 height=84 src="https://dwglogo.com/wp-content/uploads/2017/09/React_logo.png" />
</p>

* **Frontend**
  * The frontend was implemented using the React.js framework.
  * From this framework we created various components to display different states.
  * When creating an account, the user selects whether they are elderly or youth, and from that, different dashboard states will be displayed after a successful login
  * After verification for elders, there are two dashboard views:
    * Pre-partnership, where the elder can view closest youths by location and send invites
    * Post-partnership, where the elder and youth have connected
  * After a verification process for youths, there are also two dashboard views:
    * Pre-partnership, where the youth can see a list of invites from elders and accept one
    * Post-partnership, where after the acceptance the youth and elder are connected
  * Following a match, the matching partners will be able to view each other's contact information.
  * On the profile customization page, the user (both elder and youth) can customize their personal information and add a profile picture. 

<p align="left">
  <img width=150 height=40 src="https://buttercms.com/static/images/tech_banners/ExpressJS.8587dd0647ca.png" />
</p>

* **Backend + API**
  * The APIs for ElderAid was implemented using the Express.js framework. 
  * API documentation was provided which allowed the frontend developers view and use APIs to make their HTTP GET, POST, and PUT requests, located here: [API DOCUMENTATION](backend/API.md).
  * This API doc listed what is allowed for the arguments sent into what type of HTTP requests. 
  * The API queried our MongoDB database, hosted on an AWS EC2 virtual machine instance in the cloud.

<p align="left">
  <img width=150 height=64 src="http://photos1.meetupstatic.com/photos/event/3/4/c/8/highres_99553512.jpeg" />
</p>

* **Database**
  * The database used was mongoDB, queried from the Express.js backend.
  * We used one collection, **users**, which stored user objects that defined all the various needed arguments based on what a user could interact with on the frontend. 
  * See [API DOCUMENTATION](backend/API.md) for an user object example that could be passed in during an user sign-up POST request
