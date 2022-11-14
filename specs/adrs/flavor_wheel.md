# How should we implement the flavor wheel?

## Context and Problem Statement

Flavor wheel looks like an interesting item that the users might be interested in interacting with. How should it be implemented in our product?

## Considered Options

* Checkoxes for the users to choose from
* Use the original wheel shape
* Have a slider for each individual flavor indicating the degree/intensity of the flavor

## Decision Outcome

Chosen option: We chose to have a sliders for certain key flavors (salty, sweet, acidic, bitter), as it is the visually appealing yet does not have the complexity of the flavor wheel to implement. For flavors that are not as common in coffee (chocolately, caramel, fruity, nutty), we chose to have boxes indicating whether the coffee does or does not have the flavor. From the perspective of the users, if the coffee they drink doesn't generally have caramel or fruity tastes, it might be overwhelming to have to rate how fruity it is. Checkboxes make this experience easier for users.
