# drawandshare
A web app that allows users to collaborate ideas using a free hand drawing canvas

_Note: This is a work in progress_

## How to run the project
Make sure you have installed node.js before starting to run the project.

Clone the project in a folder and open up a command prompt and execute the following commands.

`npm install`

`npm start`

Open a browser of your choice and fire up few tabs with the URL http://localhost:3000

Start drawing in the canvas by following the crosshairs pointer and observe that the drawing is reflected in other tabs as well. 

Things to work on to make the minimal functionality work properly:
* Fix the mouseevent offset to adjust the offset of canvas for the drawing to be precisely plotted according to the mouse position
* Implement a continuous plotting of lines while the mouse is still not released.
* Align the canvas properly in the page and make it responsive
* Add multiple shapes and text in the canvas
* Provision multiple stroke widths and different color options for stroke.
