/* This file will provide functionality to DOM elements
 * and enable reading and writing to/from localStorage
 *
 */
window.addEventListener('DOMContentLoaded', init);


// when window loads,
function init(){

    // TODO: Implement these two functions. Several people can work on this

    // getLocalStorage() returns array of objects each representing a coffee card

    // showCards(array)

    handleEvents();
}

/**
 * Reads 'coffeeCards' from localStorage and returns an array of
 * all of the coffee cards found (parsed, not in string form). If
 * nothing is found in localStorage for 'coffeeCards', an empty array
 * is returned.
 * @returns {Array<Object>} An array of coffee cards found in localStorage
 */
function getCoffeeCardsFromStorage(){
    if (localStorage.getItem('coffeeCards') != null) {
        return JSON.parse(localStorage.getItem('coffeeCards'));
    } else {
        return [];
    }
}

  
/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} coffeeCards An array of recipes
 */
function addCoffeeCardsToDocument(coffeeCards) {
  // A10. TODO - Get a reference to the <main> element
  // A11. TODO - Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  const gallery = document.getElementById("gallery");
  for (let i = 0; i < coffeeCards.length; i++){
    const coffeeCard = gallery.appendChild(document.createElement("coffee-card"));
    coffeeCard.data = coffeeCards[i];
  }
  
}
  
/** 
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} coffeeCards An array of recipes
 */
function saveCoffeeCardsToStorage(coffeeCards) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. TODO - Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem("coffee-card", JSON.stringify(coffeeCards));
}
  

/* Note: Perhaps to avoid having to refresh the page to reload content
 * we could also call showCards() everytime we add or delete a card
*/
function handleEvents(){

    // Define variables to hold DOM elements
    let gallery = document.getElementById("gallery");
    let helpButton = document.getElementById("help");
    let filterOption = document.getElementById("filter");
    let addButton = document.getElementById('addCard');
    let form = document.getElementById('popUpBox');
    let cancelButton = document.getElementById('cancel');

    

    // TODO: Triggers another popup box providing details on how to use the app
    helpButton.addEventListener("click", () => {

    })


    // DO LATER: Grabs the value of whatever filter option was selected and applies 
    // it to narrow the results of the gallery
    filterOption.addEventListener("change", (event) => {

    })

    // Listener when user wants to add a new card
    addButton.addEventListener("click", () => {
        // Make popupBox visible. Just change the opacity 
        form.style.opacity = "1";
        form.style.visibility = "visible";
    })

    

    // Saving a card and adding to the gallery 
    form.addEventListener("submit", (event)=> {
        event.preventDefault();
        const data = new FormData(form);
        console.log(data);
        // 
        // create card object and load [key: value] pairs of the form and any other input into object

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
            "select_drink_type": data.get('select_drink_type'),
            "select_brew_style": data.get('select_brew_style'),
            "int_slide_color": data.get('int_slide_color'),
            "str_notes": data.get('str_notes'),

        }
        
        // TODO how to implement bool of check chocolate? and other bool values
        // TODO how to implement str_creator

        let d = new Date();
        coffeeCardObject["time_creation_time"] = d.toLocaleTimeString();
        
        // Set modified time to false to denote that this card has not been modified before
        coffeeCardObject["time_modified_time"] = false;
        // load the object into a new <coffeeCard> element
        //coffeeCard.data = coffeeCardObject;

        console.log(coffeeCardObject);

        

        // Insert card into the gallery at the front or back of the list
        // NOTE: The grid's rows have to be dynamically growing so this might take some
        //       working around with javascript and css
        //FIX: need to create a new coffee card thumbnail object
        const coffeeCard = document.createElement("coffee-card");
        const gallery = document.getElementById("gallery");
        gallery.appendChild(coffeeCard);


        // Get array of cards from localStorage and save this new Card (same position in array)
        // and then save the array as a string in storage
        let coffeeCards = getCoffeeCardsFromStorage();
        coffeeCards.push(coffeeCardObject);
        saveCoffeeCardsToStorage(coffeeCards);
        

    })

    // Clears fields of popUpBox element using "reset" attribute in index.html
    
    cancelButton.addEventListener("click", () => {
        form.style.opacity = "0";
        form.style.visibility = "hidden";
    })

    

    /* TODO: When user clicks on a coffee card in the gallery, the popUpBox
     * should appear so the user can edit the information.
     * Eventually, when we create a custom <coffeeCard> element
     * we can add an event listener to all the <coffeeCard>
     * Basic Idea: When we create a new card, we will assign it
     * a numerical ID corresponding to its index in the array of cards
     * So when we click on a card, we can identify it based on its id
     * We will have to think about this implementation in the next few days
     * 
     * /



    
    * TODO: When user clicks a card's delete button, it should remove
    * the card from the gallery and delete it from localStorage. 
    * We could rerender the page content by loading the new set of cards 
    * by calling showCards()
     */

    /* TODO: When user clicks a card's share button, it should trigger
     * a new event to post the card to social media. 
     * We will not do this until later when backend figures out a way to do this
     */
}
