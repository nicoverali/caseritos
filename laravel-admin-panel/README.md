[![Screen-Shot-2022-10-18-at-14-20-22.png](https://i.postimg.cc/x8FyLMfD/Screen-Shot-2022-10-18-at-14-20-22.png)](https://postimg.cc/sG7hrBGw)

<p align="center">Homemade meals market in Laravel: <a href="https://caseritos.herokuapp.com/">Caseritos App</a> </p>

## General info

This web app is part of a project for **Web Apps Engineering** subject at Universidad Nacional del Sur.

Our goal was to implement a web application using PHP Laravel framework. The topic was our choice, but it must met some given conditions:
- We should store at least 2 entities in out DB (excluding user entities)
- At least one of those entities must have an image or files attached
- There must be at least 2 user roles with different permissions
- Users must be able to access with username and password, and they must be able to recover their password in case they forget it

Altough the focus on this project was on the backend, we were encouraged to make a professional, good looking web page. 

## Development

I decided to make a homemade meals market were users would have seller and buyer roles.
Sellers can publish their meals, set its price, stock, description, etc.
Buyers can search for published meals and make a purchase.

I use Breeze starter-kit as a template for login and dashboard pages, and Spatie for managing users roles and permissions.

Some highlights

- Web is reponsive
- I make a thumbnail for each uploaded image to reduce network traffic and optimize web performance

## Demo version

This version uses fake data as well as preset users.

**You can visit the demo version at [Caseritos demo version](https://caseritos.herokuapp.com/)**

## Video demo

At the end of this project we were requested to make a video showing what we made and explaining all the features in our app.

<a href="https://www.youtube.com/watch?v=LxOUrKprCls">
    <p align="center">
    <img src="https://i.postimg.cc/W4qZLHcQ/Screen-Shot-2022-10-18-at-14-53-48.png"/>
    </p>
</a>
