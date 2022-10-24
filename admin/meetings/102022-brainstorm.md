# Meeting Minutes: Team 14/ProForce

## Date: 10/20/2022, 2:00PM - 2:00PM
## Location: Teleconference Meeting on Zoom
## Meeting Type: Brainstorm meeting

### Members Present
-----------------------
- William Kim
- Gnamitha Naganathanahalli
- Ruilin
- Antonio Anguiano
- Haonan He
- Ryan O'toole
- Zhaoyu Zheng
- Jose Salazar
- Sky Hung

# Brainstorm about ideas:
## Ruilin's Proposal: "An advanced shopping list. An excel sheet. It saves money"

Idea: 
A shopping list that keeps track of the user's pattern in the long run for personal shopping behavior analysis. If we know what we are buying frequently, we can save money by bulk buying the items. If we know we do not purchase something too frequently, we do not have to buy a ton of them. We can also plan out our shopping trips in the long run.

For each item, we are keeping track of:
1. Name (necessary)
2. corresponding dates purchased (necessary, automatically record when the user click button "purchased" but can be modified)
3. the amount purchased on the dates (optional)
4. Price of each purchase (optional)
5. Category (default ones are available, but users can add more)
6. Brand (not required, users can add them)
7. The location where things are bought (Optional, users can add frequent ones)
8. TBD

For each list, we are keeping track of:
1. Name of the list (necessary)
2. Items on the list (always necessary, even empty)
3. Other users that are sharing this list
4. TBD

The goal is to show the users, possibly in a monthly or quarterly summary, how often they are purchasing the items and what is the average amount they need for each shopping trip to purchase the item before the next run. In this case, they can save money on trips and not buy too much and waste the extra. 

Constraints satisfied:
CRUD pattern: users can create their shopping lists, access/read items on the list, edit the items, and archive/delete the list when items are purchased.
Local First: users can definitely store all the information locally. The cloud is for synchronizing between different devices.
Collaboration: users can share their list with friends to figure out their next shopping trip together.

Remarks from Ruilin: This is a really random idea I have. We need to research and see if there are existing products on the market that are already doing this job. Also, I am not sure that there is a need for this product on the market.

## William’s Proposal: Trip Planner

Idea: A vacation is just a day away but the hassle of planning expenses and activities can be a bummer. This app will allow individuals or groups of people to create easy to share and read documents of all the related information they need to make a trip fun!

Each document or plan should include:
1. Range of days intended for vacation 
2. A simple interactive UI that will allow users to create a chronological timeline of their plans. This would probably require some code to order elements based on their dates
3. To limit the complexity of documenting info, we can specify a few categories:
   1. Activity Name or Multiple Activities 
   2. Costs/Expenses
   3. Business hours of service or location
   4. The people joining such activity
   5. Additional notes for custom messages from user and collaborators 

4. To include social media management, we can allow users to share a custom screenshot (Most likely a pre-formatted template) of their vacation group to Instagram, twitter, etc.

Creating a plan for a day (this is specific but this is open to change)
1. User can select a button to add a blank document with the specified categories above
2. Once user or friends make their changes, they can save a reference to their timeline which is automatically ordered
   1. Each plan could be a simple block spanning from its start time to end time like webreg. 
   2. To access its contents in this view, probably a simple tooltip or just expand the element itself

3. What about dealing with overlaps of plans? Just like webreg, we could probably just stack elements to make this clear to the user
4. An uploaded plan will have the option for deletion from the timeline as well and the ability to change its contents with an edit tool i guess.

Cycling between days:
1. The timeline could be scrollable along either axis (idea subject to change)
2. This gives the user the ability to access their days in a smooth fashion





Also each user has a profile consisting of:
1. Their name
2. Email
3. Address (maybe)
4. List of friends (also a maybe)
5. Personal Score( for fun this is explained below)

Additional but unnecessary features:
- Users love visual feedback whenever they finish something. So every time they complete a plan, the app can probably give them a celebratory screen congratulating them. 
- Apersonal score to keep track of how many trips have been planned and how many people were involved combined into a single heuristic (It isn’t some super technical stat, it’s honestly for fun). 
- Integrate a link upload option so users can provide links to important websites in their plans as well






## Coffee Card Idea Meeting Notes
Defining the Problem to Solve
- People want to drink those beverages that they like, but they can be lost from time to time.
- It is difficult to keep track of a user's preference with physical coffee/drink cards.
- It is difficult to collaborate with others in coming up with the favorite drink for a crowd.
- It is difficult to be specific on the product we are rating for, naming can be tricky.
Proposed Solution - Our App
- We have to make it easier for people to parse (keep track, rate, etc. The product will present the information in a convenient/interesting way) their preferences for different types of coffee or other drinks.
- Information will be stored efficiently for easier access for the users.
- Provide guidance to people without extensive knowledge about coffee/drinks.
- Allow users to scan the barcode on the products and find the matching information. (Risk?)
