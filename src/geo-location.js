import can from 'can/';
import 'can/map/define/';
import viewModel from './view-model';
import './styles.less!';

/**
 * The geo-location component is a UI-less component that create live-bindable
 * geolocation data.
 */
can.Component.extend({
  tag:'file-uploadlet',
  viewModel
});
