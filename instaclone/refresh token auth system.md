## Approach 
- on log in, server sends back an access token and refresh token
- access token will be stored in-memory by client, refresh token is in a HTTPOnly secure cookie
- on app start or page reload (or closing/reopening tab): a new access token must be fetched from the server by the client
- refresh token will last a month, access token will last 15 minutes
- reactive refresh using HTTP interceptor:
	- when access token expires and the client makes a request that requires authentication, server sends back 401
	- client intercepts that and tries to refresh token by making a request to the refresh endpoint
	- server checks if refresh token is set and valid. if successful, sets new access token and retries original request
	- if failure (refresh token expired), user has to re-enter creds
### request flow
- app starts, page reloads: client makes refresh request to gain new access token.
- client makes request with access token.
- if request requires authentication, server checks access token
	- if valid, proceed with request
	- if expired, send 401
- client receives response
	- if ok, continue
	- if 401, HTTP interceptor makes request to refresh endpoint
		- server checks refresh token 
			- if is valid and not in blacklist, issue new access token
			- else, 400 
		- client http interceptor receives refresh response
			- if valid, store new access token, retry original request.
			- if 400, redirect to login page.
	 
## Things to look in to (but adds complexity):
- **refresh token rotation.** - issuing new refresh token each time a refresh request is made to get a new access token. then the old refresh token is invalidated
- **JWT blacklist**
	- https://supertokens.com/blog/revoking-access-with-a-jwt-blacklist
	- https://github.com/marklewin/jwt-denylist/blob/main/server.js
	- if we need to **Invalidate refresh tokens** then we need to somehow store them? in a big application, seems like there'd be scalability issues
		- **also invalidating is a good idea for logging out too**
		- or we could only store blacklisted tokens and make sure a refresh token isnt in that list. but still, storing stuff on server seems meh
		- in-mem is faster (redis) but is lost if app restarts. database for long-term persistence

## Components
### Server-side
- new refresh endpoint
- setting up httponly, secure cookies
- set up redis cache for blacklist
- create logout route - needs to invalidate/delete refresh token
- also change expiration date for access token in login to like 15 min
- write tests for that?
### client-side
- set up the interceptor in rtk query https://redux-toolkit.js.org/rtk-query/usage/customizing-queries
- add way to store access token, probably in the authSlice
- make some way to initiate refresh token request on app start, pagereload
- testing?
### tests
- tests will def break. refactor tests
### mobile ui for logging out
- triple dot options btn in userprofile, opens a modal logout or cancel
### estimate
 - 3.5 working days (mid day of 3/21)
 - possible problems:
	 - this might be harder than it seems
	 - refactoring broken tests may take a while

