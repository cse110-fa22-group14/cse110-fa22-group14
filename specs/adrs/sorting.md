# How should we implement the sorting function.

## Context and Problem Statement

We wish we could provide proper order of coffee cards to the users. However, we don't know which properties to consider.

## Considered Options

* Order by user preference (how much they like the coffee)
* Order by date and price

## Decision Outcome

Chosen option: "Order by date and price" Order by time is most important feature for a record tracking app, so beside the default ordering of date from new to old, we also wish to allow users to look at their oldest coffee cards. The reason we implement sorting by price is because we considered that sometimes users may choose coffee by price, so we offer this ordering to help them select coffee they want.