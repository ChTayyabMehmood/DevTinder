# Dev Tinder API List

## authRouter

-Post /signup
-POST /login
-POST /logout

## profileRouter

-GET /profile/view
-PATCH /profile/edit
-PATCH /profile/password

## connectionRequestRouter

-POST /request/send/interested/:userID
-POST /request/send/ignored/:userID
-POST /request/review/accepted/:userID
-POST /request/review/rejected/:userID

## userRouter

-GET /user/connections
-GET /user/requests/received
-GET /feed -Gets you the profiles of other users on plateform

Status: interested , ignore, accepted, reject
