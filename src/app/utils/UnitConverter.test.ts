import UnitConverter from './UnitConverter'

test('getVolumeWeightRatio gets ratio from grams per tbsp', () => {
  const result = UnitConverter.getVolumeWeightRatio(20)
  expect(result).toEqual(1.3525393927098126)
})

test('convert with no units just returns qty', () => {
  expect(UnitConverter.convert(1.5)).toEqual(1.5)
})

test('convert of weight', () => {
  expect(UnitConverter.convert(12, 'oz', 'lb')).toEqual(0.75)
})

test('convert of volume', () => {
  expect(UnitConverter.convert(1.5, 'tbsp', 'tsp')).toEqual(4.5)
})

test('convert of volume to weight', () => {
  expect(UnitConverter.convert(2, 'gal', 'kg', 1.5)).toEqual(11.355)
})

test('convert of weight to volume', () => {
  expect(UnitConverter.convert(15, 'lb', 'L', 1.4)).toEqual(4.86)
})

test('canConvert=true when both undefined', () => {
  expect(UnitConverter.canConvert(undefined, undefined)).toBeTruthy()
})

test('canConvert=true when both not weight/volume', () => {
  expect(UnitConverter.canConvert('handful', 'handful')).toBeTruthy()
})

test("canConvert=false when one has units and other doesn't", () => {
  expect(!UnitConverter.canConvert('tbsp', undefined)).toBeTruthy()
  expect(!UnitConverter.canConvert(undefined, 'tbsp')).toBeTruthy()
})

test('canConvert=true when both volume or weight', () => {
  expect(UnitConverter.canConvert('tbsp', 'tsp')).toBeTruthy()
  expect(UnitConverter.canConvert('lb', 'kg')).toBeTruthy()
})

test('canConvert=false when not both volume/weight', () => {
  expect(!UnitConverter.canConvert('tbsp', 'kg')).toBeTruthy()
  expect(!UnitConverter.canConvert('handful', 'tbsp')).toBeTruthy()
})

test('canConvert=true when volume <-> weight volume_weight_ratio', () => {
  expect(UnitConverter.canConvert('tbsp', 'kg', 1.5)).toBeTruthy()
  expect(UnitConverter.canConvert('lb', 'tsp', 1.5)).toBeTruthy()
})
