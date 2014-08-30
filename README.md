Super Fat: Furby Chat Client
============================

This repository is dedicated to the code for "Super Fat" Toy Project to be presented and exhibited at the Makerfaire NY on September 20-21, 2014. Contributions are super-appreciated and contributors will definitely be mentioned.

Project Description
-------------------

*Super Fat* is an speculative attempt to treat a toy object as a "fat" web chat client as opposed to the "thin" web client in the usual MVC paradigm. By being "fat" it simply means that more computing is moved into the client from the server or cloud, and by being "super fat" is actually making that computing physical.

Requirements
------------

+ [Meteor.js](http://example.com/ "Meteor") for the chat client
+ [Arduino](http://arduino.cc/ "Arduino") for the toy
+ [Cellv1.0](http://www.sparqee.com/portfolio/sparqee-cell/ "Sparqee Cellv1.0") for 3G communication
+ [Famo.us](https://famo.us/ "Famo.us") for its UI (If there's enough time)

Instructions
------------

### Chat App ###

1. Install Meteor via your commandline  `$ curl https://install.meteor.com/ | sh`
2. Inside `super-fat/chatapp/` type `meteor run` to run the app
3. Open your browser and go to `http://localhost:3000/`

It's also a good idea to install [Node.js](http://nodejs.org/ "Node.js") and [NPM](https://www.npmjs.org/ "Node Packaging Manager"), since Meteor runs on top of Node.

### Distributed Data Protocol (DDP) ###

This is the protocol used by Meteor. Read more [here](https://meteorhacks.com/introduction-to-ddp.html "DDP"). It's simple JSON client-server I/O. There's a simple tool to track a Meteor app's DDP messages in real-time called [DDP-analyzer](https://github.com/arunoda/meteor-ddp-analyzer "DDP-analyzer by Arunoda"). Here's how to use:

1. install DDP analyzer from npm - `sudo npm install -g ddp-analyzer`
2. start the proxy server - `ddp-analyzer-proxy`
3. `cd` to the meteor app directory and start the app as shown below

apply these commands in the terminal console

```bash

export DDP_DEFAULT_CONNECTION_URL=http://localhost:3030
meteor
```
---------------------------------------

Updates & Progress
------------------

**08/28/14:**
After two days catching up, I decided to leave **Famo.us** out of this project unless there's time left to implement it to other mobile devices. It's a shame but the chat client is just a part of this project, and the most important thing is the _proof of concept_ and MVP.

**08/29/14:**
The chat app is done (pretty) much. Plan is to get rid of all the routes and make it single-paged with the chat box right on the home page for easy demo. I have  done some studies on Meteor's DDP (Distributed Data Protocol). It's simple JSON I/O. Wonder if that could be easy enough to communicate with the Arduino.





