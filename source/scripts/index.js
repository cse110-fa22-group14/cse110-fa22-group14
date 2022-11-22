/*
 * This file will provide functionality to DOM elements
 * and enable reading and writing to/from localStorage
 *
 */
window.addEventListener('DOMContentLoaded', init);


// when window loads,
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
 * which is then appended to the gallery
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

    // the card is a a coffeeCard object and index is the position of that card in the array
    coffeeCards.forEach((card, index) => {
        const coffeeCard = gallery.appendChild(document.createElement("coffee-card"));
        coffeeCard.data = card;

        // set the id of the card and edit button 
        coffeeCard.id = index;
        coffeeCard.getChildren[2].id = index;

        // set id of delete button
        coffeeCard.getChildren[3].id = index;
    })

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
    let helpButton = document.getElementById("help");
    let filterOption = document.getElementById("filter");
    let addButton = document.getElementById('add_card');
    let form = document.getElementById('pop_up_box');
    let cancelButton = document.getElementById('cancel');
    let flavorSliders = document.getElementsByClassName('flavor_range');

    let isEditing = false;
    let current_edit_id = 0;
    let current_card_id = 0;

    
    function openForm() {
        form.style.opacity = 1;
        form.style.visibility = "visible";
    }

    function closeForm() {
        form.style.opacity = 0;
        form.style.visibility = "hidden";
        //reset the form's html contents when done.

        document.getElementById("str_drink_name").value = "";
        document.getElementById("int_drink_price").value = "";
        document.getElementById("time_purchase_date").value = "";
        document.getElementById("str_purchase_location").value = "";
        //populate the slider's display value
        document.getElementById("acidity_val").innerText = "0";
        document.getElementById("sweetness_val").innerText = "0";
        document.getElementById("bitterness_val").innerText = "0";
        document.getElementById("saltiness_val").innerText = "0";
        //change slider value
        document.getElementById("int_slide_acidity").value = 0;
        document.getElementById("int_slide_sweetness").value = 0;
        document.getElementById("int_slide_bitterness").value = 0;
        document.getElementById("int_slide_saltiness").value = 0;
        //populate the dropdowns
        document.getElementById("str_drink_type").value = "Casual";
        document.getElementById("str_brew_style").value = "Drip";
        document.getElementById("int_dropdown_color").value = "Light";
        document.getElementById("str_notes").value = "";

        //set the coffee card's image using the function in switchCoffeeImages.js
        set_image(0);
        document.getElementById("bool_check_chocolate").checked = false;
        document.getElementById("bool_check_caramel").checked = false;
        document.getElementById("bool_check_nutty").checked = false;
        document.getElementById("bool_check_fruity").checked = false;
    }


    // Add event listeners to each flavor range slider
    for (let i = 0; i < flavorSliders.length; i++) {

        const slider = flavorSliders[i];

        // When user changes value, display it to user
        slider.addEventListener("change", (e) => {
            // Get <span> tag next to current range slider
            const output = slider.nextElementSibling;

            // Display value
            output.innerHTML = slider.value;
        });
    }


    // TODO: Triggers another popup box providing details on how to use the app
    helpButton.addEventListener("click", () => {

    })


    /*
     * DO LATER: Grabs the value of whatever filter option was selected and applies
     * it to narrow the results of the gallery
     */
    filterOption.addEventListener("change", (event) => {

    })

    // Listener when user wants to add a new card
    addButton.addEventListener("click", () => {
        // Make popupBox visible. Just change the opacity
        form.style.opacity = "1";
        form.style.visibility = "visible";
        isEditing = false;
    })



    // Event delegation to handle editing cards dynamically 
    document.addEventListener('trigger-edit', function (event) {

        if (event.composedPath) {

            isEditing = true;

            // The edit button stores the corresponding coffee card id/posiiton in array
            let position = event.target.id;
            console.log("editing card at index: " + position);

            // get the corresponding card from the coffee cards array
            let coffeeCardObject = getCoffeeCardsFromStorage()[position];
            console.log(coffeeCardObject);

            // The following code works just fine to populate an input field
            document.getElementById("str_drink_name").value = coffeeCardObject["str_drink_name"];
            document.getElementById("int_drink_price").value = coffeeCardObject["int_drink_price"];
            document.getElementById("time_purchase_date").value = coffeeCardObject["time_purchase_date"];
            document.getElementById("str_purchase_location").value = coffeeCardObject["str_purchase_location"];
            //populate the slider's display value
            document.getElementById("acidity_val").innerText = coffeeCardObject["int_slide_acidity"];
            document.getElementById("sweetness_val").innerText = coffeeCardObject["int_slide_sweetness"];
            document.getElementById("bitterness_val").innerText = coffeeCardObject["int_slide_bitterness"];
            document.getElementById("saltiness_val").innerText = coffeeCardObject["int_slide_saltiness"];
            //change slider value
            document.getElementById("int_slide_acidity").value = coffeeCardObject["int_slide_acidity"];
            document.getElementById("int_slide_sweetness").value = coffeeCardObject["int_slide_sweetness"];
            document.getElementById("int_slide_bitterness").value = coffeeCardObject["int_slide_bitterness"];
            document.getElementById("int_slide_saltiness").value = coffeeCardObject["int_slide_saltiness"];
            //populate the dropdowns
            document.getElementById("str_drink_type").value = coffeeCardObject["str_drink_type"];
            document.getElementById("str_brew_style").value = coffeeCardObject["str_brew_style"];
            document.getElementById("int_dropdown_color").value = coffeeCardObject["int_dropdown_color"];
            document.getElementById("str_notes").value = coffeeCardObject["str_notes"];

            //set the coffee card's image using the function in switchCoffeeImages.js
            set_image(coffeeCardObject["img_drink_image"]);
            //check chocolate box if the card's bool_check_chocolate key has value 1
            if(coffeeCardObject["bool_check_chocolate"] == 1) {
                document.getElementById("bool_check_chocolate").checked = true;
            }
            //check chocolate box if the card's bool_check_caramel key has value 1
            if(coffeeCardObject["bool_check_caramel"] == 1) {
                document.getElementById("bool_check_caramel").checked = true;
            }
            //check chocolate box if the card's bool_check_nutty key has value 1
            if(coffeeCardObject["bool_check_nutty"] == 1) {
                document.getElementById("bool_check_nutty").checked = true;
            }
            //check chocolate box if the card's bool_check_fruity key has value 1
            if(coffeeCardObject["bool_check_fruity"] == 1) {
                document.getElementById("bool_check_fruity").checked = true;
            }
            
            // Keep track of which card we are editing
            current_edit_id = position;
            openForm();
        }
    })

    document.addEventListener('trigger-export', function (event) {

        if (event.composedPath) {

            // The edit button stores the corresponding coffee card id/posiiton in array
            let position = event.target.id;
            console.log("exporting card at index: " + position);

            let filename = "CoffeeCard" + position + ".json"

            // get the corresponding card from the coffee cards array
            let coffeeCardObject = getCoffeeCardsFromStorage()[position];
            console.log(coffeeCardObject);

            let coffeeCardJson = JSON.stringify(coffeeCardObject);

            let element = document.createElement('a')
            element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(coffeeCardJson));
            element.setAttribute('download', filename);

            element.style.display = 'none';
            document.body.appendChild(element);

            element.click();

            document.body.removeChild(element);
        }
    })



    // Saving a new card to gallery or saving edit changes to an existing card
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let card;
        let data = new FormData(form);
        let coffeeCards = getCoffeeCardsFromStorage();
        

        const coffeeCardObject = {
            // Visible variables
            "current_card_id": current_card_id,
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
            coffeeCardObject[box.id] = 1

            if (box.checked == true) {
                coffeeCardObject[box.id] = "1";

            }
            else {
                coffeeCardObject[box.id] = "0";

            }
        })


        // If we are adding a card, make a new <coffee-card> element and add to gallery
        if (!isEditing) {

            //use current_card_id to identify each card
            if (localStorage.getItem('current_card_id') != null) {
                current_card_id = 1 + Number(localStorage.getItem('current_card_id'));
            }
            localStorage.setItem('current_card_id', current_card_id);
            //add current_card_id to the information to store in local storage
            coffeeCardObject['current_card_id'] = current_card_id;

            // console.log(data);

            /* create card object and load [key: value] pairs of the 
            * form and any other input into object
            */
            // console.log(coffeeCardObject);
            let d = new Date();
            coffeeCardObject["time_creation_time"] = d.toLocaleTimeString();

            // Store the form data inside the coffee card 
            card = document.createElement("coffee-card");
            card.data = coffeeCardObject;

            // assign the card an index for position in gallery and coffeeCards array
            coffeeCards[current_card_id] = coffeeCardObject;
            // save to storage and update the page
            saveCoffeeCardsToStorage(coffeeCards);
            addCoffeeCardsToDocument(coffeeCards);

        }

        /* Otherwise we can assume the user is trying to edit the card
         * so we just save the changes without changing size of the array
         */

        else if (isEditing) {
            // update the card in the array
            console.log(coffeeCardObject);
            coffeeCards[current_edit_id] = coffeeCardObject;
            console.log("form is editing card at index: " + current_edit_id);
            // save to storage and update the page
            saveCoffeeCardsToStorage(coffeeCards);
            let all_coffee_cards = document.querySelectorAll('coffee-card');
            let card_to_edit = all_coffee_cards[current_edit_id].shadowRoot;
            //populate card thumbnail
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
        
        //reset the coffee card's image to the default one, at index 0
        //next time the user chooses to add a new card, the image will
        //be the default one, which is the first one.
        reset_image_id();
        isEditing = false;
        closeForm();

    })


    // Clears fields of popUpBox element using "reset" attribute in index.html
    cancelButton.addEventListener("click", () => {
        closeForm();
    })


    /* TODO: When user clicks a card's delete button, it should remove
     * the card from the gallery and delete it from localStorage. 
     * We could rerender the page content by loading the new set of cards 
     * by calling showCards()
     */
    document.addEventListener("trigger-delete", (event) => {
        console.log("delete clicked by user");
        if (event.composedPath) {
            let cardIndex = event.target.id;
            let galleryCard = document.getElementById(cardIndex);
            // Remove the object from gallery
            galleryCard.remove();
            
            let coffeeCards = getCoffeeCardsFromStorage();  // Local JSON object of cards
            coffeeCards.splice(cardIndex, 1);   // Remove the card from local sotrage

            // Update storage
            saveCoffeeCardsToStorage(coffeeCards);
            addCoffeeCardsToDocument(coffeeCards);

            // Update current_card_id field in the local storage to avoid null object
            localStorage.setItem('current_card_id', coffeeCards.length - 1);            
        }
    })


    /*
     * TODO: When user clicks a card's share button, it should trigger
     * a new event to post the card to social media.
     * We will not do this until later when backend figures out a way to do this
     */
}
