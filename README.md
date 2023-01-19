# ReType Web Game

![status](https://img.shields.io/badge/Build%20and%20Test-Pass-success)  
![DockerStautus](https://img.shields.io/badge/Docker%20Build%20Status-Pass-success)  
![Building Status](https://img.shields.io/badge/Status-Pass-success)
<img width="1919" alt="image" src="https://user-images.githubusercontent.com/34475380/169993603-39ad495b-5aad-40c8-93af-b369f7395061.png">
Table of Contents
=======================

* [What is ReType By HSYYDS?](#what-is-ReType-by-hsyyds)
* [What is ReType?](#what-is-ReType)
* [Technologies that are used to build the project](#Technologies-that-are-used-to-build-the-project)
* [URL for the website](#URL-for-the-website)
* [Docker Installation](#Docker-Installation-For-Endpoint)
* [Endpoint Test](#EndPoint-Test)
* [Future Plan](#Future-Plan)
* [Directory Structure](#Directory-Structure)
* [Project Management Tool](#Project-Management-Tool)
* [Contributing](#Contributing)
* [Acknowledgements](#Acknowledgements)
---
What is ReType by HSYYDS?
------
This project is a web-based version of the ReType game that s allows our application to be more independent and convenient for use. Users can experience more fun than the original editor version of the ReType software. Under the premise of improving user’s English level, allowing users can experience the joy brought by the game in the process of learning words, making learning not boring.

What is ReType?
------
ReType: Quick Text Editing with Keyboard and Gaze is an application developed jointly by Dr. Shyamli Sindhwani, Dr. Gerald Webber from the University of Auckland, and Dr. Christof Lutteroth from the University of Bath, and published in 2019 CHI Conference on Human Factors in Computing Systems. This ReType application makes everyday interactions more fluent for professional keyboard users. However, we are inspired by the concept of the ReType application and decided to further extend its keyboard typing capabilities from its plugin based on Microsoft Word and gamify it to make it accessible to a broader audience.

If you don't want to host your own instance, check out https://api.dxh000130.top for a hosted version of the backend, and check out https://www.dxh000130.top for a hosted version of the front-end.

Technologies that are used to build the project
------
Backend:  .Net and C# with ASP.NET framework  
Frontend: HTML5  
          CSS5  
          Vanilla JavaScript  

URL for the website
------
https://www.dxh000130.top

Docker Installation For EndPoint
------
```
docker build -t aspnetapp .
```
Need to apply for the domain name and the SSL certificate corresponding to the domain name
SSL Certificate Directory: \Endpoint\ReType\ssl  
Also need to set the certificate directory and password in the Docker environment variable.
```
ASPNETCORE_Kestrel__Certificates__Default__Path: /ssl/aspnetapp.pfx
ASPNETCORE_Kestrel__Certificates__Default__Password: ********
```
Note: The certificate must be in PFX format only and must have a password


EndPoint Test
------
Check out https://github.com/uoa-compsci399-s1-2022/HSYYDS/tree/main/PostMan%20test for local version and hosted version

Future Plan
------

Up to now, the implementation of REType is based on security, reliability, and simplicity, and achieves the basic functions requested by clients, including leaderboard, fuzzy retrieval, highlighting, and automatic rectification of misspelled words. Meanwhile, we have realized the free account login, Google login on server side, registration, modify information, error word prompt, word query and other functions.  

However, there are some advanced functionalities that are not implemented due to time and knowledge constraints, which are potential work to be followed up in the future:  
(1)	Add the Google account authentication login channel on the local end, to solve the problem of cross-origin sharing standard and enable the browser to access Google login.  
(2)	Add the administrator authentication system, allow the administrator to modify and view the basic information of users, and set the administrator permissions, respectively manage different function columns of the website.  
(3)	Improve the accessibility of web pages, for example, for patients with visual impairment, they can choose their own page color, contrast, gray scale. For people with physical defects, add keyboard access, recitation and other functions.  
(4)	Develop mobile terminal software to copy the web page version perfectly on the mobile terminal, providing users with a more convenient and independent choice.  
  
Moreover, in order to improve the user experience and focus on UI design, we are committed to:  
(1)	Add a user performance analysis table, including the average time to complete different difficulty levels, and analyze the user's English level through big data.  
(2)	Design online competition matching, which can be interpreted as a way for users to find other players currently online on the site and compete with that player.  
(3)	Add a user feedback interface that allows users to make sound suggestions to and receive feedback from web designers.
In short, our goal is to go beyond existing features and interfaces, and we are committed to improving and following up, to introduce and recommend this project to more people.  
Project Management Tool
------
We have chosen Kanban methodology and Wechat communication for our project management.
https://alexscompany34.teamwork.com/#/home/inbox
Directory Structure
------
    .
    ├── Endpoint/ReType     # The EndPoint (Asp .Net Core)
        ├── Controllers          # Implementation of API ports and functions
        ├── Dtos                 # Input or output format
        ├── Handler              # Help file (authentication)
        ├── Migrations           # Database connection and control
        ├── Model                # Table definitions for a database
        ├── Properties           # Some basic Settings
        ├── ssl                  # SSL certificate
        ├── bin                  # Cache
        ├── data                 # Some helper programs
        ├── obj                  # Cache
    ├── PostMan test        # Endpoint Test
    ├── Web                 # Frontend
        ├── css                 # CSS style
        ├── js                  # Javascript
        ├── images              # Some images
        
Contributing
------

Alex Qin  
Jiaxuan Shi  
Shasha Jiang  
Shelvin Liu  
Song Han  
Xuheng Duan  

Acknowledgements
------
We would like to express our gratitude to all those who helped us during the completing of this project.  
  
My deepest gratitude goes first and foremost to teaching team (Asma Shakil & Andrey Borro) and clients (Shyamli & Gerald). The teacher team provides a platform for us to communicate with customers in a timely manner and provide feedback and help to our requirements. Meanwhile, clients who play a vital role in the design of the project put forward a lot of instructive advice and useful suggestions for us.  
  
We are also deeply indebted to those who use our web game and fill out the questionnaire. It was because of the bugs they found and the constructive comments they provided that the project came to a successful end.

**Contact us**
EMAIL: pqin316@aucklanduni.ac.nz
Please feel free to contact us if you have any questions.
