/**
 * This script is used to complete Unit tests to functions
 * Use global [function name] to declare functions and suppress ESLint warnings
 * Use const sum = require('../code-to-unit-test/sum.js'); to link to file
 */

/* global test, expect */
const sortFunctions = require('../scripts/sortFunctions.js')

// Dummy test to suppress warning
test('adds 1 + 2 to equal 3', () => {
    const operand1 = 1;
    const operand2 = 2;
    const expected = 3;
    expect(operand1 + operand2).toBe(expected);
});

// Test sortPrice function
test('sort coffee cards by ascending price', () => {
    const coffeeCardObject1 = {
        "str_drink_name": "chestnut latte",
        "float_drink_price": "12.5",
        "time_purchase_date": "2022-12-14",
        "str_purchase_location": "Starbucks",
        "img_drink_image": 3,
        "int_slide_acidity": "0",
        "int_slide_sweetness": "0",
        "int_slide_bitterness":"0",
        "int_slide_saltiness": "0",
        "str_drink_type": "Latte",
        "str_brew_style": "Drip",
        "int_dropdown_color":"Light",
        "str_notes": "asdf"
    } 
    const coffeeCardObject2 = {
        "str_drink_name": "Mocha",
        "float_drink_price": "5.21",
        "time_purchase_date": "2022-12-14",
        "str_purchase_location": "Starbucks",
        "img_drink_image": 3,
        "int_slide_acidity": "0",
        "int_slide_sweetness": "0",
        "int_slide_bitterness":"0",
        "int_slide_saltiness": "0",
        "str_drink_type": "Latte",
        "str_brew_style": "Drip",
        "int_dropdown_color":"Light",
        "str_notes": "asdf"
    } 
    const coffeeCardObject3 = {
        "str_drink_name": "Frappucino",
        "float_drink_price": "10.0",
        "time_purchase_date": "2022-12-14",
        "str_purchase_location": "Starbucks",
        "img_drink_image": 3,
        "int_slide_acidity": "0",
        "int_slide_sweetness": "0",
        "int_slide_bitterness":"0",
        "int_slide_saltiness": "0",
        "str_drink_type": "Latte",
        "str_brew_style": "Drip",
        "int_dropdown_color":"Light",
        "str_notes": "asdf"
    } 

    const d = new Date()
    coffeeCardObject1["time_creation_time"] = d.toLocaleTimeString();
    coffeeCardObject2["time_creation_time"] = d.toLocaleTimeString();
    coffeeCardObject3["time_creation_time"] = d.toLocaleTimeString();

    let coffeeCards = [coffeeCardObject1, coffeeCardObject2, coffeeCardObject3];

    const id0 = 0;
    const id1 = 1;
    const id2 = 2;
    coffeeCards.sort(sortFunctions.sortPrice);
    expect(coffeeCards[id0]["float_drink_price"]).toBe("5.21");
    expect(coffeeCards[id1]["float_drink_price"]).toBe("10.0");
    expect(coffeeCards[id2]["float_drink_price"]).toBe("12.5");

})