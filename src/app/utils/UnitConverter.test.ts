import UnitConverter from './UnitConverter'

test('getVolumeWeightRatio gets ratio from grams per tbsp', () => {
  const result = UnitConverter.getVolumeWeightRatio(20)
  expect(result).toEqual(1.3525393927098126)
})
