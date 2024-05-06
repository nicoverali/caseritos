[![Screen-Shot-2022-10-18-at-16-44-57.png](https://i.postimg.cc/fLvKPRdH/Screen-Shot-2022-10-18-at-16-44-57.png)](https://postimg.cc/BLXHLsMD)

<p align="center">Homemade meals market in React: <a href="https://caseritos-react.herokuapp.com/">Caseritos App</a> </p>

## General info

This web app is part of a project for **Web Apps Engineering** subject at Universidad Nacional del Sur.

This app is a continuation of my other [Laravel project](https://github.com/nicoverali/caseritos-laravel), for which I developed a homemade meals market web app. That previous project included a PostgreSQL database with data about users, products and orders. We then develop a NodeJS API to query that database which you can access at [Caseritos API](https://caseritos-api.herokuapp.com/).

This React app consumes from that API, showing a user-friendly webpage to clients who want to buy products from sellers.

## Development

The page was developed in **Typescript, with React and the [NextJs](https://nextjs.org/) framework** which I will describe later.

The development of the page was done following the **[Component-Driven-Development procedure](https://www.componentdriven.org/)**, that is, first the smallest and reusable components of the application are made and from these the whole application is built.

This type of development is usually accompanied by unit tests for each component; in this case, due to time constraints, unit tests were not performed, but the **[Storybook](https://storybook.js.org/)** tool was used for the development of each component in isolation.

Finally, a separation was made between the component logic and the business logic, placing the latter within services available for the components.

#### Features 

**Accessibility**: The components are designed to meet accessibility standards. The report produced by Lighthouse indicates a near perfect score in this category.

**Progressive Web App**: The application is PWA, that is, it can be installed on a device and used as if it were a native application. Again, the report given by Lighthouse indicates that this category is satisfactorily met.

**Server-side rendering**: By using NextJs as a framework, we have facilities to implement this technique, which basically consists of rendering all or part of the final HTML of a page that uses a library like React or Vue.
This pre-rendering can be done at compile time (higher efficiency), or in real time with a user request. This can improve the performance of a page since it takes advantage of the computational and network power of the server to preload information from APIs and populate HTML. In addition, it is very important for the SEO of the page.

## Demo version

This version uses fake data as well as preset users.

**You can visit the demo version at [Caseritos demo version](https://caseritos-react.herokuapp.com/)**

## Video demo

At the end of this project we were requested to make a video showing what we made and explaining all the features in our app.

<a href="https://youtu.be/FPANIc1nRfA">
    <p align="center">
    <img src="https://i.postimg.cc/wv0NJWnv/Screen-Shot-2022-10-18-at-17-05-04.png"/>
    </p>
</a>
