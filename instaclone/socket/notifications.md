## notification
- **type**: like | mention | comment | follow
	- likeEntity: comment | post
- **belongs to: User | Post**
	- **user bio mention**  -> entity is user. links to the user profile
	- **follow** -> links to user profile
	- **post caption mention, comment mention or comment notification or like notification** -> entity is post. all should link to the post. 
- **creator**: User
- **recipient**: User
- **hasBeenRead**: boolean
### types:
- **like**
	- **liking a post** - post creator gets the notification.
		- unless they like their own post
	- **liking a comment** - comment creator gets the notification 
		- unless they like their own comment
- **mention (@ing someone)** 
	- **comment replies**
		- the creator of the comment being replied to is the user being mentioned. 
		- they get a **mention notification** (**NOT** a comment notification) 
			- (unless they @ themselves)
	- **post caption** - the user being mentioned in a post caption gets a mention notification
		- - (unless they @ themselves)
	- **user bio** - the user being mentioned in a post caption gets a mention notification
		- - (unless they @ themselves)
	- **comment** - users can be mentioned in a comment. they receive a mention notification.
- **comment**
	- post creator gets a notification anytime a comment is made on their post (parent comment or reply to another comment)
		- unless they comment on their post
- **follow** - user gets notification anytime they are followed.

## client
- notification redux store? to store notifications. it can be counters for each notification type.
- clients dont emit anything to the server for now?
### flow
- **user logs in/page refresh**
	- client fetches unread notifications from server, updates store and displays the heart red dot and popover near the heart for all notifications (like: 1, follow:2, etc)
	- user joins a socket room consisting of their own id. so each user is in a room of their own, listens for notifications.
	- on notification message, client updates the store with the new count, shows red dot it not already showing, shows popover for that notification type with updated count
## server
- stores user connections
- listens for new connections verifies access token, drops any invalid connection
- anytime the server processes a notifiable event:
	- create, persist notification
	- check of recipient is connected. if so, push notification