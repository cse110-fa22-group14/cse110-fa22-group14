describe("Basic user flow for Website", () => {
    
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5501/source/');
     });
    


    // NOTE: The name and implementation of these tests are open to change. 
    // Feel free to change anything. This is all just to get some basic code down
    // But we should be thinking about testing for performance of our app 


    // Check to make sure that adding 10 cards to the page will create 10 cards
    it("Adding 10 cards should populate the gallery with 10 cards ", async () => {
  
      // In a for loop click on the add button, provide input, and save
      const addButton = await page.$("#add_card");

      for(let i = 0; i < 10; i++) {
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
     it("Adding 10 cards should populate the gallery with 10 cards ", async () => {
  
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




  });