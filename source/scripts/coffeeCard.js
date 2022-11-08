/* TODO: 
 * coffee card should include date (Monday 12, 2022 for example)
 * a share button to post the card to social media (this will be implemented later)
 * Title of Drink
 * Short Description of the drink: this content is still to be decided
 */


const template = document.createElement('template');
template.innerHTML = `
  <style>
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
   
	}
  </style>
  <div class="coffee-card">
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="date" /></p>
        <p><slot name="location" /></p>
        <p><slot name="Brew-Method" /></p>
        <p><slot name="Serving-Type" /></p>
        <p><slot name="Color" /></p>
      </div>
      <button id="toggle-info">Edit</button>
    </div>
  </div>
`;

class CoffeeCard extends HTMLElement {
  constructor() {
    super();
    
    this.showInfo = true;

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');

  }
}

window.customElements.define('coffee-card', CoffeeCard);