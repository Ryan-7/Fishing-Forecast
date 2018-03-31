# Fishing-Forecast

A simple app using Yahoo's weather API to gather statistics relevant to fishing, most notably, the barometric pressure.

This app uses the Revealing Module Pattern with an Immediately Invoked Function Expression.
A good example of making use of a closure.
The function execution of the Immediately Invoked Function Expression has ended but we still have access to its variables through closure.
IIFE will create 'private' variables, won't interfere with the global namespace.
Common pattern with 3rd party libraries. 

The public method is: fishForecast.search();
