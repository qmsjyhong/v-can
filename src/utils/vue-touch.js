import Hammer from 'hammerjs';
var gestures = ['tap', 'pan', 'pinch', 'press', 'rotate', 'swipe'];
var directions = {
  tap: ['tap'],
  swipe: ['swipeleft', 'swiperight', 'swipeup', 'swipedown'],
  pan: ['panstart', 'panmove', 'panend', 'pancancel', 'panleft', 'panright', 'panup', 'pandown'],
  pinch: ['pinchstart', 'pinchmove', 'pinchend', 'pinchcancel', 'pinchin', 'pinchout'],
  press: ['press', 'pressup'],
  rotate: ['rotatestart', 'rotatemove', 'rotateend', 'rotatecancel']
};

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const touchs = {
  config: function(config) {
    if (config == null) {
      return;
    }
    if (config.gestures && config.gestures instanceof Array) {
      gestures = config.gestures;
    }
    if (config.directions && config.directions instanceof Array) {
      for (let k in config.directions) {
        directions[k] = config.directions[k];
      }
    }
  },
  bind: function(el, binding) {
    let handler = null;
    let evtType = '';
    let evt = new Hammer.Manager(el);
    let type = (evtType = binding.arg.toLowerCase());
    let index = -1;
    gestures.findIndex(function(gst, idx) {
      if (gst === type) {
        index = idx;
      }
    });
    if (index < 0) {
      return;
    }
    if (typeof binding.value !== 'function') {
      handler = null;
      return;
    }
    evt.add(new Hammer[(capitalize(type))]());
    // bind function
    let evtsArray = directions[evtType];

    if (handler) {
      evtsArray.forEach(function(et) {
        evt.off(et, function(e) {
          handler(et, e);
        });
      });
    }
    if (typeof binding.value === 'function') {
      handler = binding.value;

      evtsArray.forEach(function(et) {
        evt.on(et, function(e) {
          handler(et, e, evt);
        });
      });
    }
  }
};
export default touchs;
