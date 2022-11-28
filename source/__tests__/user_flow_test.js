/* global describe, beforeAll, page, it, expect */
describe("Basic user flow for Website", () => {
    // Load the page in url
    beforeAll(async () => {
      // Now using Github Page URL. Feel free to change back to Live Server URL for manual testing!
      await page.goto('http://127.0.0.1:5501/source/')
    });

    // Define the total number of cards to add to the database
    const TOTAL_CARDS = 10;
    // Define the total time allowed for each test
    const TOTAL_TEST_TIME = 25000;
    // Increment by 1 in console.log()
    const INCREMENT = 1;
    // Increment by 1 in console.log()
    const SLIDER_MAX_VALUE = 5;


    // Check to make sure that adding 10 cards to the page will create 10 cards
    it("Adding 10 cards should populate the gallery with 10 cards ", async () => {
      // In a for loop click on the add button, provide input, and save
      const addButton = await page.$("#add_card");
      for(let i = 0; i < TOTAL_CARDS; i++) {
        await addButton.click();
        await page.$eval("#str_drink_name", (el, value) => el.value = "Drink"+value, i);
        await page.$eval("#int_drink_price", (el, value) => el.value = "Price"+value, i);
        let date = new Date().toLocaleDateString();
        await page.type("#time_purchase_date", date);
                
        await page.$eval("#str_purchase_location", (el, value) => el.value = "Location"+value, i);
        const saveButton = await page.$("#save");
        await saveButton.click();
        console.log("Adding card #" + i);
      }
      // Then check the gallery to make sure there are 10 cards
      const numCards = await page.$$eval('coffee-card', (cards) => {
        return cards.length;
      });

      console.log("Total Cards: " + numCards);
      expect(numCards).toBe(TOTAL_CARDS);
    }, TOTAL_TEST_TIME);




    // Edit the cards so we update the four fields by appending "-edited"
    it("Editing Cards should update their fields", async () => {

      const cards = await page.$$("coffee-card");
      // In a for loop click on each card and edit the first four fields
      for(let i = 0; i < cards.length; i++) {
        
        const shadowRoot = await cards[i].getProperty("shadowRoot");
        const editButton = await shadowRoot.$("button");
        await editButton.click();
    
        await page.$eval("#str_drink_name", (el, value) => el.value = "Drink"+value+"-edited", i);
        await page.$eval("#int_drink_price", (el, value) => el.value = "Price"+value+"-edited", i);

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        await page.type("#time_purchase_date", tomorrow.toLocaleDateString());

        await page.$eval("#str_purchase_location", (el, value) => el.value = "Location"+value+"-edited", i);
        const saveButton = await page.$("#save");
        await saveButton.click();        
      }

      // Then check to make sure the fields match our assumptions
      const cardsUpdated = await page.$$("coffee-card");
      console.log("Total Coffee Cards is " + cardsUpdated.length)
      for (let i = 0; i < cardsUpdated.length; i++) {
        console.log("Checking edited card #" + i);
        const shadowRoot = await cardsUpdated[i].getProperty('shadowRoot');
        const editButton = await shadowRoot.$("button");
        await editButton.click();
        const drinkName = await page.$eval("#str_drink_name", (el) => {
          return el.value;
        });
        console.log("card #"+i+ " has name " + drinkName)
        expect(drinkName).toBe("Drink"+i+"-edited");
        const cancelButton = await page.$("#cancel");
        await cancelButton.click();
        
      }
    }, TOTAL_TEST_TIME);

    // Check to make sure that all TOTAL_CARDS <coffee-card> elements have correct data in thumbnail
    it('Make sure <coffee-card> elements are populated', async () => {
      console.log('Checking to make sure <coffee-card> elements are populated...');
      // Query select all of the <coffee-card> elements
      const allCoffeeCards = await page.$$('coffee-card');
      // Iterate through all coffee cards
      for (let i = 0; i < allCoffeeCards.length; i++) {   
        console.log(`Checking coffee card ${i}/${allCoffeeCards.length}`);
        const shadowRoot = await allCoffeeCards[i].getProperty('shadowRoot');
        // Check the name of the drink on the thumbnail
        let drinkName = await shadowRoot.$eval("#str_drink_name", (el) => {
          return el.innerText;
        });
        expect(drinkName).toBe("Drink"+i+"-edited");
        // Check the date purchased of the drink on the thumbnail
        let date = await shadowRoot.$eval("#time_purchase_date", (el) => {
          return el.innerText;
        });

        // TODO: Check to make sure the date is set to tomorrow's date
        // Check the location purchased of the drink on the thumbnail
        let place = await shadowRoot.$eval("#str_purchase_location", (el) => {
          return el.innerText;
        });
        expect(place).toBe("Location: Location"+i+"-edited");
      }
    }, TOTAL_TEST_TIME);

  // Check chocoloate checkbox edit functionality
  it('Checking the chocoloate checkbox values have been successfully edited when opend', async () => {
    console.log('Checking the chocoloate checkbox value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s chocoloate checkbox edit`);
      // Click the edit button
      const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      const buttonFromShadow = await itemFromShadow.$('button');
      await buttonFromShadow.click();
      // Initially, the check box should not be checked
      let checkboxOnPage = await page.$('#bool_check_chocolate');
      let checkboxValue = await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(false);
      // Check the checkbox
      await page.click('#bool_check_chocolate', {clickCount:1});
      // Check box value immediately after click
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      await buttonFromShadow.click();
      // When the page is open again
      checkboxOnPage = await page.$('#bool_check_chocolate');
      // The check box should remain checked
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      await saveButton.click();
    }
  }, TOTAL_TEST_TIME);

  // Check caramel checkbox edit functionality
  it('Checking the caramel checkbox values have been successfully edited when opend', async () => {
    console.log('Checking the caramel checkbox value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s caramel checkbox edit`);
     // Click the edit button
      const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      const buttonFromShadow = await itemFromShadow.$('button');
      await buttonFromShadow.click();
      // Initially, the check box should not be checked
      let checkboxOnPage = await page.$('#bool_check_caramel');
      let checkboxValue = await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(false);
      // Check the checkbox
      await page.click('#bool_check_caramel', {clickCount:1});
      // Check box value immediately after click
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      await buttonFromShadow.click();
      // When the page is open again
      checkboxOnPage = await page.$('#bool_check_caramel');
      // The check box should remain checked
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      await saveButton.click();
    }
  }, TOTAL_TEST_TIME);

  // Check nutty checkbox edit functionality
  it('Checking the nutty checkbox values have been successfully edited when opend', async () => {
    console.log('Checking the nutty checkbox value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s nutty checkbox edit`);
     // Click the edit button
      const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      const buttonFromShadow = await itemFromShadow.$('button');
      await buttonFromShadow.click();
      // Initially, the check box should not be checked
      let checkboxOnPage = await page.$('#bool_check_nutty');
      let checkboxValue = await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(false);
      // Check the checkbox
      await page.click('#bool_check_nutty', {clickCount:1});
      // Check box value immediately after click
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      await buttonFromShadow.click();
      // When the page is open again
      checkboxOnPage = await page.$('#bool_check_nutty');
      // The check box should remain checked
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      await saveButton.click();
    }
  }, TOTAL_TEST_TIME);

  // Check fruity checkbox edit functionality
  it('Checking the fruity checkbox values have been successfully edited when opend', async () => {
    console.log('Checking the fruity checkbox value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s fruity checkbox edit`);
     // Click the edit button
      const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      const buttonFromShadow = await itemFromShadow.$('button');
      await buttonFromShadow.click();
      // Initially, the check box should not be checked
      let checkboxOnPage = await page.$('#bool_check_fruity');
      let checkboxValue = await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(false);
      // Check the checkbox
      await page.click('#bool_check_fruity', {clickCount:1});
      // Check box value immediately after click
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      await buttonFromShadow.click();
      // When the page is open again
      checkboxOnPage = await page.$('#bool_check_fruity');
      // The check box should remain checked
      checkboxValue= await (await checkboxOnPage.getProperty("checked")).jsonValue();
      expect(checkboxValue).toBe(true);
      // Save the edit of the card
      await saveButton.click();
    }
  }, TOTAL_TEST_TIME);

  // Check acidity slider edit functionality
  it('Checking the acidity slider values have been successfully edited when opend', async () => {
    console.log('Checking the card acidity slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s acidity slider edit`);
      for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
       // Click the edit button
        const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        const buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        // Change the slider value
        await page.$eval("#int_slide_acidity", (el, j) => el.value = j, j);
        // Save the edit of the card
        const saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        // Check for the changed slider value
        const sliderValue = await page.$eval("#int_slide_acidity", (el) => { return el.value; });
        expect(Number(sliderValue)).toBe(j);
        await saveButton.click();
      }
    }
  }, TOTAL_TEST_TIME);

  // Check sweetness slider edit functionality
  it('Checking the sweetness slider values have been successfully edited when opend', async () => {
    console.log('Checking the card sweetness slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s sweetness slider edit`);
      for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
       // Click the edit button
        const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        const buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        // Change the slider value
        await page.$eval("#int_slide_sweetness", (el, j) => el.value = j, j);
        // Save the edit of the card
        const saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        // Check for the changed slider value
        const sliderValue = await page.$eval("#int_slide_sweetness", (el) => { return el.value; });
        expect(Number(sliderValue)).toBe(j);
        await saveButton.click();
      }
    }
  }, TOTAL_TEST_TIME);

  // Check bitterness slider edit functionality
  it('Checking the bitterness slider values have been successfully edited when opend', async () => {
    console.log('Checking the card bitterness slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s bitterness slider edit`);
      for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
       // Click the edit button
        const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        const buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        // Change the slider value
        await page.$eval("#int_slide_bitterness", (el, j) => el.value = j, j);
        // Save the edit of the card
        const saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        // Check for the changed slider value
        const sliderValue = await page.$eval("#int_slide_bitterness", (el) => { return el.value; });
        expect(Number(sliderValue)).toBe(j);
        await saveButton.click();
      }
    }
  }, TOTAL_TEST_TIME);

  // Check saltiness slider edit functionality
  it('Checking the saltiness slider values have been successfully edited when opend', async () => {
    console.log('Checking the card saltiness slider value after edits...');
    // Query a <coffee-card> element using puppeteer
    const allCoffeeCards = await page.$$('coffee-card');
    for (let i = 0; i < allCoffeeCards.length; i++) {
      console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s saltiness slider edit`);
      for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
       // Click the edit button
        const itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
        const buttonFromShadow = await itemFromShadow.$('button');
        await buttonFromShadow.click();
        // Change the slider value
        await page.$eval("#int_slide_saltiness", (el, j) => el.value = j, j);
        // Save the edit of the card
        const saveButton = await page.$("#save");
        await saveButton.click();
        await buttonFromShadow.click();
        // Check for the changed slider value
        const sliderValue = await page.$eval("#int_slide_saltiness", (el) => { return el.value; });
        expect(Number(sliderValue)).toBe(j);
        await saveButton.click();
      }
    }
  }, TOTAL_TEST_TIME);


  // Check to make sure that after you reload the page it remembers all coffee cards after edit
  it('Checking number of cards on screen after reload', async () => {
    console.log('Checking number of cards on screen after reload...');
    // Reload the page, then select all of the <coffee-card> elements to check
    await page.reload();
    const allCoffeeCardsLength = await page.$$eval('coffee-card', (coffeeCards) => {
      return coffeeCards.length;
    });
    expect(allCoffeeCardsLength).toBe(TOTAL_CARDS);
  }, TOTAL_TEST_TIME);

  /*
   * TODO: check local storage
   * // Check to make sure that the cards in localStorage is what we expect
   * it('Checking the localStorage to make sure cart is correct', async () => {
   * // TODO: get coffee card object and check each index
   * const coffeeCardsStored = await page.$$eval('coffeeCards', (coffeeCardsStored) => {
   *     return localStorage.getItem('coffeeCards');
   * });
   * expect(coffeeCardsStored).toBe('[ FILL IN HERE ]');
   * });
   */
});