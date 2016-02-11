import can from 'can/';
import 'can/map/define/';

let VM = can.Map.extend({
  define: {
    /**
     * A list of locations.
     */
    locations: {
      value: []
    },

    /**
     * An async getter that returns the current location. If `watch` is also
     * enabled, it will update continuously based on the `options`. The location
     * data is pushed into the `locations` list as it arrives. If `watch` is
     * set to `false` it will stop the watch and only retrieve one more location.
     */
    currentLocation: {
      get(val, setVal){
        let options = {
          highAccuracy: this.attr('highAccuracy'),
          timeout: this.attr('timeout'),
          maximumAge: this.attr('maximumAge')
        };
        let self = this;

        function success(pos) {
          self.attr('locations').push(pos);
          setVal(pos);
        }

        function error(err) {
          console.warn('ERROR(' + err.code + '): ' + err.message);
        }

        if (this.attr('watch')) {
          id = navigator.geolocation.watchPosition(success, error, options);
          this.attr('watchId', id);
        } else {
          navigator.geolocation.getCurrentPosition(success, error, options);
        }
      }
    },

    /**
     * `watch` is a boolean value that, if enabled, causes the `currentLocation`
     * attribute to continuously return location data. If set to false, it will
     * cancel the current watch.
     */
    watch: {
      set(val){
        if (val === '' || val && val !== undefined) {
          val = true;
        } else {
          navigator.geolocation.clearWatch(this.attr('watchId'));
        }
        return val;
      }
    },

    /**
     * This is the id of the current watch. If it
     */
    watchId: {
      value: null
    },

    /**
     * Is a Boolean that indicates the application would like to receive the
     * best possible results. If true and if the device is able to provide a
     * more accurate position, it will do so. Note that this can result in
     * slower response times or increased power consumption (with a GPS chip
     * on a mobile device for example). On the other hand, if false, the device
     * can take the liberty to save resources by responding more quickly and/or
     * using less power. Default: false.
     * https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/enableHighAccuracy
     */
    highAccuracy: {
      value: false,
      type: 'boolean'
    },

    /**
     * Is a positive long value representing the maximum length of time
     * (in milliseconds) the device is allowed to take in order to return a
     * position. The default value is `Infinity`, meaning that getCurrentPosition()
     * won't return until the position is available.
     * https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/timeout
     */
    timeout: {
      value: Infinity,
      type: 'number'
    },

    /**
     * Is a positive long value indicating the maximum age in milliseconds of a
     * possible cached position that is acceptable to return. If set to 0, it
     * means that the device cannot use a cached position and must attempt to
     * retrieve the real current position. If set to Infinity the device must
     * return a cached position regardless of its age. Default: 0.
     * https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions/maximumAge
     */
    maximumAge: {
      value: 0,
      type: 'number'
    }
  },

  /**
   * This is a convenience function to enable watching from the template.
   */
  startWatch(){
    this.attr('watch', true);
  },

  /**
  * This is a convenience function to disable watching from the template.
  */
  stopWatch(){
    this.attr('watch', false);
  }
});

export default VM;
