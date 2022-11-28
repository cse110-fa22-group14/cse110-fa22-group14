/*
 * This file will provide functionality to DOM elements
 * and enable reading and writing to/from localStorage
 *
 */
window.addEventListener('DOMContentLoaded', init);

/* Removed constant: const NEGATIVE_ONE = -1; */
const ZERO = 0;
const ONE = 1;
const TWO = 2;


// Executes when the window loads

function init() {

    const array = getCoffeeCardsFromStorage();

    addCoffeeCardsToDocument(array)

    handleEvents();
}

/**
 * Reads 'coffeeCards' from localStorage and returns an array of
 * all of the coffee cards found (parsed, not in string form). If
 * nothing is found in localStorage for 'coffeeCards', an empty array
 * is returned.
 * @returns {Array<Object>} An array of coffee cards found in localStorage
 */
function getCoffeeCardsFromStorage() {
    if (localStorage.getItem("coffeeCards")) {
        return JSON.parse(localStorage.getItem("coffeeCards"));
    } else {
        return [];
    }
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

    const all_coffee_cards = document.querySelectorAll('coffee-card');

    // Change the fields on the existing coffee-card elements
    for (let counter = 0; counter < all_coffee_cards.length; counter++) {
        const coffeeCardObject = coffeeCards[counter];
        const card_to_edit = all_coffee_cards[counter].shadowRoot;

        // Populate card thumbnail
        card_to_edit.querySelector('#str_drink_name').innerText =
            coffeeCardObject["str_drink_name"];
        card_to_edit.querySelector('#time_purchase_date').innerText =
            coffeeCardObject["time_purchase_date"].toUpperCase();
        card_to_edit.querySelector('#str_purchase_location').innerText =
            "Location: " + coffeeCardObject["str_purchase_location"];
        card_to_edit.querySelector('#str_brew_style').innerText =
            "Brew Method: " + coffeeCardObject["str_brew_style"];
        card_to_edit.querySelector('#str_drink_type').innerText =
            "Serving Type: " + coffeeCardObject["str_drink_type"];
        card_to_edit.querySelector('#int_dropdown_color').innerText =
            "Color Level: " + coffeeCardObject["int_dropdown_color"];
    }

    // Make new coffee-card elements if necessary
    const gallery = document.getElementById("gallery");
    for (let counter = all_coffee_cards.length; counter < coffeeCards.length; counter++) {
        const coffeeCard = gallery.appendChild(document.createElement("coffee-card"));
         coffeeCard.data = coffeeCards[counter];

         // Set the id of the card and edit button
         coffeeCard.id = counter;
         coffeeCard.getChildren[TWO].id = counter;
    }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} coffeeCards An array of recipes
 */
function saveCoffeeCardsToStorage(coffeeCards) {
    localStorage.setItem("coffeeCards", JSON.stringify(coffeeCards));
}



function handleEvents() {

    // Define variables to hold DOM elements
    const dropBox = document.querySelector("body");
    // TODO: const helpButton = document.getElementById("help");
    const filterOption = document.getElementById("filter");
    const addButton = document.getElementById('add_card');
    const form = document.getElementById('pop_up_box');
    const cancelButton = document.getElementById('cancel');
    const flavorSliders = document.getElementsByClassName('flavor_range');
    let isEditing = false;
    let isFormOpen = false;
    let current_edit_id = 0;
    const fileSelectButton = document.getElementById("select_file");
    const importButton = document.getElementById("import");
    importButton.style.opacity = 0;

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
        document.getElementById("int_drink_price").value = "";
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


    // Add event listeners to each flavor range slider
    for (let i = 0; i < flavorSliders.length; i++) {

        const slider = flavorSliders[i];

        // When user changes value, display it to user
        slider.addEventListener("change", () => {

            // Get <span> tag next to current range slider
            const output = slider.nextElementSibling;

            // Display value
            output.innerHTML = slider.value;
        });
    }

    /* 
     * TODO: Triggers another popup box providing details on how to use the app
     * helpButton.addEventListener("click", () => {
     *   if (!isFormOpen) {
     *
     *   }
     * })
     */

    /**
     * 
     * @param {object} a the first card to be compared
     * @param {object} b the second card to be compared
     * @returns the result between a 3 way comparison of a and b
     * caomparitor function that gives priority to the card with the earliest date.
     * works by comparing the dates as strings which works because the date input field formats
     * responses as YYYY/MM/DD allowing for direct string comparison
     */
    function sortDate(a, b) {
        
        const dateA = a['time_purchased_date'];
        const dateB = b['time_purchased_date'];
        if (dateA < dateB) {
            return -1;
        }
        else if (dateA > dateB) {
            return 1;
        }
        else{
            return ZERO;
        }
    }

    /**
     * 
     * @param {object} a the first card to be compared
     * @param {object} b the second card to be compared 
     * @returns the result of a 3 way camprison of a and b
     * camparitor function that gives priority to the card with the higher price.
     */
    function sortPrice(a, b) {
        const priceA = parseInt(a['int_dring_price']);
        const priceB = parseInt(b['int_drink_price']);

        if (priceA < priceB) {
            return -1;
        }
        if (priceA > priceB) {
            return 1;
        }
        else{
            return ZERO;
        }
    }


    /*
     * Grabs the value of whatever filter option was selected and applies
     * it to narrow the results of the gallery
     */
    filterOption.addEventListener("change", () => {

        // If (!isFormOpen) {
        /**
         * "Default">Default</option>
         *  <option value = "0Price: Low-High">Price: Low-High</option>
         *  <option value = "1Price: High-Low">Price: High-Low</option>
         *  <option value = "0Rating: Low-High">Rating: Low-High</option>
         *  <option value = "1Rating: High-Low">Rating: High-Low</option>
         *  <option value = "0Date: Oldest-Newest">
         */
        const coffeeCards = getCoffeeCardsFromStorage();

        // Get the sorting selection
        const sortSelect = document.getElementById("filter")
        const choice = sortSelect.value;

        // Console.log(coffeeCards[0]["time_purchase_date"])

        // Define sorting function for price
        if (choice.match("Price")) {
            coffeeCards.sort(sortPrice);
        }

        // Define sorting function for rating
        else if (choice.match("Date")) {
            coffeeCards.sort(sortDate);
        }

        /*
         * If the value has a prepended 1, then sort the list
         * from high to low
         */
        if (choice[ZERO] == "1") {
            coffeeCards.reverse()
        }

        // Save the changes
        addCoffeeCardsToDocument(coffeeCards);
        saveCoffeeCardsToStorage(coffeeCards)
        // }
    })



    // Listener when user wants to add a new card
    addButton.addEventListener("click", () => {

        // Make popupBox visible. Just change the opacity
        openForm();
    })



    // Event delegation to handle editing cards dynamically
    document.addEventListener('trigger-edit', function (event) {
        // If (!isFormOpen) {
            isEditing = true;

            // The edit button stores the corresponding coffee card id/posiiton in array
            const position = event.target.id;
            console.log("editing card at index: " + position);

            // Get the corresponding card from the coffee cards array
            const coffeeCardObject = getCoffeeCardsFromStorage()[position];
            console.log(coffeeCardObject);

            // The following code works just fine to populate an input field
            document.getElementById("str_drink_name").value = coffeeCardObject["str_drink_name"];
            document.getElementById("int_drink_price").value = coffeeCardObject["int_drink_price"];
            document.getElementById("time_purchase_date").value = coffeeCardObject["time_purchase_date"];
            document.getElementById("str_purchase_location").value = coffeeCardObject["str_purchase_location"];

            // Ppulate the slider's display value
            document.getElementById("acidity_val").innerText = coffeeCardObject["int_slide_acidity"];
            document.getElementById("sweetness_val").innerText = coffeeCardObject["int_slide_sweetness"];
            document.getElementById("bitterness_val").innerText = coffeeCardObject["int_slide_bitterness"];
            document.getElementById("saltiness_val").innerText = coffeeCardObject["int_slide_saltiness"];

            // Change slider value
            document.getElementById("int_slide_acidity").value = coffeeCardObject["int_slide_acidity"];
            document.getElementById("int_slide_sweetness").value = coffeeCardObject["int_slide_sweetness"];
            document.getElementById("int_slide_bitterness").value = coffeeCardObject["int_slide_bitterness"];
            document.getElementById("int_slide_saltiness").value = coffeeCardObject["int_slide_saltiness"];

            // Populate the dropdowns
            document.getElementById("str_drink_type").value = coffeeCardObject["str_drink_type"];
            document.getElementById("str_brew_style").value = coffeeCardObject["str_brew_style"];
            document.getElementById("int_dropdown_color").value = coffeeCardObject["int_dropdown_color"];
            document.getElementById("str_notes").value = coffeeCardObject["str_notes"];

            // Set the coffee card's image using the function in switchCoffeeImages.js
            set_image(coffeeCardObject["img_drink_image"]);

            // Check chocolate box if the card's bool_check_chocolate key has value 1
            if(coffeeCardObject["bool_check_chocolate"] == ONE) {
                document.getElementById("bool_check_chocolate").checked = true;
            }
            // Check chocolate box if the card's bool_check_caramel key has value 1
            if(coffeeCardObject["bool_check_caramel"] == ONE) {
                document.getElementById("bool_check_caramel").checked = true;
            }
            // Check chocolate box if the card's bool_check_nutty key has value 1
            if(coffeeCardObject["bool_check_nutty"] == ONE) {
                document.getElementById("bool_check_nutty").checked = true;
            }
            // Check chocolate box if the card's bool_check_fruity key has value 1
            if(coffeeCardObject["bool_check_fruity"] == ONE) {
                document.getElementById("bool_check_fruity").checked = true;
            }

            // Keep track of which card we are editing
            current_edit_id = position;
            openForm();
        // }
    })



    document.addEventListener('trigger-export', function (event) {
        if(!isFormOpen) {
            if (event.composedPath) {
                // The edit button stores the corresponding coffee card id/posiiton in array
                const position = event.target.id;
                console.log("exporting card at index: " + position);

                const filename = "CoffeeCard" + position + ".json"

                // Get the corresponding card from the coffee cards array
                const coffeeCardObject = getCoffeeCardsFromStorage()[position];
                console.log(coffeeCardObject);

                const coffeeCardJson = JSON.stringify(coffeeCardObject);

                const element = document.createElement('a')
                element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(coffeeCardJson));
                element.setAttribute('download', filename);

                element.style.display = 'none';
                document.body.appendChild(element);

                element.click();

                document.body.removeChild(element);
            }
        }
    })



    fileSelectButton.addEventListener("click", () => {
        if(!isFormOpen) {
            if(importButton) {
                importButton.click();
            }
        }
    }, false)




    // Select-file import
    importButton.addEventListener("change", (event) => {

        // Get the file uploaded by user
        const importFile = event.target.files[ZERO];    

        // Basic type-check for the uploaded file
        if(importFile.type != "application/json") {
            console.error("Wrong file type: must import a JSON file!");
            importButton.value = null;
            return;
        }

        // Reader to read the imported file content
        const reader = new FileReader();  

        reader.addEventListener("load", () => {
            const fileText = JSON.parse(reader.result);

            // Update local cards
            const coffeeCards = getCoffeeCardsFromStorage();
            coffeeCards.push(fileText);
            saveCoffeeCardsToStorage(coffeeCards);

            // Update gallery with new card
            addCoffeeCardsToDocument(coffeeCards);

            // Update current_card_id field
            localStorage.setItem('current_card_id', coffeeCards.length - ONE);

            // FIXME: Upload field is not clearing itself after each upload
        }, false);

        // Reader reads the file as text if valid
        if (importFile) {
            reader.readAsText(importFile);
        }
        importButton.value = null;
    })


    // Drag-and-drop import
    dropBox.addEventListener("dragenter", dragenter, false);
    dropBox.addEventListener("dragover", dragover, false);
    dropBox.addEventListener("drop", drop, false);

    function dragenter(e) {
        e.stopPropagation();
        e.preventDefault();
    }

      function dragover(e) {
        e.stopPropagation();
        e.preventDefault();
    }

    function drop(e) {
        e.stopPropagation();
        e.preventDefault();

        const dt = e.dataTransfer;
        const files = dt.files;
        const importFile = files[ZERO];

        /*
         * Console.log(files[0].name);
         * Basic type-check for the uploaded file
         */
        if(importFile.type != "application/json") {
            console.error("Wrong file type: must import a JSON file!");
            return;
        }

        // Reader to read the imported file content
        const reader = new FileReader();  

        reader.addEventListener("load", () => {
            const fileText = JSON.parse(reader.result);

            // Update local cards
            const coffeeCards = getCoffeeCardsFromStorage();
            coffeeCards.push(fileText);
            saveCoffeeCardsToStorage(coffeeCards);

            // Update gallery with new card
            addCoffeeCardsToDocument(coffeeCards);

            // Update current_card_id field
            localStorage.setItem('current_card_id', coffeeCards.length - ONE);
        }, false);

        // Reader reads the file as text if valid
        if (importFile) {
            reader.readAsText(importFile);
        }
    }





    // Saving a new card to gallery or saving edit changes to an existing card
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let card;
        const data = new FormData(form);
        const coffeeCards = getCoffeeCardsFromStorage();

        const coffeeCardObject = {

            // Visible variables
            "str_drink_name": data.get('str_drink_name'),
            "int_drink_price": data.get('int_drink_price'),
            "time_purchase_date": data.get('time_purchase_date'),
            "str_purchase_location": data.get('str_purchase_location'),
            "img_drink_image": get_image_id(),
            "int_slide_acidity": data.get('int_slide_acidity'),
            "int_slide_sweetness": data.get('int_slide_sweetness'),
            "int_slide_bitterness": data.get('int_slide_bitterness'),
            "int_slide_saltiness": data.get('int_slide_saltiness'),
            "str_drink_type": data.get('str_drink_type'),
            "str_brew_style": data.get('str_brew_style'),
            "int_dropdown_color": data.get('int_dropdown_color'),
            "str_notes": data.get('str_notes'),
        }

        // This is to make checkbox values consistent across browsers
        document.querySelectorAll("input[type = checkbox]").forEach(box => {
            coffeeCardObject[box.id] = ONE;
            if (box.checked == true) {
                coffeeCardObject[box.id] = "1";
            }
            else {
                coffeeCardObject[box.id] = "0";
            }
        })


        // If we are adding a card, make a new <coffee-card> element and add to gallery
        if (!isEditing) {
            const d = new Date();
            coffeeCardObject["time_creation_time"] = d.toLocaleTimeString();

            // Store the form data inside the coffee card
            card = document.createElement("coffee-card");
            card.data = coffeeCardObject;

            // Update the card in the coffee cards array
            coffeeCards.push(coffeeCardObject);

            // Save to storage and update the page
            saveCoffeeCardsToStorage(coffeeCards);
            addCoffeeCardsToDocument(coffeeCards);
        }

        /*
         * Otherwise we can assume the user is trying to edit the card
         * so we just save the changes without changing size of the array
         */
        else if (isEditing) {
            // Update the card in the array
            console.log(coffeeCardObject);
            coffeeCards[current_edit_id] = coffeeCardObject;
            console.log("form is editing card at index: " + current_edit_id);

            // Save to storage and update the page
            saveCoffeeCardsToStorage(coffeeCards);

            const all_coffee_cards = document.querySelectorAll('coffee-card');
            const card_to_edit = all_coffee_cards[current_edit_id].shadowRoot;

            // Populate card thumbnail
            card_to_edit.querySelector('#str_drink_name').innerText =
                coffeeCardObject["str_drink_name"];
            card_to_edit.querySelector('#time_purchase_date').innerText =
                coffeeCardObject["time_purchase_date"].toUpperCase();
            card_to_edit.querySelector('#str_purchase_location').innerText =
                "Location: " + coffeeCardObject["str_purchase_location"];
            card_to_edit.querySelector('#str_brew_style').innerText =
                "Brew Method: " + coffeeCardObject["str_brew_style"];
            card_to_edit.querySelector('#str_drink_type').innerText =
                "Serving Type: " + coffeeCardObject["str_drink_type"];
            card_to_edit.querySelector('#int_dropdown_color').innerText =
                "Color Level: " + coffeeCardObject["int_dropdown_color"];

        }

        /*
         * Reset the coffee card's image to the default one, at index 0
         * next time the user chooses to add a new card, the image will
         * be the default one, which is the first one.
         */
        reset_image_id();
        isEditing = false;
        closeForm();

        /*
         * Do not refresh all cards when only editing one card!
         * addCoffeeCardsToDocument(coffeeCards);
         */
    })





    // Clears fields of popUpBox element using "reset" attribute in index.html
    cancelButton.addEventListener("click", () => {
        closeForm();
    })






    /**
     * Handles the event to delete a card from the gallery and
     * local Storage.
     */
    document.addEventListener("trigger-delete", (event) => {

        // If(!isFormOpen) {
            console.log("delete clicked by user");
            if (event.composedPath) {
                const cardIndex = event.target.id;
                const galleryCard = document.getElementById(cardIndex);

                // Remove the object from gallery
                galleryCard.remove();

                // Local JSON object of cards
                const coffeeCards = getCoffeeCardsFromStorage(); 
                
                // Remove the card from local sotrage
                coffeeCards.splice(cardIndex, ONE);   

                // Update storage
                saveCoffeeCardsToStorage(coffeeCards);
                addCoffeeCardsToDocument(coffeeCards);

                /*
                 *  Update current_card_id field in the local storage to avoid null object
                 * localStorage.setItem('current_card_id', coffeeCards.length - 1);
                 */
            }
        // }
    })

}

