/* global describe, beforeAll, page, it, expect */
describe("Basic user flow for Website", () => {
  // Load the page in url
  beforeAll(async () => {
    // Now using Github Page URL. Feel free to change back to Live Server URL for manual testing!
    await page.goto('http://localhost:8080')
  });

  // Define the total number of cards to add to the database
  const TOTAL_CARDS = 10;

  // Define the total time allowed for each test
  const TOTAL_TEST_TIME = 45000;

  // Increment by 1 in console.log()
  const INCREMENT = 1;

  const ONE = 1;
  const TWO = 2;

  // Used to avoid magic number
  const ZERO = 0;

  // Flavor slider max value
  const SLIDER_MAX_VALUE = 5;

  // Default date
  const DEFAULT_DATE = "2022-01-01";

  // Check to make sure that adding 10 cards to the page will create 10 cards
  it("Adding 10 cards should populate the gallery with 10 cards ", async () => {

    // In a for loop click on the add button, provide input, and save
    const addButton = await page.$("#add_card");
    for(let i = 0; i < TOTAL_CARDS; i++) {
      await addButton.click();
      await page.$eval("#str_drink_name", (el, value) => el.value = "Drink"+value, i);
      await page.$eval("#float_drink_price", (el, value) => el.value = "Price"+value, i);

      // Give the cards a default date
      console.log("The default date to test is: " + DEFAULT_DATE);
      let date = new Date(DEFAULT_DATE);
      date = date.toLocaleDateString('en-US');
      await page.type("#time_purchase_date", date.replace(/[^0-9]/g, ''));

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

    // In a for loop click on each card and edit the first four fields
    for(let i = 0; i < TOTAL_CARDS; i++) {
      const cards = await page.$$('coffee-card');
      const shadowRoot = await cards[i].getProperty("shadowRoot");
      const editButton = await shadowRoot.$("#edit_button");
      await editButton.click();

      await page.$eval("#str_drink_name", (el, value) => el.value = "Drink"+value+"-edited", i);
      await page.$eval("#float_drink_price", (el, value) => el.value = "Price"+value+"-edited", i);
      await page.$eval("#str_purchase_location", (el, value) => el.value = "Location"+value+"-edited", i);
      await page.$eval("#save", el => el.click());
    }

    /*
     * Then check to make sure the fields match our assumptions
     * console.log("Total Coffee Cards is " + cardsUpdated.length)
     */
    
    for (let i = 0; i < TOTAL_CARDS; i++) {
      const cardsUpdated = await page.$$('coffee-card');
      console.log("Checking edited card #" + i);
      const shadowRoot = await cardsUpdated[i].getProperty('shadowRoot');
      const editButton = await shadowRoot.$("#edit_button");
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
      const drinkName = await shadowRoot.$eval("#str_drink_name", (el) => {
        return el.innerText;
      });
      expect(drinkName).toBe("Drink"+i+"-edited");

      // Check the location of the drink on the thumbnail
      const place = await shadowRoot.$eval("#str_purchase_location", (el) => {
        return el.innerText;
      });
      expect(place).toBe("Location"+i+"-edited");
    }
  }, TOTAL_TEST_TIME);

// Check to make sure that all TOTAL_CARDS <coffee-card> elements have correct date modification
it('Make sure <coffee-card> elements dates are functioning', async () => {
  console.log('Checking to make sure <coffee-card> elements dates are functioning...');
  // Iterate through all coffee cards
  for (let i = 0; i < TOTAL_CARDS; i++) {
    // Query select all of the <coffee-card> elements
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i}/${allCoffeeCards.length}`);
    let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    
    // Check info on Thumbnail
    let thumbDate = await itemFromShadow.$eval("#time_purchase_date", (el) => {
      return el.innerText;
    });
    thumbDate = new Date(thumbDate);
    thumbDate = thumbDate.toDateString();

    // Click the edit button
    const buttonFromShadow = await itemFromShadow.$('#edit_button');
    await buttonFromShadow.click();

    // Check info on edit page
    let cardDate = await page.$eval("#time_purchase_date", (el) => {
      return el.value;
    });
    cardDate = cardDate.split('-');
    cardDate = new Date(cardDate[ZERO], cardDate[ONE]-ONE, cardDate[TWO]);
    cardDate = cardDate.toDateString();
    console.log("Drink"+i+"'s current date on edit page is: " + cardDate);
    cardDate = new Date(cardDate);
    cardDate = cardDate.toDateString();

    // Check if the thumbnail's date matches the one on the card edit page
    expect(thumbDate).toBe(cardDate);

    // Create a new date
    const NINE = 9;
    const modifiedDay = i%NINE;
    const tomorrowDateStr = "2053-"+"12"+"-1"+String(modifiedDay);
    let tomorrow = new Date(tomorrowDateStr);
    tomorrow = tomorrow.toLocaleDateString('en-US');
    await page.type("#time_purchase_date", tomorrow.replace(/[^0-9]/g, ''));
    tomorrow = new Date(tomorrow);
    tomorrow = tomorrow.toLocaleDateString('zh-Hans-CN');
    console.log("Drink"+i+"'s new date on edit page is: " + tomorrow);

    // Save the edit of the card
    const saveButton = await page.$("#save");
    await saveButton.click();

    allCoffeeCards = await page.$$('coffee-card');
    itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    // Check and see if the date on thumbnail is updated
    let newThumbDate = await itemFromShadow.$eval("#time_purchase_date", (el) => {
      return el.innerText;
    });
    newThumbDate = new Date(newThumbDate);
    newThumbDate = newThumbDate.toLocaleDateString('zh-Hans-CN');
    console.log("Drink"+i+"'s updated date on thumbnail is: " + newThumbDate);
    expect(newThumbDate).toBe(tomorrow);
  }
}, TOTAL_TEST_TIME);

// Check chocoloate checkbox edit functionality
it('Checking the chocoloate checkbox values have been successfully edited when opend', async () => {
  console.log('Checking the chocoloate checkbox value after edits...');

  // Query a <coffee-card> element using puppeteer
  
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s chocoloate checkbox edit`);

    // Click the edit button
    let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    let buttonFromShadow = await itemFromShadow.$('#edit_button');
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

    // Re-query the cards
    allCoffeeCards = await page.$$('coffee-card');
    itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    buttonFromShadow = await itemFromShadow.$('#edit_button');
    await buttonFromShadow.click();

    // When the page is open again
    checkboxOnPage = await page.$('#bool_check_chocolate');

    // The check box should remain checked
    checkboxValue = await (await checkboxOnPage.getProperty("checked")).jsonValue();
    expect(checkboxValue).toBe(true);

    // Save the edit of the card
    await saveButton.click();
  }
}, TOTAL_TEST_TIME);



// Check caramel checkbox edit functionality
it('Checking the caramel checkbox values have been successfully edited when opend', async () => {
  console.log('Checking the caramel checkbox value after edits...');

  // Query a <coffee-card> element using puppeteer
  
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s caramel checkbox edit`);
   // Click the edit button
    let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    let buttonFromShadow = await itemFromShadow.$('#edit_button');
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
    allCoffeeCards = await page.$$('coffee-card');
    itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    buttonFromShadow = await itemFromShadow.$('#edit_button');
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
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s nutty checkbox edit`);
   
    // Click the edit button
    let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    let buttonFromShadow = await itemFromShadow.$('#edit_button');
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
    allCoffeeCards = await page.$$('coffee-card');
    itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    buttonFromShadow = await itemFromShadow.$('#edit_button');
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
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s fruity checkbox edit`);
   
    // Click the edit button
    let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    let buttonFromShadow = await itemFromShadow.$('#edit_button');
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
    allCoffeeCards = await page.$$('coffee-card');
    itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
    buttonFromShadow = await itemFromShadow.$('#edit_button');
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
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s acidity slider edit`);
    for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
      allCoffeeCards = await page.$$('coffee-card');
      // Click the edit button
      let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      let buttonFromShadow = await itemFromShadow.$('#edit_button');
      await buttonFromShadow.click();
 
      // Change the slider value
      await page.$eval("#int_slide_acidity", (el, j) => el.value = j, j);
  
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      allCoffeeCards = await page.$$('coffee-card');
      itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      buttonFromShadow = await itemFromShadow.$('#edit_button');
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
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s sweetness slider edit`);
    for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
      allCoffeeCards = await page.$$('coffee-card');
      // Click the edit button
      let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      let buttonFromShadow = await itemFromShadow.$('#edit_button');
      await buttonFromShadow.click();
     
      // Change the slider value
      await page.$eval("#int_slide_sweetness", (el, j) => el.value = j, j);
     
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      allCoffeeCards = await page.$$('coffee-card');
      itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      buttonFromShadow = await itemFromShadow.$('#edit_button');
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
  for (let i = 0; i < TOTAL_CARDS; i++) {
    let allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s bitterness slider edit`);
    for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
      allCoffeeCards = await page.$$('coffee-card');
      // Click the edit button
      let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      let buttonFromShadow = await itemFromShadow.$('#edit_button');
      await buttonFromShadow.click();
     
      // Change the slider value
      await page.$eval("#int_slide_bitterness", (el, j) => el.value = j, j);
      
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      allCoffeeCards = await page.$$('coffee-card');
      itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      buttonFromShadow = await itemFromShadow.$('#edit_button');
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
  let allCoffeeCards = await page.$$('coffee-card');
  for (let i = 0; i < TOTAL_CARDS; i++) {
    allCoffeeCards = await page.$$('coffee-card');
    console.log(`Checking coffee card ${i + INCREMENT}/${allCoffeeCards.length}'s saltiness slider edit`);
    for (let j = 0; j <= SLIDER_MAX_VALUE; j++) {
      allCoffeeCards = await page.$$('coffee-card');
      // Click the edit button
      let itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      let buttonFromShadow = await itemFromShadow.$('#edit_button');
      await buttonFromShadow.click();
      
      // Change the slider value
      await page.$eval("#int_slide_saltiness", (el, j) => el.value = j, j);
      
      // Save the edit of the card
      const saveButton = await page.$("#save");
      await saveButton.click();
      allCoffeeCards = await page.$$('coffee-card');
      itemFromShadow = await allCoffeeCards[i].getProperty('shadowRoot');
      buttonFromShadow = await itemFromShadow.$('#edit_button');
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

/**
 * Sorting Tests begin here
 *
 * Check that sorting then deleting deletes the correct card after sort by date
 * NOTE: test may fail if two cards are identical
 */
it('Checking that the correct card is deleted after a sort', async () => {
  console.log('Checking that correct card is edited after sort');
  // Grab the filter drop down and change trigger sorting by date
  await page.$eval('#filter', (el) => {
    el.value = '0Date: Oldest-Newest';
  });
  // Randomly get a card
  const coffeeCards = await page.$$('coffee-card');
  const cardNum = coffeeCards.length;
  const cardIndex = Math.floor(Math.random() * cardNum);
  const card = coffeeCards[cardIndex];
  const shadowRoot1 = await card.getProperty("shadowRoot");

  // Get the name of drink as an identifier of that card
  const editButton = await shadowRoot1.$("#edit_button");
  await editButton.click();
  const drinkName = await page.$eval("#str_drink_name", (el) => {
    return el.value;
  });
  const cancelButton = await page.$("#cancel");
  await cancelButton.click();

  // Get the delete button and click on it
  const shadowRoot2 = await card.getProperty("shadowRoot");
  const deleteButton = await shadowRoot2.$('#delete_button');
  await deleteButton.click();

  // Iterate through the cards and make sure that specific card no longer exists
  let existCard = false;
  const cardsDeleted = await page.$$('coffee-card');
  for (let i = 0; i < cardsDeleted.length; i++) {
    const card = cardsDeleted[i];
    const shadowRoot3 = await card.getProperty("shadowRoot");
    const editButton = await shadowRoot3.$("#edit_button");
    await editButton.click();
    const currentName = await page.$eval("#str_drink_name", (el) => {
      return el.value;
    });
    const cancelButton = await page.$("#cancel");
    await cancelButton.click();
    if(currentName == drinkName) {
      existCard = true;
    }
  }
expect(existCard).toBe(false);
}, TOTAL_TEST_TIME);

// Check to make sure clicking delete button deletes exactly one card
it('Check if delete button deletes exactly one card per click', async () => {
  // Get the first coffeecard
  const coffeeCards = await page.$$('coffee-card');
  const cardNum = coffeeCards.length;
  const card = coffeeCards[ZERO];

  // Get the delete button and click on it
  const shadowRoot = await card.getProperty("shadowRoot");
  const deleteButton = await shadowRoot.$('#delete_button');
  await deleteButton.click();

  // Check the gallery and make sure exactly one coffecard is deleted
  const afterNum = await page.$$eval('coffee-card', (cards) => {
    return cards.length;
  });
  expect(afterNum).toBe(cardNum - INCREMENT);
}, TOTAL_TEST_TIME);

/**
 * Check and make sure the deleted card is the target card
 * NOTE: This test is expected to fail if two cards of same name exist
 */
it('Check if deleted card is the clicked card', async () => {
  // Randomly get a card
  const coffeeCards = await page.$$('coffee-card');
  const cardNum = coffeeCards.length;
  const cardIndex = Math.floor(Math.random() * cardNum);
  const card = coffeeCards[cardIndex];
  const shadowRoot1 = await card.getProperty("shadowRoot");

  // Get the name of drink as an identifier of that card
  const editButton = await shadowRoot1.$("#edit_button");
  await editButton.click();
  const drinkName = await page.$eval("#str_drink_name", (el) => {
    return el.value;
  });
  const cancelButton = await page.$("#cancel");
  await cancelButton.click();

  // Get the delete button and click on it
  const shadowRoot2 = await card.getProperty("shadowRoot");
  const deleteButton = await shadowRoot2.$('#delete_button');
  await deleteButton.click();

  // Iterate through the cards and make sure that specific card no longer exists
  let existCard = false;
  const cardsDeleted = await page.$$('coffee-card');
  for (let i = 0; i < cardsDeleted.length; i++) {
    const card = cardsDeleted[i];
    const shadowRoot3 = await card.getProperty("shadowRoot");
    const editButton = await shadowRoot3.$("#edit_button");
    await editButton.click();
    const currentName = await page.$eval("#str_drink_name", (el) => {
      return el.value;
    });
    const cancelButton = await page.$("#cancel");
    await cancelButton.click();
    if(currentName == drinkName) {
      existCard = true;
    }
  }

  expect(existCard).toBe(false);
}, TOTAL_TEST_TIME);

// Check to make sure deleting all cards will clear up the gallery
it('Check if deleting all cards clears up the gallery', async () => {
  // Get the card array
  const coffeeCards = await page.$$('coffee-card');
  const cardNum = coffeeCards.length;
  
  // Iterate through all cards and click the delete button
  for(let i = 0; i < cardNum; i++) {
    // Re-fetch the cards array because the cards bubbles with every delete
    const coffeeCards = await page.$$('coffee-card');
    // Delete the first card every time
    const card = coffeeCards[ZERO];

    // Get the button and click
    const shadowRoot = await card.getProperty("shadowRoot");
    const deleteButton = await shadowRoot.$('#delete_button');
    await deleteButton.click();
  }

  // Check if the array is empty
  const cardsDeleted = await page.$$('coffee-card');
  const actualNum = cardsDeleted.length;
  expect(actualNum).toBe(ZERO);

  // Check if the gallery is empty
  const numCards = await page.$$eval('coffee-card', (cards) => {
    return cards.length;
  });
  expect(numCards).toBe(ZERO);

}, TOTAL_TEST_TIME);
});