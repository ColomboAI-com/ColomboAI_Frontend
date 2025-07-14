// __mocks__/heroiconsMock.js
import React from 'react';

// A generic mock for any Heroicon
const MockHeroicon = (props) => <svg {...props} />;

// Use a Proxy to catch any named import for an icon
// and return our generic mock component for it.
module.exports = new Proxy({}, {
  get: function (target, prop) {
    if (prop === '__esModule') {
      return false;
    }
    return MockHeroicon;
  },
});
