# geo-location
A CanJS component that produces live-bindable geolocation data.

[![npm version](https://badge.fury.io/js/geo-location.svg)](https://badge.fury.io/js/geo-location)

[![NPM](https://nodei.co/npm/geo-location.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/geo-location/)

## Installation
```
npm install geo-location --save
```

## Usage

Using CanJS's built-in support for StealJS, you can now import the module directly inside your templates:
```html
<can-import from="geo-location"/>

<!-- Retrieve the current location once. -->
<geo-location {^current-location}="currentLocation"></geo-location>

<!-- Continuously retrieve the current location. -->
<geo-location {^current-location}="currentLocation" watch></geo-location>

<!-- Get a live-updating list of locations. -->
<geo-location {^current-location}="currentLocation" watch
  {^locations}="locations">
</geo-location>
```

## Readable Attributes

- **current-location** - **required** - Gets the current location.  If the `watch` attribute is `true` it will do so continuously and push the location data into the `locations` list as it arrives.
- **watch** - a boolean value that, if enabled, causes the `currentLocation` attribute to continuously return location data. If set to false, it will cancel the current watch.  Watch can be bound to an attribute in a parent component to dynamically enable/disable the geolocation feed:
```
<geo-location {^current-location}="location"
  {^watch}="isWatchEnabled">
</geo-location>
```
- **locations** - A live-bindable list of all location objects in the order they arrived.
- **high-accuracy** - Set to true to enable high accuracy mode. It indicates that the application would like to receive the best possible results. If true and if the device is able to provide a more accurate position, it will do so. Note that this can result in slower response times or increased power consumption (with a GPS chip on a mobile device for example). On the other hand, if false, the device can take the liberty to save resources by responding more quickly and/or using less power. Default: false. See https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/enableHighAccuracy
- **timeout** - A positive number representing the maximum length of time (in milliseconds) the device is allowed to take in order to return a position. The default value is `Infinity`, meaning that getCurrentPosition() won't return until the position is available. See https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/timeout
- **maximum-age** - A positive number indicating the maximum age in milliseconds of a possible cached position that is acceptable to return. If set to 0, it means that the device cannot use a cached position and must attempt to retrieve the real current position. If set to Infinity the device must return a cached position regardless of its age. Default: 0. See https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/maximumAge

## Functions
- **startWatch** - This is a convenience function to enable watching from the template.
```
<a href="javascript://" {($click)}="startWatch">Start tracking your position</a>
```
- **stopWatch** - This is a convenience function to disable watching from the template.
```
<a href="javascript://" {($click)}="stopWatch">Stop tracking your position</a>
```

## Contributing
Pull requests are welcome. Analyze the code. See where it needs improvement, and let me know. Please, help make it better!

## Authors

- [Marshall Thompson](https://github.com/marshallswain)

[![Built with StealJS](./build-with-stealjs.jpg)](http://StealJS.com)
