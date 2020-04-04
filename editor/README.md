# Client Facing code for Digital Posters (VueJS)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### General Knowledge

This is the source code for the poster editor section of the web application. All code to be modified resides in the src directory. Some directories to take note of in here:

- views: Different pages to route to using vue-router
- router: Holds information for the vue-router to work correctly
- components: Individual components to be used by pages in the views directory

### Auth - Views

Authentication screen where a user can signup or login from. This is held at the root location of our web app. Nothing special about this view other than being a simple form. 

### Dashboard - Views

Dashboard that pulls in and displays all posters created by user using the user ID passed in through the route params. Users can Create and Delete posters from here. They can also choose what poster to edit.

### Editor - Views

Main poster editor view, from here a user can make changes to their poster. They can save, preview and publish their poster for others to see. This view is extremely complicated due to the dynamic nature of an editor. When it is originally mounted, it uses the user ID and poster ID to pull in the poster content to populate the editor with.

### StaticPoster - Views

This is a lite version of the Editor view, it does not allow for any edits to be made. This view is solely for viewing published posters that cannot be edited and keeping the source code to a minimal. 

### Router

|     View     |   Requirements   |
| ------------ | ---------------- |
| Auth         | None             |
| Dashboard    | UserID           |
| Editor       | UserID, PosterID |
| StaticPoster | PubishID         |

### InfoCard - Components

This component holds the text editor where the content for an individual block is placed. From here, we can decide to disable and save individual block content.

### InfoCardStatic - Components

A lite version of the above component. These components only allow for content to be viewed, no further edits can be made. It is solely meant for the published poster.

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
