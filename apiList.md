# DevTinder API's

## Authentication Router
POST /auth/signup
POST /auth/login
GET /auth/logout

## Profile Router
GET /profile/view
PATCH /profile/edit
PATCH /profile/password

## Connection requests Router
POST /requests/send/interested/:userId
POST /requests/send/ignored/:userId
POST /requests/review/accept/:userId
POST /requests/review/reject/:userId

## User feed Router
GET /user/connections
GET /user/requests
GET /user/feed

Request's Status: Interested, rejected, accepted, ignored

Always think about worst case and corner cases to save from attakers

Throught process while writting post and get api's : POST Vs GET API's
In post u should be think like a you are guard of your database, think every possible corner cases and about attacker, and verify if user or anybody can not enter wrong data in your database.

In get you are like a customer of your database, you are asking for data, you are not going to have a lot of data, verify we are sending data which is allowed and send data to authorized users.
