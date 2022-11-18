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
    let gallery = document.getElementById("gallery");
    let helpButton = document.getElementById("help");
    let filterOption = document.getElementById("filter");
    let addButton = document.getElementById('add_card');
    let form = document.getElementById('pop_up_box');
    let cancelButton = document.getElementById('cancel');
    let flavorSliders = document.getElementsByClassName('flavor_range');
    
    // TODO: this is an arbitrary id name
    let deleteButton = document.getElementById('delete_button');

    let isEditing = false;
    let currentId = 0;

    
    function openForm() {
        form.style.opacity = 1;
        form.style.visibility = "visible";
    }

    function closeForm() {
        form.style.opacity = 0;
        form.style.visibility = "hidden";
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
            // document.getElementById("str_drink_name").value = coffeeCardObject["str_drink_name"];


            // But looping and getting elements using the keys throws a null error :(
            for (let key in Object.keys(coffeeCardObject)){
                document.getElementById(key).value = coffeeCardObject[key];
            }
            
            

            // Keep track of which card we are editing
            currentId = position;
            openForm();
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
            "str_drink_name": data.get('str_drink_name'),
            "int_drink_price": data.get('int_drink_price'),
            "time_purchase_date": data.get('time_purchase_date'),
            "str_purchase_location": data.get('str_purchase_location'),
            "img_drink_image": document.getElementById('img_drink_image').src,
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
            console.log(data);

            /* create card object and load [key: value] pairs of the 
            * form and any other input into object
            */
            console.log(coffeeCardObject);
            let d = new Date();
            coffeeCardObject["time_creation_time"] = d.toLocaleTimeString();


            // Store the form data inside the coffee card 
            card = document.createElement("coffee-card");
            card.data = coffeeCardObject;

            // assign the card an index for position in gallery and coffeeCards array
            coffeeCards.push(coffeeCardObject);

        }

        /* Otherwise we can assume the user is trying to edit the card
         * so we just save the changes without changing size of the array
         */

        else if (isEditing) {
            // update the card in the array
            console.log(coffeeCardObject)
            coffeeCards[(currentId)] = coffeeCardObject;
            console.log("form is editing card at index: " + currentId);
            isEditing = false;
        }
        
        // save to storage and update the page
        saveCoffeeCardsToStorage(coffeeCards);
        addCoffeeCardsToDocument(coffeeCards);

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
    deleteButton.addEventListener("click", (event) => {
        // FIXME: how to get the delete button signal from that particular card

        let gallery = document.getElementById("gallery");
        let cardIndex = event.target.id;
        let cardObject = getCoffeeCardsFromStorage()[cardIndex];
        gallery.removeChild(cardObject);
        

    })


    /*
     * TODO: When user clicks a card's share button, it should trigger
     * a new event to post the card to social media.
     * We will not do this until later when backend figures out a way to do this
     */
}
