/*
 * @author Ruilin Hu and Yuang and William
 * @file - ShadowDOM for individual coffee card in its detail page
 * @version 0.0.1
 * @Created Nov 8, 2022
 * @Edited Nov 9, 2022 by William
 */

/*
 * TODO:
 * coffee card should include date (Monday 12, 2022 for example)
 * a share button to post the card to social media (this will be implemented later)
 * Title of Drink
 * Short Description of the drink: this content is still to be decided
 */


 class CoffeeCard extends HTMLElement {
     constructor() {
         super();
         this.showInfo = true;
         // Attach the shadow DOM to this Web Component
         const shadow = this.attachShadow({ mode: "open" });
         // Div element to hold elements
         const shadow_div = document.createElement("div");
         // Style element for the coffee cards
         const shadow_style = document.createElement("style");
         // Define the precise style for the card

         shadow_style.textContent = `
  
            div {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                min-width: 300px;
                max-width: 1fr;
                height: 300px;
                background-color: #BF8162;
                border-radius: 10px;
                border: none;
                text-align: center;
            }



            /* adding grid structure to header */
            header {
                display: grid;
                grid-template-rows: repeat(2, 30px);
                grid-template-columns: repeat(6, minmax(50px, 1fr));
                text-align: left;
                padding: 10px 20px;
                transform: translateY(-20px);
                font-family: "Zen Maru Gothic";
                font-weight: 900;
                font-size: 1em;
            }

            h3 {
                grid-row-start: 1;
                grid-row-end: 2;
                grid-column-start: 1;
                grid-column-end: 6;
            }

            h4{
                grid-row-start: 2;
                grid-row-end: 3;
                grid-column-start: 1;
                grid-column-end: 6;
                font-size: 0.9em;
            }

            img {
                transform: scale(0.8);
                grid-row-start: 1;
                grid-row-end: 2;
                grid-column-start: 6;
                grid-column-end: 6;
                transform: scale(0.6);
                margin-top: 10px;
                align-self: right;
            }

            .info{
                margin: auto;
                font-family: "Zen Maru Gothic";
            }

            .toggle_edit {
                background: brown;
                color: #fff;
                border: 0;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;

                padding: 5px 20px;
            }

            .toggle_edit:hover {
                opacity: 0.8;
                cursor: pointer;
                transition: all 0.2s ease-in;
        }`;

        // Append the <style> and <article> elements to the Shadow DOM
        shadow.append(shadow_style, shadow_div);
     }



     /**
      * Called when the .data property is set on this element.
      *
      * For Example:
      * let coffeeCard = document.createElement('recipe-card'); // Calls constructor()
      * coffeeCard.data = { foo: 'bar' } // Calls set data({ foo: 'bar' })
      *
      * @param {Object} data - The data to pass into the <recipe-card>, must be of the
      *                        following format:
      *                        {
      *                            "current_card_id": "int",
      *                            "str_drink_name":"string",
      *                            "int_drink_price":"int",
      *                            "time_purchase_date":"date",
      *                            "str_purchase_location":"string",
      *                            "img_drink_image":"string",
      *                            "bool_check_chocolate":"bool",
      *                            "bool_check_caramel":"bool",
      *                            "bool_check_nutty":"bool",
      *                            "bool_check_fruity":"bool",
      *                            "int_slide_acidity":"int",
      *                            "int_slide_sweetness":"int",
      *                            "int_slide_bitterness":"int",
      *                            "int_slide_saltiness":"int",
      *                            "str_drink_type":"string",
      *                            "str_brew_style":"string",
      *                            "int_dropdown_color":"int",
      *                            "str_notes":"string",
      *                            "time_creation_time":"time",
      *                            "time_modified_time":"time"
      *                        }
      */
     set data(data) {
       // If nothing was passed in, return
       if (!data) { return; }

       const shadow_div = this.shadowRoot.querySelector('div');

       //add a hidden element to the card's HTML
       shadow_div.innerHTML =
       `
       <header>
            <h3 id = "str_drink_name"><slot name="date" />${data["str_drink_name"]}</h3>
            <h4 id = "time_purchase_date">${data["time_purchase_date"].toUpperCase()}</h4>
            <img id = "share_button" alt = "share icon" src = "./assets/images/share-icon.png" ></img>

       </header>

        <section class="info">
          <p id = "str_purchase_location"><slot name="location" />Location: ${data["str_purchase_location"]}</p>
          <p id = "str_brew_style"><slot name="brew_style" />Brew Method: ${data["str_brew_style"]}</p>
          <p id = "str_drink_type"><slot name="drink_type">Serving Type: ${data["str_drink_type"]}</p>
          <p id = "int_dropdown_color"><slot name="color">Color Level: ${data["int_dropdown_color"]}</p>
          <p id="current_card_id" value="${data["current_card_id"]}" hidden></p>
        </section>
        <button class = "toggle_edit" >Edit</button>
        `;

        // Custom event trigger that the DOM will catch whenever we click on "edit"
        shadow_div.getElementsByTagName("button")[0].onclick = (event)=> {

            // Don't dispatch the click event. Instead use a custom event
            event.preventDefault();

            this.dispatchEvent(new CustomEvent("trigger-edit", {
                composed: true,
                bubbles: true,
                detail: "composed"
            }))
        }
     }

     
     /**
      * Called when the getChildren is called on a coffee-card
      *
      * For Example:
      * let coffeeCard = document.createElement('recipe-card'); // Calls constructor()
      * coffeeCard.getChildren() =  [HTML collection] // Calls the function
      *
      */
    get getChildren() {
        let shadow_div = this.shadowRoot.querySelector('div');
        return shadow_div.children;
    }



 }

 



 // Define the Class as a customElement so we can create coffee-card elements
 customElements.define('coffee-card', CoffeeCard);

