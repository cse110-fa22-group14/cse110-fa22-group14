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
         const shadow_article = document.createElement("article");
         //style element for the coffee cards
         const shadow_style = document.createElement("style");
         //define the precise style for the card
         shadow_style.textContent = `
         form {
             position: absolute;
             opacity: 1;
             visibility: visible;
             z-index: 1;
             background-color: black;
             border-radius: 10px;
             padding: 20px;
             font-family:'Zen Maru Gothic';
             height: auto;
             width: 50vw;
             margin: auto;
             align-self: center;
             transform: translateY(-100px);
             display: grid;
             grid-template-rows: repeat(11, 55px);
             grid-template-columns: repeat(6, minmax(60px,1fr));
             gap: 10px;

         }

         fieldset{
             border:none;
         }

         #save {
             grid-row-start: 1;
             grid-column-start: 1;
             grid-row-end: 2;
             grid-column-end: 3;
             background: none;
             font-family: 'Zen Maru Gothic';
             font-size:1.2em;
             color: white;
             text-align: left;
          }

          #save:hover{


          }

          #drinkName {
             grid-row-start: 2;
             grid-column-start: 1;
             grid-row-end: 3;
             grid-column-end: 5;


          }
          #price{
             grid-row-start: 3;
             grid-column-start: 1;
             grid-row-end: 4;
             grid-column-end: 5;

          }
          #date {
             grid-row-start: 4;
             grid-column-start: 1;
             grid-row-end: 5;
             grid-column-end: 5;

          }
          #photo{
             grid-row-start: 2;
             grid-column-start: 5;
             grid-row-end: 4;
             grid-column-end: 7;
             background-color: white;
             z-index: 2;
          }

          input[type='text']{
             padding-left: 15px;
             border: none;
             border-radius: 10px;
             font-size: 1.2em;
             font-family: 'Zen Maru Gothic';
          }

          #flavorContainer{
             background-color: white;
             grid-row-start: 6;
             grid-column-start: 1;
             grid-row-end: 9;
             grid-column-end: 7;
             display: flex;
             flex-direction: row;
             border-radius: 10px;


          }

          #flavorContainer fieldset {
             display: flex;
             flex-direction: column;
             justify-content: space-evenly;
          }

          #rangeWrapper {
             width: 40%;
             max-height: 100%;
             font-size: 1.2em;

          }

          #optionalWrapper {
             text-align: left;
             width: 40%;
             max-height: 100%;
             font-size: 1.2em;

          }

          #myRange {
             background-color: white;
             z-index:1
          }

          #cancel {
             grid-row-start: 1;
             grid-column-start: 5;
             grid-row-end: 2;
             grid-column-end: 7;
             background: none;
             font-family: 'Zen Maru Gothic';
             font-size:1.2em;
             color: white;
             text-align: right;
          }

          #cancel:hover{
             cursor:pointer;
             opacity: .8;
             transition: all .2s ease-in;

          }

          #switchPhotoContainer{
             background-color: white;
             grid-row-start: 4;
             grid-column-start: 5;
             grid-row-end: 5;
             grid-column-end: 7;
             border-radius: 10px;
          }


          #location{
             grid-row-start: 5;
             grid-column-start: 1;
             grid-row-end: 6;
             grid-column-end: 5;
          }


          #brewInfoContainer {
             background-color: white;
             grid-row-start: 9;
             grid-column-start: 1;
             grid-row-end: 13;
             grid-column-end: 4;
             display: flex;
             flex-direction: column;
             justify-content: space-evenly;
             padding: 20px;
             border-radius: 10px;
          }

          #comments{
             grid-row-start: 9;
             grid-column-start: 4;
             grid-row-end: 13;
             grid-column-end: 7;
             border-radius: 10px;
             font-family: 'Zen Maru Gothic';
             padding: 15px;
             font-size: 1.2em;
          }

          #functionality {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            margin: auto;
            width: 80%;    
            text-align: center;
            align-items: center;
        }
        
        
        #functionality #help, #filter {
            background-color: black;
            color: white;
            border-radius: 5px;
            width: 100px;
            height: 40px;
        }
        
        #functionality h1 {
            font-family: 'Playfair Display';
            font-size: 2em;
            font-weight: 100;
        }
        
         `;
         shadow_article.innerHTML = `
         <form id = "popUpBox">
        <button id = "save" type = "submit">SAVE</button>
        <button id = "cancel" type = "reset">CANCEL</button>
        
        <input type = "text" id="drinkName" placeholder="name of drink" >drink</input>
        <input type = "text"id="price" placeholder = "price"></input>
        <input type = "text"id="date" placeholder = "date purchased"></input>
        <input type = "text" id="location" placeholder = "location"></input>
        <img id = "drinkPhoto" src = "" alt = "photo of drink" style = "color: white">

        <!--Implement functionality to cycle through images-->
        <div id = "switchPhotoContainer">switch images functionality</div>

        <div id = "flavorContainer">

            <fieldset id = "optionalWrapper">
                <label for ="chocolatey">Chocolatey
                    <input type="checkbox" id = "chocolatey"></input>
                </label>
               
                <label for="caramel">Caramel
                    <input type="checkbox" id = "caramel"></input>
                </label>
                
                <label for="nutty">Nutty
                    <input type="checkbox" id = "nutty"></input>
                </label>
                <label for="nutty">Fruity
                    <input type="checkbox" id = "fruity"></input>
                </label>
            </fieldset>

            <!--TODO: Fix the range of each silder and Add tags next to the sliders 
                      to display the salue of the ALL the sliders-->
            <fieldset id = "rangeWrapper">
                <label for="acidity">Acidity
                    <input type="range" min="1" max="5" value="1" class="acidity" id="myRange"></input>
                </label>
                <label for="sweetness">Sweetness
                    <input type="range" min="1" max="100" value="50" class="sweetness" id="myRange"></input>
                </label>

                <label for="bitterness">Bitterness
                    <input type="range" min="1" max="100" value="50" class="bitterness" id="myRange"></input>
                </label>
                <label for="saltiness">Saltiness
                    <input type="range" min="1" max="100" value="50" class="saltiness" id="myRange"></input>

                </label>

            </fieldset>
        </div>

        <!--TODO: Style the dropdown boxes to make them consistent with rest of form style -->
        <div id = "brewInfoContainer">
                <select id= "servingType">
                    <option value = "casual">Casual</option>
                    <option value = "espresso">Espresso</option>
                    <option value = "cappuccino">Cappuccino</option>
                    <option value = "latte">Latte</option>
                    <option value = "mocha">Mocha</option>
                    <option value = "macchiato">Macchiato</option>

                </select> 


                <select id= "brewMethod">
                    <option value = "drip">Drip</option>
                    <option value = "press">Press</option>
                    <option value = "siphon">Siphon</option>
                    <option value = "pour-over">Pour Over</option>

                </select> 

                <label for ="color">Color
                <input type="range" min="1" max="5" value="1" id="color"></input>
                </label>

        </div>

        <textarea id = "comments" placeholder = "additional comments"></textarea>

    </form>`;
         //append the elements to the shadow.
         
         shadow.append(shadow_style);
         shadow.append(shadow_article);
         let d = new Date();
         let time = d.toLocaleTimeString();

     }

     set data(data) {
         if (!data) return; //return if no valid data is passed
         //find the article element in shadowroot
         let shadow_article = this.shadowRoot.querySelector('article');
         //define html for the card
         shadow_article.innerHTML = `
         <form id = "popUpBox">
             <button id = "save" type = "submit">SAVE</button>
             <button id = "cancel" type = "reset">CANCEL</button>

             <input type = "text" id = "drinkName" name = "str_drink_name" placeholder = "name of drink" >${data.str_drink_name}</input>
             <input type = "text"id = "price" name = "int_drink_price" placeholder = "price">${data.int_drink_price}</input>
             <input type = "text"id = "date" name = "time_purchase_date" placeholder = "date purchased">${data.time_purchase_date}</input>
             <input type = "text" id = "location" name = "str_purchase_location" placeholder = "location">${data.int_drink_price}</input>
             <img id = "drinkPhoto" src = "" name = "img_drink_image" alt = "photo of drink" style = "color: white">

             <!--Implement functionality to cycle through images TODO: Implement image's src-->
             <div id = "switchPhotoContainer">switch images functionality</div>

             <div id = "flavorContainer">

                 <fieldset id = "optionalWrapper">
                     <label for = "chocolatey">Chocolatey
                         <input type = "checkbox" id = "chocolatey" name = "bool_check_chocolate"></input>
                     </label>

                     <label for = "caramel">Caramel
                         <input type = "checkbox" id = "caramel" name = "bool_check_caramel"></input>
                     </label>

                     <label for = "nutty">Nutty
                         <input type = "checkbox" id = "nutty" name = "bool_check_nutty"></input>
                     </label>
                     <label for = "nutty">Fruity
                         <input type = "checkbox" id = "fruity" name = "bool_check_fruity"></input>
                     </label>
                 </fieldset>

                 <!--TODO: Fix the range of each silder and Add tags next to the sliders
                           to display the salue of the ALL the sliders-->
                 <fieldset id = "rangeWrapper">
                     <label for= "acidity">Acidity
                         <input type="range" min="1" max="5" value="${data.int_slide_acidity}" class="acidity" id="myRange" name = "int_slide_acidity"></input>
                     </label>
                     <label for="sweetness">Sweetness
                         <input type="range" min="1" max="100" value="${data.int_slide_sweetness}" class="sweetness" id="myRange" name = "int_slide_sweetness"></input>
                     </label>

                     <label for="bitterness">Bitterness
                         <input type="range" min="1" max="100" value="${data.int_slide_bitterness}" class="bitterness" id="myRange" name = "int_slide_bitterness"></input>
                     </label>
                     <label for="saltiness">Saltiness
                         <input type="range" min="1" max="100" value="${data.int_slide_saltiness}" class="saltiness" id="myRange" name = "int_slide_saltiness"></input>

                     </label>

                 </fieldset>
             </div>

             <!--TODO: Style the dropdown boxes to make them consistent with rest of form style -->
             <div id = "brewInfoContainer">
                     <select id= "servingType" name = "select_drink_type" value = "${data.select_drink_type}">
                         <option value = "casual">Casual</option>
                         <option value = "espresso">Espresso</option>
                         <option value = "cappuccino">Cappuccino</option>
                         <option value = "latte">Latte</option>
                         <option value = "mocha">Mocha</option>
                         <option value = "macchiato">Macchiato</option>

                     </select>


                     <select id= "brewMethod" name "select_brew_style" value = "${data.select_brew_type}">
                         <option value = "drip">Drip</option>
                         <option value = "press">Press</option>
                         <option value = "siphon">Siphon</option>
                         <option value = "pour-over">Pour Over</option>

                     </select>

                     <label for ="color">Color
                     <input type="range" min="1" max="5" value="1" id="color" name = "int_slide_color" value = "${data.int_slide_color}"></input>
                     </label>

             </div>

             <textarea id = "comments" placeholder = "additional comments" name = "str_notes">${data.str_notes}</textarea>

         </form>
         `;
     }
 }
 //Define the Class as a customElement so we can create coffee-card elements
 customElements.define('coffee-card', CoffeeCard);
