/**
 * @author Ruilin Hu and Yuang and William
 * @file - script to the image switching bottons
 * @version 0.0.2
 * @Created Nov 12, 2022
 * @Edited Nov 24, 2022
 * referenc source: https://www.w3schools.com/howto/howto_js_slideshow_gallery.asp
 */

// Execute init when the contents in the window fully loaded
window.addEventListener('DOMContentLoaded', init);
// The variable to hold the current image's index
let coffee_picture_index = 0;
// Total number of coffee images in the asset/images folder
const TOTAL_COFFEE_PICTURE_CNT = 4;
// The relative path to the pictures of the coffee images
const COFFEE_PICTURE_PATH = "./assets/images/coffee-picture";
// The extension of the coffee images file
const COFFEE_PICTURE_EXTENSION = ".png";
// Next left image
const LEFT_IMAGE = -1;
// Next right image
const RIGHT_IMAGE = -1;
// Default image is the first one
const DEFAULT_IMAGE_ID = 0;

/**
 * This function will adjust the coffee image on the card based on the
 * user's control.
 * @param int_change - the change in the index of the coffee picture to display.
 * @return void
 */
export function next_image(int_change) {
   show_coffee_image(coffee_picture_index += int_change);
   console.log('imaged changed to: ' + COFFEE_PICTURE_PATH +
        coffee_picture_index + COFFEE_PICTURE_EXTENSION);
}

/**
 * This function will return the current coffee_picture_index.
 * @return coffee_picture_index, the current index of the coffee picture
 */
export function get_image_id() {
    return coffee_picture_index;
}

/**
 * This function will return the current coffee_picture_index.
 * @return void
 */
export function reset_image_id() {
    coffee_picture_index = DEFAULT_IMAGE_ID;
}

/**
 * This function will set specific coffee image directly.
 * @param int_change - the index of the coffee picture to display on the current card.
 * @return void
 */
export function set_image(int_change) {
   show_coffee_image(coffee_picture_index = int_change);
}

/**
 * This function will find the coffee image's element on the html and change
 * its src to the corresponding coffee's image.
 * @param int_change - the index of the coffee picture to display on
 * the current card.
 * @return void
 */
function show_coffee_image(int_change) {
    if (int_change >= TOTAL_COFFEE_PICTURE_CNT) {
        coffee_picture_index = DEFAULT_IMAGE_ID;
        // Change to the first picture if index increases out of bounds
    }
    if (int_change < DEFAULT_IMAGE_ID) {
        coffee_picture_index = TOTAL_COFFEE_PICTURE_CNT + LEFT_IMAGE;
        // Change to the last picture is index decreases out of bounds
    }
    // Find the image element on html
    const coffee_picture_element = document.getElementById('img_drink_image');
    // Change the src of the image
    coffee_picture_element.src =
        COFFEE_PICTURE_PATH + coffee_picture_index + COFFEE_PICTURE_EXTENSION;
 }

 // Initialize things when the window loads
function init(){
    // Find the button elements
    set_image(coffee_picture_index);
    const switch_photo_left_arrow = document.getElementById('switch_photo_left_arrow');
    const switch_photo_right_arrow = document.getElementById('switch_photo_right_arrow');
    // Attach event listeners to the arrow anchors
    switch_photo_left_arrow.addEventListener("click", function() {
        next_image(LEFT_IMAGE);
    });
    switch_photo_right_arrow.addEventListener("click", function() {
        next_image(RIGHT_IMAGE);
    });
    get_image_id();
    reset_image_id();
}

