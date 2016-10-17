const raw = require('../../lib/parsers/raw');

describe('raw parser', () => {
  it('returns raw data', () => {
    expect(raw('data')).toEqual('data');
  });
});
