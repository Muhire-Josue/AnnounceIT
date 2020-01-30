[![Build Status](https://travis-ci.org/Muhire-Josue/AnnounceIT.svg?branch=develop)](https://travis-ci.org/Muhire-Josue/AnnounceIT)
[![Coverage Status](https://coveralls.io/repos/github/Muhire-Josue/AnnounceIT/badge.svg?branch=ch-refactor-helper-folder-ds-%23170844806)](https://coveralls.io/github/Muhire-Josue/AnnounceIT?branch=ch-refactor-helper-folder-ds-%23170844806)

# AnnounceIT
AnnounceIT comes in as a solution to broadcasting agencies which will will allow them to be able to receive and manage announcements. 


### Links
##### gh-pages:  https://muhire-josue.github.io/AnnounceIT/UI/index.html
##### heroku:  https://anounce-it.herokuapp.com/api/v1/
##### API Documentation:  https://documenter.getpostman.com/view/3997258/SWT8eyKA?version=latest

### Requirements
- `Nodejs` - a JavaScript run-time environment that executes JavaScript code outside of a browser
- `POSTGRES` - a database management system for data persistence
- `.env.example` - a file that contains all the variable environment for this project

### SETUP
First clone it to your machine: 

```
https://github.com/Muhire-Josue/AnnounceIT.git
```

Open it using your favorite IDE,
I used ([vs code](https://code.visualstudio.com/download))

Install all necessary node modules
```
npm install
```
To start the app
```
npm start
```
To run tests
```
npm test
```
### API ENDPOINTS
| API | Methods  | Description  |
| ------- | --- | --- |
| `/api/v2/` | GET | Welcome message |
| `/api/v2/auth/signup` | POST | Create account |
| `/api/v2/auth/signin` | POST | Login |
| `/api/v2/announcement` | POST | Create announcement |
| `/api/v2/announcemente/` | GET | Get all announcements |
| `/api/v2/announcement` | GET | Get all your announcements |
| `/api/v2/announcements` | GET | Get all your announcements by status |
| `/api/v2/announcement/:id` | GET | Get an announcement |
| `/api/v2/announcement/:id` | PATCH | Update an announcement |
| `/api/v2/announcements/:id` | PATCH | Modify the status of an announcement |
| `/api/v2/announcement/:id` | DELETE | Delete an announcement |
### How can it be manually tested
- using [postman](https://www.getpostman.com/downloads/)
### Pivotal tracker stories
- Follow this [Link](https://www.pivotaltracker.com/n/projects/2429064)

### Technologies used

- `NPM` - a package manager for the JavaScript programming language
- `Git` - version-control system for tracking changes in source code during software development
