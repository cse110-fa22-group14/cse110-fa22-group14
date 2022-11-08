/**
 * @author Ruilin Hu
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
         //Attach the shadow DOM to this Web Component
         const shadow = this.attachShadow({ mode: "open" });
         //article element to hold elements
         const myArticle = document.createElement("article");
         //style element for the coffee cards
         const myStyle = document.createElement("style");
         //define the precise style for the card
         myStyle.textContent = ``; //TODO: fill in the style
         //append the elements to the shadow.
         shadow.append(myStyle);
         shadow.append(myArticle);
     }

     set data(data) {
         if (!data) return; //return if no valid data is passed
         //find the article element in shadowroot
         let myArticle = this.shadowRoot.querySelector('article');
         //define html for the card
         myArticle.innerHTML = ``; //TODO: fill in the html
     }
 }
 //Define the Class as a customElement so we can create coffee-card elements
 customElements.define('coffee-card', RecipeCard);
