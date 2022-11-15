/**
 * @author Ruilin Hu and Yuang and William
 * @file - script to the image switching bottons
 * @version 0.0.1
 * @Created Nov 12, 2022
 * @Edited 
 * referenc source: https://www.w3schools.com/howto/howto_js_slideshow_gallery.asp
 */

//execute init when the contents in the window fully loaded
window.addEventListener('DOMContentLoaded', init);

//the variable to hold the current image's index
let coffee_picture_index = 0;
//total number of coffee images in the asset/images folder
const TOTAL_COFFEE_PICTURE_CNT = 4;
//the relative path to the pictures of the coffee images
const COFFEE_PICTURE_PATH = "./assets/images/coffee-picture";
//the extension of the coffee images file
const COFFEE_PICTURE_EXTENSION = ".png";

/**
 * This function will adjust the coffee image on the card based on the 
 * user's control.
 * @param int_change - the change in the index of the coffee picture to display.
 */ 
function next_image(int_change) {
   show_coffee_image(coffee_picture_index += int_change);
   console.log('imaged changed to: ' + COFFEE_PICTURE_PATH + 
        coffee_picture_index + COFFEE_PICTURE_EXTENSION);
}
 
/**
 * This function will set specific coffee image directly.
 * @param int_change - the index of the coffee picture to display on the current card.
 */ 
function set_image(int_change) {
   show_coffee_image(coffee_picture_index = int_change);
}
 
/**
 * This function will find the coffee image's element on the html and change
 * its src to the corresponding coffee's image.
 * @param int_change - the index of the coffee picture to display on 
 * the current card.
 */ 
function show_coffee_image(int_change) {
    if (int_change >= TOTAL_COFFEE_PICTURE_CNT) {
        coffee_picture_index = 0;
        //change to the first picture if index increases out of bounds
    }
    if (int_change < 0) {
        coffee_picture_index = TOTAL_COFFEE_PICTURE_CNT - 1;
        //change to the last picture is index decreases out of bounds
    }
    //find the image element on html
    const coffee_picture_element = document.getElementById('img_drink_image');
    //change the src of the image
    coffee_picture_element.src = 
        COFFEE_PICTURE_PATH + coffee_picture_index + COFFEE_PICTURE_EXTENSION;
 }

 //initialize things when the window loads
function init(){
    //find the button elements
    let switch_photo_left_arrow = document.getElementById('switch_photo_left_arrow');
    let switch_photo_right_arrow = document.getElementById('switch_photo_right_arrow');
    //attach event listeners to the arrow anchors
    switch_photo_left_arrow.addEventListener("click", function() {
        next_image(-1);
    });
    switch_photo_right_arrow.addEventListener("click", function() {
        next_image(1);
    });
}