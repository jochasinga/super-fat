Super Fat: Furby Chat Client
============================

This repository is dedicated to the code for "Super Fat" Toy Project to be presented and exhibited at the Makerfaire NY on September 20-21, 2014. Contributions are super-appreciated and contributors will definitely be mentioned.

Project Description
===================

*Super Fat* is an speculative attempt to treat a toy object as a "fat" web chat client as opposed to the "thin" web client in the usual MVC paradigm. By being "fat" it simply means that more computing is moved into the client from the server or cloud, and by being "super fat" is actually making that computing physical.

Requirements
============

+ [Meteor.js](http://example.com/ "Meteor") for the chat client
+ [Famo.us](https://famo.us/ "Famo.us") for its UI 
+ [Arduino](http://arduino.cc/ "Arduino") for the toy
+ [Cellv1.0](http://www.sparqee.com/portfolio/sparqee-cell/ "Sparqee Cellv1.0") for 3G communication

Instructions
============

## Chat App ##

1. Install Meteor via your commandline  `$ curl https://install.meteor.com/ | sh`
2. Inside `super-fat/chatapp/` type `meteor run` to run the app
3. Open your browser and go to `http://localhost:3000/`

It's also a good idea to install [Node.js](http://nodejs.org/ "Node.js") and [NPM](https://www.npmjs.org/ "Node Packaging Manager")

## Famo.us ##

**Famo.us** is a UI frontend framework in pure JavaScript. It has its own 3D engine and renders to the GPU instead of using conventional DOM manipulation. It's super cool and its syntax and workflow are very similar to [Processing](http://www.processing.org) and [OpenFrameworks](http://www.openframeworks.cc). It works on "surfaces" which are like canvas objects or [ofFbo](http://www.openframeworks.cc/documentation/gl/ofFbo.html) in OpenFrameworks. Thus, this should be pretty easy for you guys from the interactive world.