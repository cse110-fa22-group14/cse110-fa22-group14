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

const help_text = [];

// Step 0 text
help_text.push("Hello! Welcome to Brew Notes by ProForce. It is our pleasure to have "
                + "you on board. Let's take a short tour of your new Coffee Cards! Please "
                + "click the glowing black arrow on the right side of the screen to continue with the tutorial.");
// Step 1 text
help_text.push("To end the tutorial at any time, feel free to click the back button to go back to "
                + "the app or click the [main page] button.");
// Step 2 text
help_text.push("To Create a new Coffee Card, use the plus button and open up the edit page.");
// Step 3 text
help_text.push("Please fill in the details of the coffee to record, drag the sliders to adjust their values, "
                + "and click on the drop down selectors to change value.");
// Step 4 text
help_text.push("When the coffee card is ready to save, simply click the \"SAVE\" button to add it to the gallery.");
// Step 5 text
help_text.push("A new card has just been added to the gallery! The card's thumnail will display some useful "
                + "information about the card for easier access.");
// Step 6 text
help_text.push("In order to make edits to the card we just added, simply click the \"Edit\" button to open up the details page.");
// Step 7 text
help_text.push("Make any changes to the card if necessary and save it in the same way when we first added the card to the gallery. "
                + "However, if we want to discard the changes, simply click the \"CANCEL\" button instead to revert the changes "
                + "we made on the edit page.");
// Step 8 text
help_text.push("If we would like to export a Coffee Card and save it as a file on our disk, click the share icon on the card and "
                + "the file will be downloaded to your device.");
// Step 9 text
help_text.push("Right now, if we would like to import an exported card, we will click the Import button and locate the file "
                + "to upload to our gallery. ");
// Step 10 text
help_text.push("Any new cards added to the gallery will be appended to the end of all existing cards, and we will lose any existing "
                + "sort settings when we added new cards.");
// Step 11 text
help_text.push("In order to sort all cards again, simply click the sort button and select the sorting method for all cards in the gallery.");
// Step 12 text
help_text.push("If any of the cards become obsolete, feel free to delete by clicking the trash can icon of the thumbnail of the cards.");
// Step 13 text
help_text.push("Feeling creative and would like to see a different color scheme? Find your favorite by clicking the \"THEME\" button. "
                + "A drop down menu will show after the click, and select the item in the drop down menu the change colors of the page.");
// Step 14 text
help_text.push("Congratulations! Now you've learned how to use Brew Notes to store all your Coffee Cards! Please click on the [main page] "
                + "button to get back to the app to manage your Coffee Cards!")


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
    // Change the element glow
    glowGuidanceElement(help_text_index);
}

/**
 * This function will adjust the glow effect of each element according to
 * the current help text being displayed.
 * @param int_help_index - the index currently displayed help text
 * @return void
 */
function glowGuidanceElement(int_help_index) {
    const dropBox = document.querySelector("body");
    dropBox.classList.add('disable-css-transitions');
    const help = document.getElementById("help");
    help.classList.add('disable-css-transitions');
    const filterOption = document.getElementById("filter");
    filterOption.classList.add('disable-css-transitions');
    const sortSelect = document.getElementById("filter");
    sortSelect.classList.add('disable-css-transitions');
    const color_picker = document.getElementById("change_color");
    color_picker.classList.add('disable-css-transitions');
    const fileSelectButton = document.getElementById("select_file");
    fileSelectButton.classList.add('disable-css-transitions');
    const importButton = document.getElementById("import");
    importButton.classList.add('disable-css-transitions');
    const addButton = document.getElementById('add_card');
    addButton.classList.add('disable-css-transitions');
    const cancelButton = document.getElementById('cancel');
    cancelButton.classList.add('disable-css-transitions');
    const help_left_arrow = document.getElementById('prev_help');
    help_left_arrow.classList.add('disable-css-transitions');
    const help_right_arrow = document.getElementById('next_help');
    help_right_arrow.classList.add('disable-css-transitions');
    
    switch(int_help_index) {
        case 11:
            filterOption.classList.remove('disable-css-transitions');
            break
        default:
            throw new Error('Invalid message index!');
    }
    
}

function handleEvents() {
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
}

function openForm() {
    const form = document.getElementById('pop_up_box');
    form.style.opacity = ONE;
    form.style.visibility = "visible";
    isFormOpen = true;
}

function closeForm() {
    const form = document.getElementById('pop_up_box');
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
    document.getElementById("bool_check_chocolate").checked = false;
    document.getElementById("bool_check_caramel").checked = false;
    document.getElementById("bool_check_nutty").checked = false;
    document.getElementById("bool_check_fruity").checked = false;
    isFormOpen = false;
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
}