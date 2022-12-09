# Meeting Minutes: Team 14/ProForce

## Date: 10/16/2022, 4:00PM - 5:00PM
## Location: 3rd Floor of CSE Building
## Meeting Type: Sprint Review Meeting

### Members Present
-----------------------
- Jose Salazar
- Zhaoyu Zhang
- Haonan He
- William Kim
- Ryan O'toole
- Antonio Anguiano
- Sky Hung
- Ruilin Hu
- Yuang Cui

### Previous Business
-----------------------
No previous business


### Agenda and Meeting Notes
-----------------------
- Jose Salazar
  - Welcome and Greeting everyone at meeting
  - Progress Updates
    - Frontend team showed the progress they had made with the gallery view and the pop-up window
      - Took the time to explain the fields that are on the coffee card, and the way you select a value for each field (e.g. checkbox, slider, text field)
    - Backend talked about the research they did with sharing/exports and looking into automating testing
  - Define and outline the goals and tasks that frontend and backend teams have for this week
    - Frontend will complete the web component, and continue working on the structure of the page
    - Backend will work on filter, sort, help button, all the features listed in their backend meeting notes
      - Note: Adding and editing existing coffee cards is actually a front end responsibility, not a backend responsibility
  - Next Steps: What does backend need from frontend?
    - Backend needs frontend to have a consistent naming scheme for their elements, so that they can use these html IDs in their code
  - Reminders
    - Backend team meeting will happen tomorrow (Tuesday) at 7:30PM



### Decisions Made
-----------------------
- The naming scheme for the elements in the web component.
  - Items to store in the each card in the data that is visible:
        str_drink_name

        int_drink_price
        
        time_purchase_date
        
        str_purcahse_location
        
        img_drink_image
        
        bool_check_chocolate
        
        bool_check_caramel
        
        bool_check_nutty
        
        bool_check_fruity
        
        int_slide_acidity
        
        int_slide_sweetness
        
        int_slide_bitterness
        
        int_slide_saltiness
        
        select_drink_type
        
        select_brew_style
        
        int_slide_color
        
        str_notes
        
        Item to store for each card that is not visible:
        str_creator
        
        time_creation_time
        
        time_modified_time

### Agenda Items to cover Next Meeting
-----------------------
No other items to discuss


### Adjournment
-----------------------
Meeting adjourned at 4:53PM