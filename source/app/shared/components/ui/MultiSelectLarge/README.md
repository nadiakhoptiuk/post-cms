# Multi Select integrated with RVF. Working with large data (has options limit)

Additionally, it allows to search values.

## Props:

Use the _visibleOptionsLimit_ prop to only render limit count of options at a time in a data set of up to 100,000 options. _By default it set to 'all'_, so allows to displaying all options.

You can set dropdown maximum height using _maxHeight_ prop.

This select accepts props _hideActiveOptions_, which is _true by default_. It hide selected options from the list of option.

Prop _creatable?: boolean;_ is optional and, when set to true, allows creating new options in the list if no matches are found. It is set to true by default.
