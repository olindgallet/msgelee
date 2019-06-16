# msgelee

A cancelled game I worked on in Javascript.  Designed to be an adventure platformer I'm making public to help others learn.
Notes on game design and the game fragment is at https://olingallet.itch.io/ms-gelee.

**Why Javascript?**

Javascript was the most accessible language to me as I was doing web development.  Node.js offers great productivity through grunt to automate tasks like making backups and combining source code.  My favorite was using a CSS spritesheet generator to combine individual animation frames drawn to create a spritesheet for the game.  

In the end, problems came up with inconsistent joypad behavior and deployment files being unoptimized.  This to me is just a problem with game development with Javascript.  Originally, Javascript was meant to be used in webpages, but in past years it has been used offline through Node.js in everything from applications to server scripts.  I found it to have imperfect compatibility with hardware as controllers have different drivers for them, but I haven't found a way to access these different drivers in Javascript.  The language only has a general way of reading input.  I also wanted to deploy this game on low resource hardware like the Raspberry Pi, but as Chromium in NW uses a ton of resources, the result was very laggy and unplayable.

**What libraries are used?**

* Melon.js 0.9.11 (http://www.melonjs.org/)
* Gamepad by Priit Kalaas <kallaspriit@gmail.com> (https://github.com/kallaspriit/HTML5-JavaScript-Gamepad-Controller-Library)

**Final Thoughts**

Documentation on the code is light.  I wrote it for myself to deploy as a completed game and had no plans on releasing the source code.  The flow however is straight forward: Load the resources, transition from screen to screen, and capture and display interactions along the way.  

If you want to peek around at the assets, look in the dev files as they are what I edited before finalizing the assets.  ```data_dev``` holds the non-code assets like images, sfx, and music.  ```js_dev``` holds the code unobfuscated and uncombined.  To build I would use ```grunt compiletest``` to put everything together -- other commands of interest are in the ```grunt.js``` file.

And if you have any questions about how anything works, let me know here.
