# Setu Splitwise Apis

## Start the server

    Run : node server.js Or npm run dev

The server will open up at localhost:1234 or any other port in specified in .env file

## There are 4 APIs

1. /addUser : POST API

it creates a user in the collection.

required fields: username, email.

2. /allUsers: GET API

gets all users present in the collection.

3. /settle: POST API

sets the amount to 0;

4. /getUser: Get API

required fields : username

get a particular user

5. /addExp : POST API

adds Expense for the users.

fields: username : required
amount
equal: true/false - to specify whether split will be equal or not
userarray: in case of not equal a userarray must be sent to specify the splitting among the users

The DB consists of a single table. I intially planned to use multiple tables :
Group, User, Expense and Relation which will have key id pairs of group and user. However, I lost precious time in setting up my environment, to complete the task during a weekday turned out to be a bit difficult.
