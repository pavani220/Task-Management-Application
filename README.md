# Task Management Application

## Project info

# Frontend:

npx create-react-app frontend 
npm install axios react-router-dom
npm install -D tailwindcss postcss autoprefixer → npx tailwindcss init -p
cd frontend && npm start

# Backend:

npm init -y
npm install express cors dotenv
Dev: npm install --save-dev nodemon

# Technologies Used:

1. ReactJS    
2. TypeScript
3. Javascript
4. CSS
5. HTML
6. API
7. Firebase Database
8. JWT

# Backend:

1. At Firebase Authentication the Signup/Login users will display
2. The Tasks that are added will stores on the firestore database in firebase
3. Based on username and password the tokens are established to maintain sessions between user and account

# Frontend:
1. Login,Signup UI
2. Home dashboard consist of Count of total tasks,active atsks,completed tasks count
3. The Add task button used to add the new task into the list consist of attributes title,description,priority
   
# Database Schema:
The fields of the Firebase database are Unique ID,Title,Description, Creationdate,Priority,userid

#Sample Task Data at Firebase:

creationDate  (string)
"2025-04-30T09:13:02.339Z"

description  (string)
""

priority   (string)
"medium"

status   (string)
"pending"

title  (string)
"React"

userId
"dynbnmhWyMRZRhJhzTwkRo68KWL22222"


