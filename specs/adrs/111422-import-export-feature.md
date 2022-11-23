# How will our users share and view coffee cards made by others?

## Context and Problem Statement

Users may want to share the coffee cards they have made with other users or devices, so there should be a means for them to export their previously created coffee card. 
Similarly, users may want to view coffee cards by other people, so there should be a means for them to import a previously created coffee card

## Considered Options

* Integrate social media access into our app to allow import/export of the coffee cards
* Import and Export Coffee Card information as a JPG or PNG file
* Import and Export Coffee Card information as a PDF file
* Import and Export Coffee Card information as a JSON file

## Decision Outcome

Chosen option: We previously decided that we would import and export coffee card information as an image file of some sort, so that users could directly upload the file to instagram. However, this quickly proved to be a technically demanding feature to implement. In the interest of our appetite, we decided to import and export coffee card information as a JSON file. The share button on a coffee card should generate a JSON file containing the information of the coffee card, and there is an import button that users can upload a JSON file to create a new coffee card.
