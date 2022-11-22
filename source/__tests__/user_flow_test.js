describe("Basic user flow for Website", () => {
    
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5501/source/');
     });
    


    // NOTE: The name and implementation of these tests are open to change. 
    // Feel free to change anything. This is all just to get some basic code down
    // But we should be thinking about testing for performance of our app 

    let TOTAL_CARDS = 10; //total number of cards to add to the database
    // Check to make sure that adding 10 cards to the page will create 10 cards
    it("Adding 10 cards should populate the gallery with 10 cards ", async () => {
  
      // In a for loop click on the add button, provide input, and save
      const addButton = await page.$("#add_card");

      for(let i = 0; i < TOTAL_CARDS; i++) {
        await addButton.click();
        console.log("Adding card #" + i);
        await page.$eval("#str_drink_name", (el, value) => el.value = "Drink"+value, i);
        await page.$eval("#int_drink_price", (el, value) => el.value = "Price"+value, i);
        await page.$eval("#time_purchase_date", (el, value) => el.value = "Date"+value, i);
        await page.$eval("#str_purchase_location", (el, value) => el.value = "Location"+value, i);

        const saveButton = await page.$("#save");
        await saveButton.click();
      }
      
      // Then check the gallery to make sure there are 10 cards
      const numCards = await page.$$eval('coffee-card', (cards) => {
        return cards.length;
      });

      console.log(numCards);
      expect(numCards).toBe(10);

    }, 20000);


     // Edit the cards so we update the four fields by appending "-edited"
     it("Editing Cards should update their fields", async () => {
  
      let cards = await page.$$("coffee-card");

      // In a for loop click on each card and edit the first four fields
      for(let i = 0; i < cards.length; i++) {
        let currCard = cards[i];
        const shadowRoot = await currCard.getProperty('shadowRoot');
        const editButton = await shadowRoot.$(".toggle_edit");
        await editButton.click();

        await page.$eval("#str_drink_name", (el, value) => el.value = "Drink"+value+"-edited", i);
        await page.$eval("#int_drink_price", (el, value) => el.value = "Price"+value+"-edited", i);
        await page.$eval("#time_purchase_date", (el, value) => el.value = "Date"+value+"-edited", i);
        await page.$eval("#str_purchase_location", (el, value) => el.value = "Location"+value+"-edited", i);

        const saveButton = await page.$("#save");
        await saveButton.click();
        console.log("Edited card #" + i);

      }

      
       // Then check to make sure the fields match our assumptions
       let cardsUpdated = await page.$$("coffee-card");

       for (let i = 0; i < cardsUpdated.length; i++) {
        console.log("Checking card #" + i);

         let currCard = cardsUpdated[i];
         const shadowRoot = await currCard.getProperty('shadowRoot');
         const editButton = await shadowRoot.$(".toggle_edit");
         await editButton.click();
        

         let value = await page.$eval("#str_drink_name", (el) => {
            return el.value;
         });
        
         console.log(value)
         expect(value).toBe("Drink"+i+"-edited");

         const saveButton = await page.$("#save");
         await saveButton.click();
        }
      

     }, 20000);

     // Check to make sure that all TOTAL_CARDS <coffee-card> elements have 
     // correct data in thumbnail
    it('Make sure <coffee-card> elements are populated', async () => {
      console.log('Checking to make sure <coffee-card> elements are populated...');
      // Query select all of the <coffee-card> elements
      const allCoffeeCards = await page.$$('coffee-card');
      //iterate through all coffee cards
      for (i = 1; i < allCoffeeCards.length; i++) {
        console.log(`Checking coffee card ${i}/${allCoffeeCards.length}`);
        //check the name of the drink on the thumbnail
        let value = await page.$eval("#str_drink_name", (el) => {
          return el.innerText;
        });
        expect(value).toBe("Drink"+i+"-edited");
        //check the date purchased of the drink on the thumbnail
        value = await page.$eval("#time_purchase_date", (el) => {
          return el.innerText;
        });
        expect(value).toBe("Date"+i+"-edited");
        //check the location purchased of the drink on the thumbnail
        value = await page.$eval("#str_purchase_location", (el) => {
          return el.innerText;
        });
        expect(value).toBe("Location"+i+"-edited");
      }
    }, 10000);

  /*
  TODO: check slider, dropdown, comments and checkboxes
  // Check to make sure that the cards can all be successfully edited
  it('Checking the cards have been successfully edited when opend', async () => {
    console.log('Checking the card details after edits...');
    // Query a <coffee-card> element using puppeteer
    let allCoffeeCards = await page.$$('coffee-card');
    //click the edit button
    let itemFromShadow = await allCoffeeCards[0].getProperty('shadowRoot');
    let buttonFromShadow = await itemFromShadow.$('button');
    await buttonFromShadow.click();

    //save the edit of the card
    const saveButton = await page.$("#save");
    await saveButton.click();
  }, 2500);
  */

  // Check to make sure that after you reload the page it remembers all coffee cards after edit
  it('Checking number of cards on screen after reload', async () => {
    console.log('Checking number of cards on screen after reload...');
    // Reload the page, then select all of the <coffee-card> elements to check
    await page.reload();
    const allCoffeeCardsLength = await page.$$eval('coffee-card', (coffeeCards) => {
      return coffeeCards.length;
    });
    expect(allCoffeeCardsLength).toBe(TOTAL_CARDS);
  }, 10000);

  /*
  TODO: check local storage
  // Check to make sure that the cards in localStorage is what we expect
  it('Checking the localStorage to make sure cart is correct', async () => {
    // TODO: get coffee card object and check each index
    const coffeeCardsStored = await page.$$eval('coffeeCards', (coffeeCardsStored) => {
      return localStorage.getItem('coffeeCards');
    });
    expect(coffeeCardsStored).toBe('[ FILL IN HERE ]');
  });
  */


  });