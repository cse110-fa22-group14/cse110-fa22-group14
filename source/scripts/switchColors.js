
// Execute init when the contents in the window fully loaded
window.addEventListener('DOMContentLoaded', init);


/**
 * This function will adjust the app's color theme
 * 
 * @param cards - html collection of <coffee-cards>
 * @param str_theme_name
 * @return void
 */
function switch_theme(cards, str_theme_name) {

    if (!cards) {
        return;
    }

    // Define color variables
    let cardBackground, 
        cardText, 
        pageBackground,
        navBarBackground,
        navTitleText,
        navButtonsBackground,
        navButtonsText;

    // set the color variables according to the chosen theme 
    switch(str_theme_name) {

        case "dark":
            cardBackground = "#646F77";
            cardText = "#FFFFFF";
            pageBackground = "#000000";
            navBarBackground = "#949999";
            navButtonsBackground = "#1a1a1a";
            navButtonsText = "#FFFFFF",
            navTitleText = "#FFFFFF"
        break;

        case "vibrant":
            cardBackground = "#f2ba1d";
            cardText = "#000000";
            pageBackground = "#fffcee";
            navBarBackground ="#c45335";
            navButtonsBackground = "#fffcee";
            navButtonsText = "#000000";
            navTitleText = "#FFFFFF"
        break;

        default:
            cardBackground = "#7d6b57";
            cardText = "#FFFFFF";
            pageBackground = "#FFFFFF";
            navBarBackground ="#879e82";
            navButtonsBackground = "#262f2d";
            navButtonsText = "#FFFFFF";
        break;
    }

    // Set the colors of the nav bar elements
    document.querySelector("header").style.background = navBarBackground;
    document.querySelector("h1").style.color = navTitleText;
    
    document.getElementById("select_file").style.background = navButtonsBackground;
    document.getElementById("select_file").style.color = navButtonsText;

    document.querySelectorAll(".dropdown").forEach(button => {
        button.style.background = navButtonsBackground;
        button.style.color = navButtonsText;
    })

    // Set background color of card and page
    document.getElementById("add_card").style.background = cardBackground;
    document.querySelector("body").style.background = pageBackground;

    // Change all gallery elements to same color scheme
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

