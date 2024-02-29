# Bookmarking App
## About
- We're being recommended cultural items on a daily basis, however, it is rarely practical to take notes and when it is, they end up being hard to decypher.

- We often find ourselves stumped when having to pick a movie or TV show to watch, despite the staggering amount of content available these days.

- This massive amount of content is often scattered across many competing services, with specific recommendation and bookmarking systems.

This application is designed to address these challenges and provide a straight-forward and intuitive way of managing recommandations.

### Contributors
This project was started by two **Ada Tech School** students in Paris and aspiring full-stack developers, Onat Rigault and Louis Coutel (me). We shared a common discontent with the issues highlighted above as well a a profound interest in music, litterature and cinema. Having complimentary skills in web development (back-end for Onat, front-end for me), we had a couple main objectives:
- Introduce each-other to the "other side" of web development and share our respective knowledge.
- Tackle our first fully-fledged app and try our hand at using a front-end framework and building a HTTP server.

## Access the app
A preview of the app will soon be accessible @ http://app.bookmarkit.one
User accounts are not enabled at the moment and will be coming soon.

## Project Overview
### Key Features
#### Comprehensive Search
*Users can search for any type of cultural item and are provided with extensive and relevant search results.*
> As a user, I want to quickly find information about any item being recommended to me, even when provided with vague information such as a partial title or an author's name.
    
#### Detailed Bookmarking
*Users are provided with detailed information about each item.*
> As a user, I want to be able to quickly find the specific recommended item in the list of search results thanks to ample details, and I want my bookmarks to be equally detailed for easy reference.
        
#### Platform-Agnostic Bookmarking
*Data is aggregated from multiple relevant streaming platforms and cultural database without requiring identification.*
> As a user, I 
ant to be able to manage my recommandations in a single app without having to log in to any other service, but I also want to be directed to the platform where the content is currently available when I want to.
### Project structure
#### Server side:
The app rests on a **Node.js/Express** back end, tasked with:
- serving the app, dealing with client-side virtual routes with the **connect-history-api-fallback** to prevent navigation from triggering meaningless server requests
- handling third-party API requests with dedicated clients
- providing the client with sorted and aggregated data from these providers
- saving items bookmarked by the client in the database
- handling database operations

Data is managed with MongoDB/Atlas, each cultural product being represented by a document:

```javascript
const albumSchema = new mongoose.Schema({
    note: { type: String, required: false },
    albumUrl: { type: String, require: true },
    authors: { type: String, required: false },
    date: { type: String, required: false },
    externalId: { type: String, required: false },
    genre: { type: String, required: false },
    img: { type: String, required: false },
    title: { type: String, required: true },
    type: { type: String, required: true },
})
```

#### Client side:
The app was built with **Vue.js** using **Pinia** for state management and styled with **TailwindCSS**
It's offers two main views:
- The Timeline view, which displays bookmarked items

![Timeline view screen-shot](/assets/TimelineView.png)

- The Search view, that allows the user to query third-party APIs through the server and displays search results

![Search view screen-shot](/assets/SearchView.png)

## What's next ?
We're currently prioritizing these features:
- Secure self-hosting with a domain name (incoming!)
- User accounts and authentification
- Recommandation system
- More third-party services integration (YouTube Red, Spotify, Netflix...)

In the future we'd like to add filters, user preferences and more types of cultural items such as podcasts, tv shows and even video games. We're very intent on porting the app to mobile, possibly as a Progressive Web App.
