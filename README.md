Super Fat: Furby Chat Client
============================

This repository is dedicated to the code for "Super Fat" Toy Project to be presented and exhibited at the Makerfaire NY on September 20-21, 2014. Contributions are super-appreciated and contributors will definitely be mentioned.

Project Description
-------------------

*Super Fat* is an speculative attempt to treat a toy object as a "fat" web chat client as opposed to the "thin" web client in the usual MVC paradigm. By being "fat" it simply means that more computing is moved into the client from the server or cloud, and by being "super fat" is actually making that computing physical.

Requirements
------------

+ [Node.js](http://nodejs.org) and [Socket.io](http://socket.io)
+ [Arduino](http://arduino.cc/ "Arduino") for the toy
+ [Cellv1.0](http://www.sparqee.com/portfolio/sparqee-cell/ "Sparqee Cellv1.0") for 3G communication

Instructions
------------

### Chat App ###

Install [Node.js](http://nodejs.org/ "Node.js") and [NPM](https://www.npmjs.org/ "Node Packaging Manager"), since Meteor runs on top of Node.

1. cd into the `chatapp-socket.io` 
2. `npm install` all dependencies from `package.json` 
3. run `node index.js` and point your browser to `http://localhost:3000`

---------------------------------------

Updates & Progress
------------------

**08/28/14:**
After two days catching up, I decided to leave **Famo.us** out of this project unless there's time left to implement it to other mobile devices. It's a shame but the chat client is just a part of this project, and the most important thing is the _proof of concept_ and MVP.

**08/29/14:**
The chat app is done (pretty) much. Plan is to get rid of all the routes and make it single-paged with the chat box right on the home page for easy demo. I have  done some studies on Meteor's DDP (Distributed Data Protocol). It's simple JSON I/O. Wonder if that could be easy enough to communicate with the Arduino.

**08/31/14:**
I decided to redo a much simpler chat client with Socket.io. Since next week it'll be more on the hardware side, so I decide it's the best not to look back to Meteor.js. 
Some caveats that need fixings are:
+ Inresponsiveness of the chatbox on horizontal browser resize.
+ When run on `localhost:3000`, only one user is allowed to logged in. Once I logged in from another browser (or another tab) on the same computer, my last session just logged out.
The idea is to stream the messages from the chat through the server and broadcast to other clients, including the arduino-powered Furby without the need for a persistent database (is it possible?!)
[Marcus Willock]("https://github.com/crazcalm") and I had a look at [Johny-five]("https://github.com/rwaldron/johnny-five") Javascript-arduino library for Nodebots. Will look into it more.





