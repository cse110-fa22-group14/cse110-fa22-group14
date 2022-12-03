/*
 * This file will provide functionality to DOM elements
 * and enable reading and writing to/from localStorage
 *
 */
window.addEventListener('DOMContentLoaded', init);

const ZERO = 0;
const ONE = 1;
const TWO = 2;

// The variable to hold the current image's index
let help_text_index = 0;
// Total number of coffee images in the asset/images folder
const TOTAL_HELP_TEXT_CNT = 4;
// Next left image
const PREV_TEXT = -1;
// Next right image
const NEXT_TEXT = 1;
// Default image is the first one
const DEFAULT_TEXT_INDEX = 0;

const help_text = ['text_0', 'text_1', 'text_2', 'text_3'];

// Executes when the window loads

function init() {
    help_text_index = 0;
    handleEvents();
}

/**
 * This function will adjust the help text on the bottom of the page based 
 * on the user's control.
 * @param int_change - the change in the index of the help text to display.
 * @return void
 */
function next_text(int_change) {
    show_help_text(help_text_index += int_change);
}

/**
 * This function will find the help text's element on the html and change
 * its text to the corresponding help text
 * @param int_change - the index of the help to display on the bottom.
 * @return void
 */
function show_help_text(int_change) {
    if (int_change >= TOTAL_HELP_TEXT_CNT) {
        help_text_index = DEFAULT_TEXT_INDEX;
        // Change to the first picture if index increases out of bounds
    }
    if (int_change < DEFAULT_TEXT_INDEX) {
        help_text_index = DEFAULT_TEXT_INDEX + PREV_TEXT;
        // Change to the last picture is index decreases out of bounds
    }
    // Find the image element on html
    const help_text_element = document.getElementById('str_guidance_text');
    // Change the src of the image
    help_text_element.innerText = help_text[help_text_index];
}

/**
 * Takes in an array of cofee card notes and for each one
 * it copies its data into a new <coffee-card> component
 * which is then appended to the gallery in a for loop.
 * The loop is designed to automatically assign <coffee-card> a new id
 * based on their positions in the array.
 * @param {Array<Object>} coffeeCards An array of recipes
 */
function addCoffeeCardsToDocument(coffeeCards) {


    if (!coffeeCards) {
        return;
    }

    const gallery = document.getElementById("gallery");

    // Clear the gallery and add new list to gallery
    document.querySelectorAll('coffee-card').forEach(card => {
        console.log("removing card")
        card.remove();
    })

    
    // The card is a a coffeeCard object and index is the position of that card in the array
    coffeeCards.forEach((card, index) => {
        const coffeeCard = document.createElement("coffee-card");
        coffeeCard.data = card;

        // Set the id of the card and edit button 
        coffeeCard.id = index;
        gallery.appendChild(coffeeCard);
    })

    // Make sure to keep the style consistent
    const cards = document.querySelectorAll("coffee-card");
    const theme = localStorage.getItem("theme");
    switch_theme(cards, JSON.parse(theme));


}

function handleEvents() {

    // Define variables to hold DOM elements
    const dropBox = document.querySelector("body");
    // TODO: const helpButton = document.getElementById("help");
    const help = document.getElementById("help")
    const filterOption = document.getElementById("filter");
    const sortSelect = document.getElementById("filter");

    const color_picker = document.getElementById("change_color");
    const fileSelectButton = document.getElementById("select_file");
    const importButton = document.getElementById("import");

    const addButton = document.getElementById('add_card');
    const form = document.getElementById('pop_up_box');
    const cancelButton = document.getElementById('cancel');
    const flavorSliders = document.getElementsByClassName('flavor_range');

    let isEditing = false;
    let isFormOpen = false;

 
    importButton.style.opacity = 0;

    // Find the button elements
    show_help_text(DEFAULT_TEXT_INDEX);
    const help_left_arrow = document.getElementById('prev_help');
    const help_right_arrow = document.getElementById('next_help');
    // Attach event listeners to the arrow anchors
    help_left_arrow.addEventListener("click", function() {
        next_text(PREV_TEXT);
    });
    help_right_arrow.addEventListener("click", function() {
        next_text(NEXT_TEXT);
    });

    function openForm() {
        form.style.opacity = ONE;
        form.style.visibility = "visible";
        isFormOpen = true;
    }

    function closeForm() {

        form.style.opacity = 0;
        form.style.visibility = "hidden";


        // Reset the form's html contents when done.
        document.getElementById("str_drink_name").value = "";
        document.getElementById("float_drink_price").value = "";
        document.getElementById("time_purchase_date").value = "";
        document.getElementById("str_purchase_location").value = "";

        // Populate the slider's display value
        document.getElementById("acidity_val").innerText = "0";
        document.getElementById("sweetness_val").innerText = "0";
        document.getElementById("bitterness_val").innerText = "0";
        document.getElementById("saltiness_val").innerText = "0";

        // Change slider value
        document.getElementById("int_slide_acidity").value = 0;
        document.getElementById("int_slide_sweetness").value = 0;
        document.getElementById("int_slide_bitterness").value = 0;
        document.getElementById("int_slide_saltiness").value = 0;

        // Populate the dropdowns
        document.getElementById("str_drink_type").value = "Casual";
        document.getElementById("str_brew_style").value = "Drip";
        document.getElementById("int_dropdown_color").value = "Light";
        document.getElementById("str_notes").value = "";

        // Set the coffee card's image using the function in switchCoffeeImages.js
        set_image(ZERO);
        document.getElementById("bool_check_chocolate").checked = false;
        document.getElementById("bool_check_caramel").checked = false;
        document.getElementById("bool_check_nutty").checked = false;
        document.getElementById("bool_check_fruity").checked = false;
        isFormOpen = false;

    }
}

