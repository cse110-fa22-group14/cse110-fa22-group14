describe("Basic user flow for Website", () => {
    // First, visit the lab 8 website
    beforeAll(async () => {
      await page.goto('http://127.0.0.1:5501/source/'); 
    });


    // NOTE: The name and implementation of these tests are open to change. 
    // Feel free to change anything. This is all just to get some basic code down
    // But we should be thinking about testing for performance of our app 




    // Check to make sure that adding 10 cards to the page will create 10 cards
    it("Adding 10 cards should populate the gallery with 10 cards ", async () => {
  
      // In a for loop click on the add button, provide input, and save
      // Then check the gallery to make sure there are 10 cards

    });

    
    // Edit all cards so that their names, price, location, and time append "edited"
    it("Adding 10 cards should populate the gallery with 10 cards ", async () => {
  
      // for each card, change the input field to [input]-edited
      // ex) name1 => name1-edited
      // then after saving a card's changes, check to make sure it was saved to local storage

    });


  });