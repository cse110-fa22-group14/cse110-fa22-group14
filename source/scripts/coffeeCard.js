/**
 * @author Ruilin Hu and Yuang
 * @file - ShadowDOM for individual coffee card in its detail page
 * @version 0.0.1
 * @Created Nov 8, 2022
 */

/* TODO:
 * coffee card should include date (Monday 12, 2022 for example)
 * a share button to post the card to social media (this will be implemented later)
 * Title of Drink
 * Short Description of the drink: this content is still to be decided
 */


 class CoffeeCard extends HTMLElement {
     constructor() {
         super();
         this.showInfo = true;
         //Attach the shadow DOM to this Web Component
         const shadow = this.attachShadow({ mode: "open" });
         //article element to hold elements
         const shadow_div = document.createElement("div");
         //style element for the coffee cards
         const shadow_style = document.createElement("style");
         //define the precise style for the card
         shadow_style.textContent = `
         .coffee-card {
            min-width: 300px;
            max-width: 1fr;
            height: 300px;
            background-color: #BF8162;
            border-radius: 10px;
            border: none;
       	}
       	.coffee-card button {
       		background: brown;
       		color: #fff;
       		border: 0;
       		border-radius: 5px;
       		padding: 5px 20px;
       	}`;
        shadow_div.innerHTML = `
            <div class="coffee-card">
             <h3></h3>
             <div class="info">
               <p><slot name="date" /></p>
               <p><slot name="location" /></p>
               <p><slot name="Brew-Method" /></p>
               <p><slot name="Serving-Type" /></p>
               <p><slot name="Color" /></p>
             </div>
             <button id="toggle-info">Edit</button>
           </div>`;
        //Append the <style> and <article> elements to the Shadow DOM
        shadow.append(shadow_style);
        shadow.append(shadow_div);
        //XXX: name might not be defined
        this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
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
      *                            "select_drink_type":"string",
      *                            "select_brew_style":"string",
      *                            "int_slide_color":"int",
      *                            "str_notes":"string",
      *                            "time_creation_time":"time",
      *                            "time_modified_time":"time"
      *                        }
      */
     set data(data) {
       // If nothing was passed in, return
       if (!data) return;

       // A6. TODO - Select the <article> we added to the Shadow DOM in the constructor
       let shadow_div = this.shadowRoot.querySelector('div');
       // A7. TODO - Set the contents of the <article> with the <article> template given in
       //           cardTemplate.html and the data passed in (You should only have one <article>,
       //           do not nest an <article> inside another <article>). You should use Template
       //           literals (tempalte strings) and element.innerHTML for this.
       myArticle.innerHTML =
       `<div class="coffee-card">
        <h3></h3>
        <div class="info">
          <p><slot name="date" />${data.str_drink_name}</p>
          <p><slot name="location" />${data.str_purchase_location}</p>
          <p><slot name="Brew-Method" />${data.select_brew_style}</p>
          <p><slot name="Serving-Type" />${data.select_drink_type}</p>
          <p><slot name="Color" />${data.int_slide_color}</p>
        </div>
        <button id="toggle-info">Edit</button>
      </div>`;
     }
 }
 //Define the Class as a customElement so we can create coffee-card elements
 customElements.define('coffee-card', CoffeeCard);

