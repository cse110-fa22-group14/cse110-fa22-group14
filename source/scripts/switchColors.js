
// Execute init when the contents in the window fully loaded
window.addEventListener('DOMContentLoaded', init);


/**
 * This function will adjust the app's color theme
 * user's control.
 * @param cards - html collection of <coffee-cards>
 * @param str_theme_name
 * @return void
 */
function switch_theme(cards, str_theme_name) {
    console.log("switchColors.js received cards:" + cards);
    console.log("swithcColors.js received:" + str_theme_name)

    if (!cards) {
        return;
    }

    let cardBackground, 
        cardText, 
        cardIcon,
        pageBackground,
        navbar,
        navButtons;

    // set the variables according to the theme chosen
    switch(str_theme_name) {
        case "dark":
            console.log("theme is dark")
            cardBackground = "#646F77";
            cardText = "#FFFFFF";
            pageBackground = "#000000";
            navbar = "#666B5E";
            navButtons = "#000000";
        break;

    }

    // set the colors of the elements on page 
    let nav = document.querySelector("header");
    console.log(nav)
    nav.style.background = navbar;


    // change all gallery elements to same color
    document.getElementById("add_card").style.background = cardBackground;
    document.querySelector("body").style.background = pageBackground;

    for (let i = 0; i < cards.length; i++) {
        console.log("setting colors for card" + i)
        cards[i].color = {
            "background": cardBackground, 
            "text": cardText
        };
    }

    
}


 // Initialize things when the window loads
function init(){

    switch_theme({},"default");
}

