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
      const buttons = await page.$$("button");
      console.log(buttons[3])
      let id = await buttons[3].getProperty("id");
      console.log(id)
      
      for(let id = 0; id < 10; id++) {
        await addButton.click();
        await page.$eval("str_drink_name", el => el.value = "name" + id );
        await page.$eval("int_drink_price", el => el.value = "price" + id );
        await page.$eval("time_purchase_date", el => el.value = "date" + id );
        await page.$eval("str_purchase_location", el => el.value = "location" + id );
        const saveButton = await page.$("input[type=submit");
        await saveButton.click();
      }
      // Then check the gallery to make sure there are 10 cards
      const numCards = await page.$$("coffee-card");
      expect(numCards.length).toBe(10);

    });

    
    // Edit all cards so that their names, price, location, and time append "edited"
    it("Adding 10 cards should populate the gallery with 10 cards ", async () => {
  
      // for each card, change the input field to [input]-edited
      // ex) name1 => name1-edited
      // then after saving a card's changes, check to make sure it was saved to local storage

    });


  });