/*
 * @author Ruilin Hu
 * @file - ShadowDOM for individual coffee card's thumbnail in guidance page
 * @version 0.0.1
 * @Created Dec 3, 2022
 * @Edited Dec 4, 2022 by William
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
            @import url("https://fonts.googleapis.com/css?family=Dosis:300,400");

            /* Universal Glow Animation */
            @keyframes glowing {

                /* INFO: https://www.w3docs.com/snippets/css/how-to-create-flashing-glowing-button-using-animation-in-css3.html */
                0% {
                    box-shadow: 0 0 20px rgb(255 77 0);
                }

                50% {
                    box-shadow: 0 0 50px rgb(143 54 15);
                }

                100% {
                    box-shadow: 0 0 20px rgb(255 77 0);
                }
            }

             @keyframes glowing-icon {

                /* INFO: https://www.w3docs.com/snippets/css/how-to-create-flashing-glowing-button-using-animation-in-css3.html */
                0% {
                    background-color: rgba(255 77 0 / 20%);
                    box-shadow: 0 0 20px rgb(255 77 0);
                }

                50% {
                    background-color: rgba(255 77 0 /20%);
                    box-shadow: 0 0 20px rgb(255 77 / 10%);
                }

                100% {
                    background-color: rgba(255 77 0 / 40%);
                    box-shadow: 0 0 20px rgb(255 77 0);
                }
            }

            .disable-css-transitions {
                -webkit-animation: none !important;
                -moz-animation: none !important;
                -o-animation: none !important;
                -ms-animation: none !important;
                animation: none !important;
            }
            
            div {
                background-color: rgb(167 125 136);
                position: relative;
                display: flex;
                flex-direction: column;
                justify-content: space-evenly;
                min-width: 300px;
                max-width: 1fr;
                height: 300px;
                border-radius: 20px;
                border: none;
                text-align: center;
                box-shadow: 12px 17px 14px -12px rgba(0 0 0 / 41%);
                animation: glowing 1300ms infinite;

            }

            header {
                margin: -40px auto 0 auto;
                width: 90%;
                display: flex;
                flex-direction: column;
                text-align: left;
                font-family: Arial;
                height: auto;
                color: rgb(255 255 255);
            }

            hr {
                width: 100%;
                border: 1px solid rgb(255 255 255);
                border-radius: 5px;
            }

            /* Drink Title */
            header h3 {
                width:100%;
                font-size: 1.8em;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            header h4 {
                width:100%;
                font-size: 1em;
                margin-top: -25px;
                color: rgb(255 255 255);
            }

            hr {
                margin-top: -10px;
                width: 90%;
                border-width: 0.5px;
                color: rgb(255 255 255);

            }

            /* Container to hold flavor details */

            #info_container {
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 30%;
                margin-top: -10px;
            }

            #list {
                display: flex;
                flex-direction: column;
                width: 40%;
                margin: auto;
                font-family: "Zen Maru Gothic", Arial;
                font-weight: 100;
                text-align: left;
                font-size: 1em;
                color: rgb(255 255 255);
            }

            li p {
                width: 110px;
                margin: 0;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }

            #comments {
                background-color: rgb(255 255 255);
                height: 100px;
                width: 50%;
                margin-right: 15px;
                border: none;
                border-radius: 10px;
                color: black;
                font-family: "Zen Maru Gothic";
                font-size: 0.9em;
                text-align: left;
                padding: 5px;
                resize: none;
                overflow: scroll;
                
            }

            ::-webkit-scrollbar {
                display: none;
            }

            #row {
                display: flex;
                justify-content: space-between;
                height: 30px;
                width: 90%;
                margin: -25px auto 0 auto;
            
                align-items: center;
            }

            #row h4 {
                font-size: 20px;
                font-family: "Zen Maru Gothic";
                color: rgb(255 255 255);
            }

            /* Share Icon */
            img {
                position: relative;
                margin-left: 10px;
                object-fit: contain;
                margin: 0;
                border-radius: 10px;
            
                /* Glow animation added to the element */
                animation: glowing-icon 1300ms infinite;
            }

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

        // Converts MM-DD-YYYY to Date String
        const date = new Date(data["time_purchase_date"]);
        const dateStr = date.toDateString();

        // Add a hidden element to the card's HTML
        shadow_div.innerHTML =
        `
        <header>
             <h3 id = "str_drink_name"><slot name="date" />${data["str_drink_name"]}</h3>
             <h4 id = "time_purchase_date">${dateStr}</h4>
        </header>
 
        <section id = "row">
        <h4 id = "float_drink_price">$${data["float_drink_price"]}</h4>
        <section id = "button_container">
            <img id = "share_button" alt = "share icon" src = "./assets/images/share-icon.png" ></img>
            <img id ="delete_button" alt = "delete icon" src = "./assets/images/delete-icon.png" ></img>
            <img id ="edit_button"  src = "./assets/images/edit-icon.png" ></img>
        </section>
        </section>
 
        <hr>
 
        <section id = "info_container">
             <ul id ="list">
                 <li id = "str_purchase_location"><p>${data["str_purchase_location"]}</p></li>
                 <li id = "str_brew_style">${data["str_brew_style"]}</li>
                 <li id = "str_drink_type"> ${data["str_drink_type"]}</li>
                 <li id = "int_dropdown_color">${data["int_dropdown_color"]}</li>
             </ul>
 
             <textarea id = "comments">${data["str_notes"]}</textarea>
         </section>
 
 
 
         `;
 

        // Custom event trigger that the DOM will catch whenever we click on "delete"
        this.shadowRoot.getElementById('delete_button').addEventListener("click", () => {
            // Don't dispatch the click event. Instead use a custom event
            this.dispatchEvent(new CustomEvent("trigger-delete", {
                composed: true,
                bubbles: true,
                detail: "composed"
            }))
        })

        // Custom event trigger that the DOM will catch whenever we click on "edit"
        this.shadowRoot.getElementById('edit_button').addEventListener("click", () => {

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