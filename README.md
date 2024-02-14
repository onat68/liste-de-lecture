# Bookmarking App
## About
- We're being recommended cultural items on a daily basis, however, it is rarely practical to take notes and when it is, they end up being hard to decypher.
- We often find ourselves stumped when having to pick a movie or TV show to watch, despite the staggering amount of content available these days. - This massive amount of content is often scattered across many competing services, with specific recommendation and bookmarking systems.

This application is designed to address these challenges and provide a straight-forward and intuitive way of managing recommandations.

## Access the app
A preview of the app will soon be accessible @ http://app.bookmarkit.one
User accounts are not enabled at the moment and will be coming soon.
## Project Overview
### Key Features
#### Comprehensive Search
##### Users can search for any type of cultural item and are provided with extensive and relevant search results.
As a user, I want to quickly find information about any item being recommended to me, even when provided with vague information such as a partial title or an author's name.
##### Acceptance Criterias:
- Search engine is insensitive to typos and accepts keywords.
- Search results are ordered from most to less likely, accounting for disambiguation.
- Time to search completion never exceeds five (5) seconds 
    
#### Detailed Bookmarking
##### Users are provided with detailed information about each item.
As a user, I want to be able to quickly find the specific recommended item in the list of search results thanks to ample details, and I want my bookmarks to be equally detailed for easy reference.
##### Acceptance Criterias:
- Search results provide a title, author or director name, release date, description or summary, genre and a cover or poster image when available.
- The information is clearly presented and digestible, with a description/summary, color coded item type and large bold titles.
- The presentation is consistent accross item types while also accounting for their specificity.
- Search results and bookmarded items are similar in every way except search results being presented with an "add to favorites" button.
        
#### Platform-Agnostic Bookmarking
##### Data is aggregated from multiple relevant streaming platforms and cultural database without requiring identification. 
As a user, I want to be able to manage my recommandations in a single app without having to log in to any other service, but I also want to be directed to the platform where the content is currently available when I want to.
##### Acceptance Criterias:
- The application is self-sufficient and doesn't rely on third party services, but references those services so that the user can access the content when needed.

