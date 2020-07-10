# Order Management 🖌📗📦

__Project Description__: A website represents an online stationery shop to satisfy “back-to-school” feelings and sell beautiful notebooks, fresh pens, delightful erasers, pencil cases, etc.

__Live Demo__:
 - [Back-end on Heroku](https://order-managment.herokuapp.com/api/orders)
 - [Front-end on Firebase](https://order-mag.firebaseapp.com/)

__Technologies/Tools__
 - Programming Language: Typescript (client and server)
 - Front-end: React.js (Deployed on Firebase)
 - Back-end: Node.js (Deployed on Heroku)
 - Database Management System: MongoDB

__Intrductions to set up the project__

Before running the project in the development enviroment, you should install [Node.js and NPM](https://nodejs.org/en/)

   1. **_Back end_**
      
      1.1 Navigate to __server__ directory
      
      1.2 Run following comand to install all needed packages:
                
      > yarn 
      
      or
      
      > npm install
      
      1.3 Open __src/credential.ts__ to edit your MongoDB URI, username and password
      
      1.4 Open terminal at __server__ directory
      
      1.5 To populate database, run the following command:
      
      > yarn populateDb
      
      or
      
      > npm run populateDb
      
      1.6 To run server in development environemt, following the below command:
      
      > yarn dev
      
      or 
      
      > npm run dev
      
      _Note_: To build the server from Typescript version to Javascript, run: __yarn build__ or __npm run build__ (Before running these command, make sure that there is Typescript running globally. If not, check out this [link](https://www.typescriptlang.org/index.html#download-links) to install it.

   2. **_Front end_**
   
       2.1 Navigate to __client__ directory
      
      2.2 Run following comand to install all needed packages:
                
      > yarn 
      
      or
      
      > npm install
      
      2.3 To run the single page application in development environemt, following the below command:
      
      > yarn start
      
      or 
      
      > npm run start
      
      _Note_: To build the application from Typescript version to Javascript, run: __yarn build__ or __npm run build__
      
