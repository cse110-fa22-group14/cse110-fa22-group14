/*
 * This file will provide functionality to DOM elements
 * and enable reading and writing to/from localStorage
 *
 */
window.addEventListener('DOMContentLoaded', init);


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

    // const gallery = document.getElementById("gallery");

    /* DO NOT REMOVE EXISTING CARDS! */
    // Clear the gallery and add new list to gallery
    // document.querySelectorAll('coffee-card').forEach(card => {
    //     console.log("removing card")
    //     card.remove();
    // })
    // the card is a a coffeeCard object and index is the position of that card in the array
    // coffeeCards.forEach((card, index) => {
    //     const coffeeCard = gallery.appendChild(document.createElement("coffee-card"));
    //     coffeeCard.data = card;

    //     // set the id of the card and edit button 
    //     coffeeCard.id = index;
    //     //coffeeCard.getChildren[2].id = index;
    // })

    let all_coffee_cards = document.querySelectorAll('coffee-card');

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

    for (let counter = all_coffee_cards.length; counter < coffeeCards.length; counter++) {
        const coffeeCard = gallery.appendChild(document.createElement("coffee-card"));
         coffeeCard.data = coffeeCards[counter];

         // Set the id of the card and edit button 
         coffeeCard.id = counter;
         coffeeCard.getChildren[2].id = counter;
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
    let dropBox = document.querySelector("body");
    let helpButton = document.getElementById("help");
    let filterOption = document.getElementById("filter");
    let addButton = document.getElementById('add_card');
    let form = document.getElementById('pop_up_box');
    let cancelButton = document.getElementById('cancel');
    let flavorSliders = document.getElementsByClassName('flavor_range');
    let isEditing = false;
    let isFormOpen = false;
    let current_edit_id = 0;
    let fileSelectButton = document.getElementById("select_file");
    let importButton = document.getElementById("import");
    importButton.style.opacity = 0;
    //let current_card_id = 0;


    //let current_card_id = 0;
    
    function openForm() {
        form.style.opacity = 1;
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
        set_image(0);
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
        slider.addEventListener("change", (e) => {

            // Get <span> tag next to current range slider
            const output = slider.nextElementSibling;

            // Display value
            output.innerHTML = slider.value;
        });
    }




    // TODO: Triggers another popup box providing details on how to use the app
    helpButton.addEventListener("click", () => {
        if (!isFormOpen) {

        }
    })



    // FIXME: Add comments and documentation! Explain what this is doing!
    function sortPrice(a, b) {

        if (parseInt(a["int_drink_price"]) < parseInt(b["int_drink_price"])) {
            return -1;
        }
        else if (parseInt(a["int_drink_price"]) > parseInt(b["int_drink_price"])) {
            return 1;
        }
        else{
            return 0;
        }
    }



    function sortDate(a, b) {
        
        if (a["time_purchase_date"] < b["time_purchase_date"]) {
            return -1;
        }
        else if (a["time_purchase_date"] > b["time_purchase_date"]) {
            return 1;
        }
        else{
            return 0;
        }
    }




    /*
     * Grabs the value of whatever filter option was selected and applies
     * it to narrow the results of the gallery
     */
    filterOption.addEventListener("change", (event) => {
        //if (!isFormOpen) {
        
        /**
         * "Default">Default</option>
            <option value = "0Price: Low-High">Price: Low-High</option>
            <option value = "1Price: High-Low">Price: High-Low</option>
            <option value = "0Rating: Low-High">Rating: Low-High</option>
            <option value = "1Rating: High-Low">Rating: High-Low</option>
            <option value = "0Date: Oldest-Newest">
         */
        let coffeeCards = getCoffeeCardsFromStorage();
        
        //get the sorting selection
        const sortSelect = document.getElementById("filter")
        let choice = sortSelect.value;

        // console.log(coffeeCards[0]["time_purchase_date"])
        
        // Define sorting function for price
        if (choice.match("Price")) {
            coffeeCards.sort(sortPrice)
        }

        // Define sorting function for rating
        else if (choice.match("Date")) {
            coffeeCards.sort(sortDate)
        }

        /* If the value has a prepended 1, then sort the list
         * from high to low
         */
        if (choice[0] == "1") {
            coffeeCards.reverse()
        }
        
        // Save the changes 
        addCoffeeCardsToDocument(coffeeCards);
        saveCoffeeCardsToStorage(coffeeCards)
        //}
    })



    // Listener when user wants to add a new card
    addButton.addEventListener("click", () => {

        // Make popupBox visible. Just change the opacity
        openForm();
    })



    // Event delegation to handle editing cards dynamically 
    document.addEventListener('trigger-edit', function (event) {
        //if (!isFormOpen) {
            isEditing = true;

            // The edit button stores the corresponding coffee card id/posiiton in array
            let position = event.target.id;
            console.log("editing card at index: " + position);

            // Get the corresponding card from the coffee cards array
            let coffeeCardObject = getCoffeeCardsFromStorage()[position];
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
            if(coffeeCardObject["bool_check_chocolate"] == 1) {
                document.getElementById("bool_check_chocolate").checked = true;
            }
            // Check chocolate box if the card's bool_check_caramel key has value 1
            if(coffeeCardObject["bool_check_caramel"] == 1) {
                document.getElementById("bool_check_caramel").checked = true;
            }
            // Check chocolate box if the card's bool_check_nutty key has value 1
            if(coffeeCardObject["bool_check_nutty"] == 1) {
                document.getElementById("bool_check_nutty").checked = true;
            }
            // Check chocolate box if the card's bool_check_fruity key has value 1
            if(coffeeCardObject["bool_check_fruity"] == 1) {
                document.getElementById("bool_check_fruity").checked = true;
            }
            
            // Keep track of which card we are editing
            current_edit_id = position;
            openForm();
        //}
    })

    document.addEventListener('trigger-export', function (event) {
        if(!isFormOpen) {
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
        }
    })



    fileSelectButton.addEventListener("click", (event) => {
        if(!isFormOpen) {
            if(importButton) {
                importButton.click();
            }
        }
    }, false)




    // Select-file import
    importButton.addEventListener("change", (event) => {
    
        // console.log("import clicked");  // DELETE: for test
        let importFile = event.target.files[0];    // Get the file uploaded by user
        // console.log(importFile.name);    // DELETE: for test

        // Basic type-check for the uploaded file
        if(importFile.type != "application/json") {
            console.error("Wrong file type: must import a JSON file!");
            importButton.value = null;
            return;
        }

        let reader = new FileReader();  // Reader to read the imported file content

        reader.addEventListener("load", () => {
            let fileText = JSON.parse(reader.result);
            // console.log(fileText);  // DELETE: for test

            // Update local cards
            let coffeeCards = getCoffeeCardsFromStorage();
            coffeeCards.push(fileText);
            saveCoffeeCardsToStorage(coffeeCards);

            // Update gallery with new card
            addCoffeeCardsToDocument(coffeeCards);

            // Update current_card_id field
            localStorage.setItem('current_card_id', coffeeCards.length - 1);

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
        let importFile = files[0];
      
        // console.log(files[0].name);
        // Basic type-check for the uploaded file
        if(importFile.type != "application/json") {
            console.error("Wrong file type: must import a JSON file!");
            return;
        }

        let reader = new FileReader();  // Reader to read the imported file content

        reader.addEventListener("load", () => {
            let fileText = JSON.parse(reader.result);
            // console.log(fileText);  // DELETE: for test

            // Update local cards
            let coffeeCards = getCoffeeCardsFromStorage();
            coffeeCards.push(fileText);
            saveCoffeeCardsToStorage(coffeeCards);

            // Update gallery with new card
            addCoffeeCardsToDocument(coffeeCards);

            // Update current_card_id field
            localStorage.setItem('current_card_id', coffeeCards.length - 1);
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
        let data = new FormData(form);
        let coffeeCards = getCoffeeCardsFromStorage();
        

        const coffeeCardObject = {
            // Visible variables
            //"current_card_id": current_card_id,
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
            let d = new Date();
            coffeeCardObject["time_creation_time"] = d.toLocaleTimeString();

            // Store the form data inside the coffee card 
            card = document.createElement("coffee-card");
            card.data = coffeeCardObject;

            // Update the card in the coffee cards array
            coffeeCards.push(coffeeCardObject);

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

            //let card_to_edit = all_coffee_cards[current_edit_id].shadowRoot;
            /*populate card thumbnail
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
            */
        }
        
        /* Reset the coffee card's image to the default one, at index 0
         * next time the user chooses to add a new card, the image will
         * be the default one, which is the first one.
         */
        reset_image_id();
        isEditing = false;
        closeForm();
        addCoffeeCardsToDocument(coffeeCards);
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
        //if(!isFormOpen) {
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
                //localStorage.setItem('current_card_id', coffeeCards.length - 1);            
            }
        //}
    })

}

