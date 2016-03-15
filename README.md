# Dots Honours Project
This repository contains a modified version of the code I used in order to test the thesis of my honours project. I've written a [blog post](http://michaelhudson.net.au/on-my-honours-project) which goes in to detail about the creation of this project.

This project in its current form is a bit of a toy for two players on a multitouch table or large tablet. The two players attempt to line up all of the Dots with their matching Shadow Dots (the paler ones in the background).

## Requirements
* [NodeJs](https://nodejs.org)
* [Gulp](http://gulpjs.com/)
  * Run `npm install -g gulp` to install
* [Bower](http://bower.io/)
  * Run `npm install -g bower` to install

## Installation instructions
After cloning this project navigate to the project directory and run the following commands.
```
npm install
bower install
```

To run the project locally, run `gulp browsersync`.

In order to deploy the site to another webserver you can run `gulp site` and deploy the contents of the target directory to your server.
