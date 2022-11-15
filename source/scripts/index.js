/*
 * This file will provide functionality to DOM elements
 * and enable reading and writing to/from localStorage
 *
 */
window.addEventListener('DOMContentLoaded', init);



let currCard = -1;

// when window loads,
function init() {


    // TODO: Implement these two functions. Several people can work on this

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
    if (localStorage.getItem("coffeeCards") != null) {
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

    // A10. TODO - Get a reference to the <main> element
    // A11. TODO - Loop through each of the recipes in the passed in array,
    //            create a <recipe-card> element for each one, and populate
    //            each <recipe-card> with that recipe data using element.data = ...
    //            Append each element to <main>
    const gallery = document.getElementById("gallery");
    for (let i = 0; i < coffeeCards.length; i++) {
        const coffeeCard = gallery.appendChild(document.createElement("coffee-card"));
        coffeeCard.id = `${gallery.childNodes.length - 2}`;
        coffeeCard.data = coffeeCards[i];
    }

}

/** 
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} coffeeCards An array of recipes
 */
function saveCoffeeCardsToStorage(coffeeCards) {

  /*
   * EXPLORE - START (All explore numbers start with B)
   * B1. TODO - Complete the functionality as described in this function
   *            header. It is possible in only a single line, but should
   *            be no more than a few lines.
   */
  localStorage.setItem("coffeeCards", JSON.stringify(coffeeCards));
}


/*
 * Note: Perhaps to avoid having to refresh the page to reload content
 * we could also call showCards() everytime we add or delete a card
 */
function handleEvents() {

    // Define variables to hold DOM elements
    let gallery = document.getElementById("gallery");
    let helpButton = document.getElementById("help");
    let filterOption = document.getElementById("filter");
    let addButton = document.getElementById('add_card');
    let form = document.getElementById('pop_up_box');
    let cancelButton = document.getElementById('cancel');
    let flavorSliders = document.getElementsByClassName('flavor_range');
    let coffee_card_list = document.querySelectorAll("coffee-card");
    let isAddingCard = false;

    
    function openForm(){
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
            output.innerHTML= slider.value;
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
        isAddingCard = true;
    })


    
    
    /*document.querySelectorAll('coffee-card').forEach(card => {
        card.addEventListener('click', event => {
            let position = card.id;
        })
    });
    */
    

    // Event delegation to handle editing cards efficiently 
    gallery.addEventListener('click', function(event) {
        if (event.target.tagName == "coffee-card") {

            isAddingCard = false;
            let position = event.target.id;
            console.log("edting card number: " + position);
            
            coffeeCards = getCoffeeCardsFromStorage();
            coffeeCards[Number(position)] = coffeeCardObject;

            // REMOVE: const card_to_change = Number(coffee_card.id);

            const shadow_child_nodes = Array.from(coffee_card.shadowRoot.childNodes);
            shadow_child_nodes.forEach((node) => {
                if (node.nodeName === 'DIV') {
                    console.log(node.innerText) //to see what the text_to_parse is...
                    let text_to_parse = JSON.stringify(node.innerText);
                    document.getElementById("str_drink_name").value = text_to_parse.slice(1, text_to_parse.indexOf("\\"));
                    text_to_parse = text_to_parse.slice(text_to_parse.indexOf("\\"));
                    text_to_parse = text_to_parse.split("\\n\\n");
                    document.getElementById("str_purchase_location").value = text_to_parse[1].slice(text_to_parse[1].indexOf(": ") + 2);
                    document.getElementById("str_drink_type").value = text_to_parse[3].slice(text_to_parse[3].indexOf(": ") + 2);
                    document.getElementById("str_brew_style").value = text_to_parse[2].slice(text_to_parse[2].indexOf(": ") + 2);
                    document.getElementById("int_dropdown_color").value = text_to_parse[4].slice(text_to_parse[4].indexOf(": ") + 2);
                    // form.elements["str_notes"];
                }
            });
            currCard = position;
            openForm();
        }
    })


    // Saving a new card to gallery or saving edit changes to an existing card
    form.addEventListener("submit", (event) => {
        event.preventDefault();



        let card;
        let data = new FormData(form);
        const coffeeCardObject = {
            // Visible variables
            "str_drink_name": data.get('str_drink_name'),
            "int_drink_price": data.get('int_drink_price'),
            "time_purchase_date": data.get('time_purchase_date'),
            "str_purchase_location": data.get('str_purchase_location'),
            "img_drink_image": data.get('img_drink_image'),
            "bool_check_chocolate": data.get('bool_check_chocolate'),
            "bool_check_caramel": data.get('bool_check_caramel'),
            "bool_check_nutty": data.get('bool_check_nutty'),
            "bool_check_fruity": data.get('bool_check_fruity'),
            "int_slide_acidity": data.get('int_slide_acidity'),
            "int_slide_sweetness": data.get('int_slide_sweetness'),
            "int_slide_bitterness": data.get('int_slide_bitterness'),
            "int_slide_saltiness": data.get('int_slide_saltiness'),
            "str_drink_type": data.get('str_drink_type'),
            "str_brew_style": data.get('str_brew_style'),
            "int_dropdown_color": data.get('int_dropdown_color'),
            "str_notes": data.get('str_notes'),
        }

        // If we are adding a card, make a new <coffee-card> element and add to gallery
        if (isAddingCard) {
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
            card.id = `${gallery.childNodes.length - 2}`;
            gallery.appendChild(card);
            let coffeeCards = getCoffeeCardsFromStorage();
            coffeeCards.push(coffeeCardObject);
            saveCoffeeCardsToStorage(coffeeCards);
            isAddingCard = false;
        }

        // otherwise if we have clicked on editing 
        else if (!isAddingCard){
            document.getElementById(currCard).data = coffeeCardObject;
            saveCoffeeCardsToStorage(coffeeCards);
            let coffeeCards = getCoffeeCardsFromStorage();
            coffeeCards[Number(currCard)] = coffeeCardObject;
            saveCoffeeCardsToStorage(coffeeCards);
            isAddingCard = false;
            //form.reset();
        }        

        // Either way, we want to close the form

        currCard = -1;

        form.style.opacity = 0;
        form.style.visibility = "hidden";

    })


    // Clears fields of popUpBox element using "reset" attribute in index.html
    cancelButton.addEventListener("click", () => {
        closeForm();
    })



    /*
     * TODO: When user clicks on a coffee card in the gallery, the popUpBox
     * should appear so the user can edit the information.
     * Eventually, when we create a custom <coffeeCard> element
     * we can add an event listener to all the <coffeeCard>
     * Basic Idea: When we create a new card, we will assign it
     * a numerical ID corresponding to its index in the array of cards
     * So when we click on a card, we can identify it based on its id
     * We will have to think about this implementation in the next few days

     * 
     */
    /*setInterval(function () { 
        document.querySelectorAll('coffee-card').forEach(coffee_card => {
            coffee_card.addEventListener('click', event => {
                const card_to_change = Number(coffee_card.id);
                SAVE_BUTTON_STATE = SAVE_ON;
                const shadow_child_nodes = Array.from(coffee_card.shadowRoot.childNodes);
                shadow_child_nodes.forEach((node) => {
                    if (node.nodeName === 'DIV') {
                        console.log(node.innerText) //to see what the text_to_parse is...
                        let text_to_parse = JSON.stringify(node.innerText);
                        document.getElementById("str_drink_name").value = text_to_parse.slice(1, text_to_parse.indexOf("\\"));
                        text_to_parse = text_to_parse.slice(text_to_parse.indexOf("\\"));
                        // document.getElementById("int_drink_price");
                        // document.getElementById("time_purchase_date");
                        text_to_parse = text_to_parse.split("\\n\\n");
                        document.getElementById("str_purchase_location").value = text_to_parse[1].slice(text_to_parse[1].indexOf(": ") + 2);
                        // document.getElementyId("img_drink_image");
                        // document.getElementyId("bool_check_chocolate");
                        // document.getElementyId("bool_check_caramel");
                        // document.getElementyId("bool_check_nutty");
                        // document.getElementyId("bool_check_fruity");
                        // document.getElementyId("int_slide_acidity");
                        // document.getElementyId("int_slide_sweetness");
                        // document.getElementyId("int_slide_bitterness");
                        // document.getElementyId(int_slide_saltiness").value;
                        document.getElementById("str_drink_type").value = text_to_parse[3].slice(text_to_parse[3].indexOf(": ") + 2);
                        document.getElementById("str_brew_style").value = text_to_parse[2].slice(text_to_parse[2].indexOf(": ") + 2);
                        document.getElementById("int_dropdown_color").value = text_to_parse[4].slice(text_to_parse[4].indexOf(": ") + 2);
                        // form.elements["str_notes"];
                    }
                });
                form.style.opacity = 1;
                form.style.visibility = "visible";
            })
        })
    //}, 1000);
    */




    /* TODO: When user clicks a card's delete button, it should remove
     * the card from the gallery and delete it from localStorage. 
     * We could rerender the page content by loading the new set of cards 
     * by calling showCards()
     */

    /*
     * TODO: When user clicks a card's share button, it should trigger
     * a new event to post the card to social media.
     * We will not do this until later when backend figures out a way to do this
     */
}
