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
      for (i = 0; i < allCoffeeCards.length; i++) {
        console.log(`Checking coffee card ${i + 1}/${allCoffeeCards.length}`);
        const shadowRoot = await allCoffeeCards[i].getProperty('shadowRoot');
        //check the name of the drink on the thumbnail
        let value = await shadowRoot.$eval("#str_drink_name", (el) => {
          return el.innerText;
        });
        expect(value).toBe("Drink"+i+"-edited");
        //check the date purchased of the drink on the thumbnail
        value = await shadowRoot.$eval("#time_purchase_date", (el) => {
          return el.innerText;
        });
        expect(value).toBe(("Date"+i+"-edited").toUpperCase());
        //check the location purchased of the drink on the thumbnail
        value = await shadowRoot.$eval("#str_purchase_location", (el) => {
          return el.innerText;
        });
        expect(value).toBe("Location: Location"+i+"-edited");
      }
    }, 10000);

  
  // Check acidity slider edit functionality
  it('Checking the acidity slider values have been successfully edited when opend', async () => {
    console.log('Checking the card acidity slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    let allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + 1}/${allCoffeeCards.length}'s acidity slider edit`);
      for (let j = 0; j <= 5; j++) {
        //click the edit button
        let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        let buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        await page.$eval("#int_slide_acidity", (el, j) => el.value = j, j);
        //save the edit of the card
        let saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        let sliderValue = await page.$eval("#int_slide_acidity", (el) => {return el.value;});
        expect(Number(sliderValue)).toBe(j);
      }
    }
  }, 25000);

  // Check sweetness slider edit functionality
  it('Checking the sweetness slider values have been successfully edited when opend', async () => {
    console.log('Checking the card sweetness slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    let allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + 1}/${allCoffeeCards.length}'s sweetness slider edit`);
      for (let j = 0; j <= 5; j++) {
        //click the edit button
        let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        let buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        await page.$eval("#int_slide_sweetness", (el, j) => el.value = j, j);
        //save the edit of the card
        let saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        let sliderValue = await page.$eval("#int_slide_sweetness", (el) => {return el.value;});
        expect(Number(sliderValue)).toBe(j);
      }
    }
  }, 25000);

  // Check bitterness slider edit functionality
  it('Checking the bitterness slider values have been successfully edited when opend', async () => {
    console.log('Checking the card bitterness slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    let allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + 1}/${allCoffeeCards.length}'s bitterness slider edit`);
      for (let j = 0; j <= 5; j++) {
        //click the edit button
        let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        let buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        await page.$eval("#int_slide_bitterness", (el, j) => el.value = j, j);
        //save the edit of the card
        let saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        let sliderValue = await page.$eval("#int_slide_bitterness", (el) => {return el.value;});
        expect(Number(sliderValue)).toBe(j);
      }
    }
  }, 25000);

  // Check saltiness slider edit functionality
  it('Checking the saltiness slider values have been successfully edited when opend', async () => {
    console.log('Checking the card saltiness slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    let allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + 1}/${allCoffeeCards.length}'s saltiness slider edit`);
      for (let j = 0; j <= 5; j++) {
        //click the edit button
        let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        let buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        await page.$eval("#int_slide_saltiness", (el, j) => el.value = j, j);
        //save the edit of the card
        let saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        let sliderValue = await page.$eval("#int_slide_saltiness", (el) => {return el.value;});
        expect(Number(sliderValue)).toBe(j);
      }
    }
  }, 25000);

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