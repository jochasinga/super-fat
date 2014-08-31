Chatapp-bookTutorial
====================

Book
----

    JavaScript programming: Pushing the limits by Jon Raasch


npm packages used:
------------------

    express
    express-generator
    nodemon
    ejs
    socket.io (not used yet)
    jsdocs (not used yet)

Basic file Structure
--------------------

    Used express-generator to build a basic express app setup.

    Step 1: npm install -g express
    Step 2: npm install -g express-generator
    Step 3: express <name_of_app>
    Step 4: npm install

    Note: Before running the app, go into app.js and set the port

    For more information see the following tutorial:
    (http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/)

    Note: When running the app, use nodemon app.js over node.js (https://github.com/remy/nodemon)


Changing the template engine to EJS
-----------------------------------

    Tutorial: http://robdodson.me/blog/2012/05/31/how-to-use-ejs-in-express/

    Step 1: npm install ejs
    Step 2: In app.js => app.set('view engine', 'ejs');
    Step 3: Replace existing Jade templates with ejs

        basic syntax:
            1. <% %>  - to execute some code
            2. <%= %> - to print some value in templates
            Note: it seems identical to Underscore.js templating

Socket.io with Express 4
-------------------------

    Docs : http://socket.io/docs/


