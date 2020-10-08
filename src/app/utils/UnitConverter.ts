export interface WeightUnit {
  short: string
  long: string
  toG: number
}
const weightUnit = (short: string, long: string, toG: number): WeightUnit => ({
  short,
  long,
  toG,
})

export interface VolumeUnit {
  short: string
  long: string
  toML: number
}
const volumeUnit = (short: string, long: string, toML: number): VolumeUnit => ({
  short,
  long,
  toML,
})

export const weightUnits: { [key: string]: WeightUnit } = {
  oz: weightUnit('oz', 'ounce', 28.35),
  g: weightUnit('g', 'gram', 1),
  kg: weightUnit('kg', 'kilograms', 1000),
  lb: weightUnit('lb', 'pound', 453.6),
}

export const volumeUnits: { [key: string]: VolumeUnit } = {
  tsp: volumeUnit('tsp', 'teaspoon', 4.929),
  tbsp: volumeUnit('tbsp', 'tablespoon', 14.787),
  cup: volumeUnit('cup', 'cup', 237),
  mL: volumeUnit('mL', 'millilitre', 1),
  L: volumeUnit('L', 'litre', 1000),
  gal: volumeUnit('gal', 'gallon', 3785),
  qt: volumeUnit('qt', 'quart', 946),
}

export const allUnits = ([] as (VolumeUnit | WeightUnit)[])
  .concat(Object.values(weightUnits))
  .concat(Object.values(volumeUnits))

const UnitConverter = {
  // volumeWeightRatio is g / mL
  getVolumeWeightRatio: (gramsPerTbsp?: number) =>
    gramsPerTbsp && gramsPerTbsp / volumeUnits.tbsp.toML,
  // rounded since this is generally for display
  gramsPerTbsp: (volumeWeightRatio?: number) =>
    volumeWeightRatio &&
    Math.round(volumeWeightRatio * volumeUnits.tbsp.toML * 100) / 100,
  unitOptions: (units: (WeightUnit | VolumeUnit)[]) =>
    units.map((unit) => ({ value: unit.short, label: unit.long })),
}

export default UnitConverter
