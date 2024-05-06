![Screenshot](https://github.com/nicoverali/caseritos/blob/master/laravel-admin-panel/public/images/logo.png)

<p align="center">Homemade meals market in React</p>

## General info

This monorepo contains the each of the projects I developed for the **Web Apps Engineering** course at Universidad Nacional del Sur.

Our goal was to first implement an admin panel with PHP Laravel Framework, then build an API with NodeJS, and finally a frontend client page with React. The topic was our choice, but it must met some given conditions:

- We should store at least 2 entities in out DB (excluding user entities)
- At least one of those entities must have an image or files attached
- There must be at least 2 user roles with different permissions
- Users must be able to access with username and password, and they must be able to recover their password in case they forget it

I decided to make a homemade meals market were users would have seller and buyer roles.
Sellers can publish their meals, set its price, stock, description, etc.
Buyers can search for published meals and make a purchase.

Please visit each project folder to see a more detailed description for each of these projects individually.

## Local Setup

All you need to have installed locally is Docker.

1. Build the Dockerfile at the root

```bash
docker build -t "caseritos:php" ./laravel-admin-panel
```

2. Run setup commands

```
docker compose up -d postgres
docker run --rm --network=caseritos caseritos:php php artisan migrate:fresh --force --seed --env=local
```

3. Run docker compose

```
docker compose up -d
```

You should now be able to access:

- PHP Admin Panel: http://localhost:8000
- API: http://localhost:3001
- NextJS Frontend: http://localhost:8000

### Credentials

To login to both the admin panel and the client side app, use the following credentials:

- User: cliente@caseritos.com
- Password: secret

## Demo Version

Unfortunately there are no more free hosting options, so demo version of all Caseritos apps are down and won't be available anymore.
The only way for now of interacting with the app is following the local setup instructions above.

## Screenshots

### Laravel version

<p align="center">
    <img width="49%" src="https://github.com/nicoverali/caseritos/blob/master/assets/laravel-screenshot-1.png">
    <img width="49%" src="https://github.com/nicoverali/caseritos/blob/master/assets/laravel-screenshot-2.png">
</p>

### NextJS version

<p align="center">
    <img width="49%" src="https://github.com/nicoverali/caseritos/blob/master/assets/nextjs-screenshot-1.png">
    <img width="49%" src="https://github.com/nicoverali/caseritos/blob/master/assets/nextjs-screenshot-2.png">
</p>
