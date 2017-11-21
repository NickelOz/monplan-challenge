## Design 1 - Divided Screen
This design focused around splitting the UI into a search section and a result sections. It was abandoned because I couldn't figure out how to adapt it to a mobile-friendly form, without making any single component too small or forcing the user to perform copius amounts of navigation.

#### Pros
  - Users can 'queue' up multiple units in the right container, allowing them to compare multiple units at the same time for comparison, or to quickly check pre-reqs or prohibitions.

#### Cons
  - It would be challenging to divide the UI into two sections without making it feel cluttered.
  - This design does not scale particularly well to mobile screens, but the search and results section could stack on top of the unit information. Users could search a term, select a result, and swipe down to find the unit details. However, a lot of scrolling would be needed to go back and forth between the search bar and the unit information, as well as change between multiple units.

#### Conclusion
This design is difficult to fit to a smaller mobile screen. Being able to view multiple units simulatenous could prove useful for other projects, such as a course planner *(wink, wink)*

![The splitscreen design, with the search area on one side and the units on the other](https://github.com/NickelOz/monplan-challenge/blob/master/designs/images/splitscreen.jpg)

## Design 2 - Vertical Flow
This was the layout I favoured more, where the more spacious, centred layout. This would allow for the search results, and then the unit details to flow down the page. This is also much easier to scale for mobile devices, by fitting it to portrait mode.

#### Pros
  - No drastic design changes needed to scale for mobile interfaces, simply fit the container to the screen

#### Cons
  - Scrolling is still quite necessary, *perhaps the search results could collapse once a unit is chosen?*

#### Conclusion
This was the design I went with in the end, as I figured the compromise between constantly displaying static search results making them disappear was to have it collapse. If the user began searching for a new unit, this could then expand to display once again.

![The various sections of the app aligned to flow down the page](https://github.com/NickelOz/monplan-challenge/blob/master/designs/images/downflow.jpg)

## Design 3 - Interchanging Search Results and Unit Information
This focused more around trying to hide/obscure unused elements. For example, when a user is entering search terms, they would only see the search results, and the current unit information would disappear. Once they selected a unit, the search results would collapse/disappear to bring up the unit information. I figured that this would be too drastic a change for users to adapt too, so it was dropped.

#### Pros
  - Minimal navigations, only components relevant to their current action are present
  - Much easier to compress to a mobile screen

#### Cons
  - It can be disconcerting to have elements of the page disappearing. Users might be too easily confused 

#### Conclusion
This was similar to the second design, but better handled displaying search results and unit information within the same space for smaller screen. This was compromised by having the search results collapse when needed.

![The search bar has been moved to the top, and the search results and unit information now interchange depending on the use case](https://github.com/NickelOz/monplan-challenge/blob/master/designs/images/hidden.jpg)


## Displaying Unit Information

![The basic layout of a unit's information](https://github.com/NickelOz/monplan-challenge/blob/master/designs/images/unit.jpg)

Put the main information first (code, name, description, faculty/campus). This is likely the primary information a user will seek out, so it makes sense to have it be presented first.

Below this the student feedback can be displayed giving an 'audience impression' of the unit.

Lastly comes any further requirements and any other information, such as pre-reqs and prohibitions. While this is currently a block of text, a useful approach could be to scan for unit codes with regex (AAA0001).

For example,

```One of FIT1008, FIT1015, FIT2085 or CSE1303 and 6 points of Level 1 mathematics.```

would become

```One of [FIT1008], [FIT1015], [FIT2085] or [CSE1303] and 6 points of Level 1 mathematics.```

These could then load their respective units when clicked on.

Further information could also be put in (misc details like number of points)