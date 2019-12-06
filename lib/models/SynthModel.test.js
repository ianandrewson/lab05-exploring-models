const Synth = require('./SynthModel');

describe('SynthModel tests', () => {
  it('should have a manufacturer', () => {
    const synth = new Synth({});
    const { errors } = synth.validateSync();
    expect(errors.manufacturer.message).toEqual('Path `manufacturer` is required.');
  });
  it('should have at least one amp', () => {
    const synth = new Synth({
      manufacturer: 'Roland',
      amps: 0
    });
    const { errors } = synth.validateSync();
    expect(errors.amps.message).toEqual('Path `amps` (0) is less than minimum required value (1).');
  });
  it('should have a valid filter', () => {
    const synth = new Synth({
      manufacturer: 'DSI',
      amps: 2,
      filters: 'midpass'
    });
    const errors = synth.validateSync();
    expect(errors.filters.message).toEqual('something about enum');
  });
  it('should have at least one oscillator', () => {
    const synth = new Synth({
      manufacturer: 'Korg',
      filters: 'lowpass',
      amps: 6,
      oscillators: 4
    });
    const errors = synth.validateSync();
    expect(errors).toBeUndefined();
  });
});

