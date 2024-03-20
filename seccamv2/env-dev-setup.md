## Setting up local DB
- Open Docker app and pull postgres DB
- use this docker-compose (use .env for creds `${DB_NAME}`:
``` yaml

version: '3.9'
services:
	postgres:
		image: postgres:bullseye
		ports:
			- "5432:5432"
		environment:
			- POSTGRES_DB=seccamdb
			- POSTGRES_USER=admin
			- POSTGRES_PASSWORD=password
		volumes:
			- postgres-data:/var/lib/postgresql/data
volumes:
	postgres-data:
```
- `docker-compose up -d` to run in detached mode (in the bg) 
	- replace `up` with `down` to stop it.
