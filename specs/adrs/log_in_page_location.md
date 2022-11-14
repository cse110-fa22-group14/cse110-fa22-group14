# Where should the log in/sign up page be?

## Context and Problem Statement

Do we need a specific page for the access/creation of the users' accounts, or do we embed that in the home screen?

## Considered Options

* Create an independent screen for log in and sign up
* Embed that into the home screen
* Both
* No log in information

## Decision Outcome

Chosen option: We previously chose the option of "Embed that into the home screen" This will be the easiest for the users to access without having to load a separate page. However, upon further consideration, we realized there is almost no reason to have log in information for users. Since the data of the users will be stored locally in the browser for their device, it is very unlikely that users will ever need to access their information across different devices. This also increases the technical complexity of our product. We decided to not include log in/sign up information as it would only provide a marginal benefit at best.
