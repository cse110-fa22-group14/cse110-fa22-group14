# Meeting Minutes: Team 14/ProForce

## Date: 11/14/2022, 4:00PM - 4:30PM
## Location: Hybrid - 3rd Floor Lounge of CSE Building and Zoom
## Meeting Type: Sprint Review Meeting

### Members Present
-----------------------
- Jose Salazar
- Zhaoyu Zhang
- Ruilin Hu
- William Kim
- Gnamitha Naganathanahalli
- Antonio Anguiano
- Sky Hung
- Ryan O'toole
- Haonan He


### Previous Business
-----------------------
No unresolved topics from last time

### Agenda and Meeting Notes
-----------------------
- Round of Updates
  - Jose Salazar worked on the edit button functionality of the coffee cards. He spent some time working on it before running into a roadblock with a bug, where the first coffee card that was updated would be the only one to update, even if the user tried to edit other coffee cards. It almost worked except for that bug, and Jose and William spent some time trying to fix the bug to no avail. 
  - Henry spent his time working on the delete button functionality and stopped when it came time to place the delete icon on the coffee card. Henry asked for clarification on where the delete icon should be placed on the coffee card
  - Ryan worked on homework/studying for other classes, so he did not get the time to work on the project
  - Gnamitha had a personal emergency come up last week, so she could not contribute to the project. 
  - Sky did some research on how to share/export with HTML/CSS/JavaScript, but was lost and didn't know what to do for the project or what he was supposed to do. 
  - Antonio spent his time implementing dark mode, however he stopped working on it. He wanted to change three different elements on the css file to a different darker color, but did not know if the different elements were all supposed to be the same color, or if they were supposed to be different. Antonio was stuck as he couldn't figure out if there were reasons why the html elements were set to the colors that they were and whether they should be changed. In addition, he spent time thinking about different ways to fix the coffee card page and design it, as he pointed out the graphical bugs that result due to using a flex box. He also spent some time thinking about the share/export feature
  - Zhaoyu (along with Ruilin) worked on the Add Card functionality and also worked on saving the data from the coffee data into a web component for the coffee card. 
  - Ruilin worked on the saving the data from the coffee data (a form) into the web component for the coffee card. She also worked on switching images functionality representing each coffee. For each coffee card, you can choose an icon to represent each coffee using left and right arrow icons (similar to choosing the next or previous images from a photo gallery). In addition, she spent time researching the different tools and software that could be used to test our code (i.e. Jest vs Cypress)
  - William spent his time developing the yml file ESLint checker and setting up the initial part of our group's CI/CD pipeline and fixed some bugs relating to our coffee cards not being saved to local storage and the slider values for the flavors not updating in the coffee card. 

### Decisions Made
-----------------------
- We will not be sharing/exporting jpg files. Instead, we will be importing and exporting JSON files containing the data for a coffee card. This change was made since having to convert JSON data to a jpg was going to be too technically complex to where we would not be able to implement it. Instead, we can import JSON files using a file upload feature and export them out, while still remaining in the scope of our project and meeting all of our specifications for the project


### Agenda Items to cover Next Meeting
-----------------------
We need to discuss the next steps on what issues people should be working on for this next week

### Adjournment
-----------------------
Meeting adjourned at 4:28 PM