/*
 * @author Ruilin Hu and Yuang and William
 * @file - ShadowDOM for individual coffee card in its detail page
 * @version 0.0.1
 * @Created Nov 8, 2022
 * @Edited Nov 9, 2022 by William
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
            .disable-css-transitions {
                -webkit-animation: none !important;
                -moz-animation: none !important;
                -o-animation: none !important;
                -ms-animation: none !important;
                animation: none !important;
            }
        
            /* Universal Glow Animation */
            @keyframes glowing {
                /* INFO: https://www.w3docs.com/snippets/css/how-to-create-flashing-glowing-button-using-animation-in-css3.html */
                0% {
                box-shadow: 0 0 20px rgb(255, 77, 0);
                }
                50% {
                box-shadow: 0 0 50px rgb(143, 54, 15);
                }
                100% {
                box-shadow: 0 0 20px rgb(255, 77, 0);
                }
            }
            div {
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                min-width: 300px;
                max-width: 1fr;
                height: 300px;
                background-color: rgb(167 125 136);
                border-radius: 20px;
                border: none;
                text-align: center;
                box-shadow: 12px 17px 14px -12px rgba(0 0 0 / 41%);
                /* Glow animation added to the element */
                animation: glowing 1300ms infinite; 
            }

            /* Adding grid structure to header */
            header {
                margin: 0 auto;
                width: 90%;
                display: grid;
                grid-template-rows: repeat(2, 30px);
                grid-template-columns: repeat(6, minmax(50px, 1fr));
                text-align: left;
                font-family: Arial, "Zen Maru Gothic";
                font-weight: 100;
                font-size: 1em;
            }

            /* Drink Title */
            h3 {
                grid-row-start: 1;
                grid-row-end: 2;
                grid-column-start: 1;
                grid-column-end: 6;
            }

            /* Drink Date */
            h4{
                grid-row-start: 2;
                grid-row-end: 3;
                grid-column-start: 1;
                grid-column-end: 6;
                font-size: 0.9em;
            }

            /* Share Icon */
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

            /* Container to hold flavor details */
            .info{
                width: 90%;
                margin: auto;
                font-family: Arial,"Zen Maru Gothic";
                font-weight: 100;
                text-align: left;
            }

            #share_button {
                /* Glow animation added to the element */
                animation: glowing 1300ms infinite; 
            }

            .delete {
                padding: 5px 20px;

                /* Glow animation added to the element */
                animation: glowing 1300ms infinite; 
            }

            .edit {
                padding: 5px 20px;

                /* Glow animation added to the element */
                animation: glowing 1300ms infinite; 
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
      *                            "str_drink_name":"string",
      *                            "float_drink_price":"int",
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

       // Add a hidden element to the card's HTML
       shadow_div.innerHTML =
       `
       <header>
            <h3 id = "str_drink_name"><slot name="date" />${data["str_drink_name"]}</h3>
            <h4 id = "time_purchase_date">${data["time_purchase_date"]}</h4>
            <img id = "share_button" alt = "share icon" src = "./assets/images/share-icon.png" ></img>

       </header>

        <section class="info">
          <p id = "str_purchase_location"><slot name="location" />Location: ${data["str_purchase_location"]}</p>
          <p id = "str_brew_style"><slot name="brew_style" />Brew Method: ${data["str_brew_style"]}</p>
          <p id = "str_drink_type"><slot name="drink_type">Serving Type: ${data["str_drink_type"]}</p>
          <p id = "int_dropdown_color"><slot name="color">Color Level: ${data["int_dropdown_color"]}</p>

          <button class = "edit" id="toggle_edit" >Edit</button>
          <button class = "delete" id="delete_card" >Delete</button>
        </section>

        `;

        // Custom event trigger that the DOM will catch whenever we click on "delete"
        this.shadowRoot.getElementById('delete_card').addEventListener("click", ()=> {
            // Don't dispatch the click event. Instead use a custom event
            this.dispatchEvent(new CustomEvent("trigger-delete", {
                composed: true,
                bubbles: true,
                detail: "composed"
            }))
        })

        // Custom event trigger that the DOM will catch whenever we click on "edit"
        this.shadowRoot.getElementById('toggle_edit').addEventListener("click", () => {

            // Don't dispatch the click event. Instead use a custom event
            this.dispatchEvent(new CustomEvent("trigger-edit", {
                composed: true,
                bubbles: true,
                detail: "composed"
            }))
        })

        // Custom event trigger that the DOM will catch whenever we click on the export icon
        this.shadowRoot.getElementById("share_button").addEventListener("click", () => {
            // Don't dispatch the click event. Instead use a custom event
            this.dispatchEvent(new CustomEvent("trigger-export", {
                composed: true,
                bubbles: true,
                detail: "composed"
            }))
        })

        
    }

    /**
     * Called when the getChildren is called on a coffee-card
     *
     * For Example:
     * let coffeeCard = document.createElement('recipe-card'); // Calls constructor()
     * coffeeCard.getChildren() =  [HTML collection] // Calls the functions
     */
    get getChildren() {
        const shadow_div = this.shadowRoot.querySelector('div');
        return shadow_div.children;
    }


    /**
     * Sets the card's color theme
     * 
     * @param pair - object containing two colors for background and text
     */
    set color(pair) {
        this.shadowRoot.querySelector('div').style.background = pair["background"];
        this.shadowRoot.querySelector('div').style.color = pair["text"];

      }
}

 // Define the Class as a customElement so we can create coffee-card elements
 customElements.define('coffee-card', CoffeeCard);