const NEGATIVE_ONE = -1;
const ZERO = 0;
const ONE = 1;

/**
 * 
 * @param {object} a the first card to be compared
 * @param {object} b the second card to be compared
 * @returns the result between a 3 way comparison of a and b
 * comparator function that gives priority to the card with the earliest date.
 * works by comparing the dates as strings which works because the date input field formats
 * responses as YYYY/MM/DD allowing for direct string comparison
 */
export function sortDate(a, b) {
        
    const dateA = a['time_purchased_date'];
    const dateB = b['time_purchased_date'];
    if (dateA < dateB) {
        return NEGATIVE_ONE;
    }
    if (dateA > dateB) {
        return ONE;
    }
    else{
        return ZERO;
    }
}

/**
 * 
 * @param {object} a the first card to be compared
 * @param {object} b the second card to be compared 
 * @returns the result of a 3 way camprison of a and b
 * comparator function that gives priority to the card with the higher price.
 */
export function sortPrice(a, b) {
    const priceA = parseFloat(a['float_drink_price']);
    const priceB = parseFloat(b['float_drink_price']);

    if (priceA < priceB) {
        return NEGATIVE_ONE;
    }
    if (priceA > priceB) {
        return ONE;
    }
    else{
        return ZERO;
    }
}

