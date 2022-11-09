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
        // TODO: Make popupBox visible. Just change the opacity 
        form.style.opacity = "1";
        form.style.visibility = "visible";
    })

    

    // Saving a card and adding to the gallery 
    form.addEventListener("submit", (event)=> {
        // TODO: create empty card object

        // TODO: Load [key: value] pairs of the form and any other input into object

        // TODO: load the object into a new <coffeeCard> element

        // TODO: Insert card into the gallery at the front or back of the list
        // NOTE: The grid's rows have to be dynamically growing so this might take some
        //       working around with javascript and css


        // TODO: Get array of cards from localStorage and save this new Card (same position in array)
        //       and then save the array as a string in storage

        // TODO: call showCards() to re-render the gallery

    })

    // Clears fields of popUpBox element using "reset" attribute in index.html
    
    cancelButton.addEventListener("click", () => {
        // TODO: Hide the form popUpBox
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
