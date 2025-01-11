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

Always think about worst case
and corner cases 
to save from attakers