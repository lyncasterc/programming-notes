# 2
## Topic 14 - Domain Languages
- the languages/frameworks you know influence how you think about problems
	- aka, why I think its important to be exposed to different languages/tech. if the only tool you have is a hammer, everything starts to look like a nail.
- some problems also suggest a programming solution.
## Topic 14 - Estimating
- understand what's being asked and the scope of it and begin to build a model (modeling a system can give you a better idea of how long it will take)
- when modeling:
	- map out the steps of development and a rough implementation plan
- when giving an estimate for a project, the best answer is I'll get back to you.
	- sometimes the best way to find out how long something will take is to start it.

# 3 - Basic Tools
- when it comes to storing knowledge, plaintext is king
## Topic 20 - Debugging
- when you discover a bug, it's your problem. don't find someone to blame even if it's not your fault. **fix the bug.**
- Isolate the bug. Find the steps to make it reproducible, make the bug occur with a single command if possible
- use TDD for the bug - write a failing test first before trying to fix. it can give  insights

# 4 - Pragmatic Paranoia
## Topic 23 - Design By Contract (DBC)
- technique that focuses on writing programs that do no more or less than what it claims to do
- documenting/verifying rights/and responsibilities of software.
- **conditions**:
	- **pre**: what is true in order for routine/function to be called. a function should never be called if its preconditions are violated
	- **post**: what the routine will have done after it is called.
	- **class invariants**: ensuring that this is true once routine has concluded
		- side note: **class invariants are conditions that hold true for instances of a class at the end of methods/constructors**
			- ex: this class has assertions in each method to maintain the valid state of an instance
				```python
				class Account:
					def __init__(self, balance):
						assert balance >= 0, "Balance cannot be negative."
						# Class invariant: balance should never be negative.
						self.balance = balance  

					def deposit(self, amount):
						assert amount > 0, "Deposit amount must be positive."
						self.balance += amount
						assert self.balance >= 0, "Balance cannot be negative after deposit."  

					def withdraw(self, amount):
						assert amount > 0 and amount <= self.balance, "Withdrawal amount must be positive and less than balance."
						self.balance -= amount
						assert self.balance >= 0, "Balance cannot be negative after withdrawal." 
				```
- (DBC sounds like assertions and type checking, etc) except a bit different because the function can't be called unless the conditions are met:
	- ex: elixir guard clauses
		```ruby
		# method can't be called unless amount > 0
		 ​def​ accept_deposit(account_id, amount) ​when​ (amount > 0) ​do​​     
			 ​# Some processing...​​   ​
		 end
		
		```
- **write code that is lazy**: strict about what it accepts before starting, doing as little a possible..
### How to Implement DBC
- **plan out what a routine or software module will do before writing code**
	- state the input range, boundaries, what the code will and will not do
	- write this in a comment or a test
- **use assertions, crash a program early**

## Topic 25 - assertive programming
- **“Whenever you find yourself thinking “but of course that could never happen,” add code to check it”


# 5 
## Topic 28 - decoupling
- **Tell, Don't Ask**
	- don't make decisions based on the internal state of an object and then update the object. TELL the object what to do for you.
	- The first method below tries to find a customer's order and apply a discount to their total, but it exposes a lot of internals about totals and orders
	- The second method is clear: find the order, apply the discount. The implementation is delegated to the objects. easier to change, cleaner, better encapsulation.
		- (also semantically better. the customer should tell us what order. the order has a total and can apply its own discount)
	```java
		​public​ ​void​ applyDiscount(customer, order_id, discount) {​   
			totals = customer
				.orders​
				.find(order_id)​
				.getTotals();​   
			totals.grandTotal = totals.grandTotal - discount;​   
			totals.discount   = discount;​ 
		}
		
		// TELLING 
		public​ ​void​ applyDiscount(customer, order_id, discount) {​  
			customer​
				.findOrder(order_id)​
				.applyDiscount(discount);​ 
		 }

	```

- ## Topic 29
	- **Events** - availability of information
		- like user clicking on button, a search finishing, etc
	- **software patterns in event-driven programs**
		- **Finite State Machines**
			- **state machines** - a specification on how to handle events
				- has finite number of states, including current state, and events related to that state
				- can be in exactly one of the states at any given time
				- **events are inputs that can trigger a transition to another state**.
				- 
				- ![[Pasted image 20240403000415.png]]
					- in this state machine, there are 4 events. 
					- ex: If were are in initial state and receive a header event, we can transition to reading state.  
					 ex: if we are reading and receive data event, we continue reading. 
			```js
			const TRANSITIONS = { 
				initial: { header: 'reading' }, 
				reading: { data: 'reading', trailer: 'done' }, 
			};
				
			let state = 'initial';
			
			while (state !== 'done' && state !== 'error') { 
				// Assume this function is implemented
				const msg = get_next_message();    
				
				if (TRANSITIONS[state] && TRANSITIONS[state][msg.msg_type]) {  
				   state = TRANSITIONS[state][msg.msg_type];   
				} else {
				     state = 'error';   
				 } 
			}
			```
		- **observer pattern**
			- **observables**: events/state changes that can be "observed"
			- **observers**: clients that are interested in the events.
			- **subject**: maintain the list of observers. when an event/state change occurs, it calls the observers' methods.
			- this pattern allows an object to notify other objects in a more loosely coupled fashion.
			