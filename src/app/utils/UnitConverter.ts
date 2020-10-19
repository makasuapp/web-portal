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
  qtyToDisplay: (qty: number, unit: string | undefined) =>
    unit ? `${qty} ${unit}` : `${qty}`,
  // volumeWeightRatio is g / mL
  getVolumeWeightRatio: (gramsPerTbsp?: number) =>
    gramsPerTbsp && gramsPerTbsp / volumeUnits.tbsp.toML,
  // rounded since this is generally for display
  gramsPerTbsp: (volumeWeightRatio?: number) =>
    volumeWeightRatio &&
    Math.round(volumeWeightRatio * volumeUnits.tbsp.toML * 100) / 100,
  centsToDisplay: (cents: number | undefined) =>
    cents ? `$${(cents / 100.0).toFixed(2)}` : undefined,
  unitOptions: (units: (WeightUnit | VolumeUnit)[]) =>
    units.map((unit) => ({ value: unit.short, label: unit.long })),
  getVolume: (unit: string | undefined): VolumeUnit | undefined =>
    unit !== undefined ? volumeUnits[unit] : undefined,
  getWeight: (unit: string | undefined): WeightUnit | undefined =>
    unit !== undefined ? weightUnits[unit] : undefined,
  canConvert: (
    unitOne: string | undefined,
    unitTwo: string | undefined,
    volumeWeightRatio?: number | undefined
  ): boolean => {
    const oneIsV = UnitConverter.getVolume(unitOne) !== undefined
    const twoIsV = UnitConverter.getVolume(unitTwo) !== undefined
    const oneIsW = UnitConverter.getWeight(unitOne) !== undefined
    const twoIsW = UnitConverter.getWeight(unitTwo) !== undefined

    return (
      unitOne === unitTwo ||
      (oneIsV && twoIsV) ||
      (oneIsW && twoIsW) ||
      (((oneIsW && twoIsV) || (oneIsV && twoIsW)) &&
        volumeWeightRatio !== undefined)
    )
  },
  convert: (
    inputQty: number,
    inputUnit: string | undefined,
    outputUnit: string | undefined,
    volumeWeightRatio?: number | undefined
  ): number => {
    const err = `Can't convert between these units. input=${inputUnit}, output=${outputUnit}, volume_weight_ratio=${volumeWeightRatio}`
    if (inputUnit === outputUnit) {
      return inputQty
    }
    if (!UnitConverter.canConvert(inputUnit, outputUnit, volumeWeightRatio)) {
      throw err
    } else {
      const inputV = UnitConverter.getVolume(inputUnit)
      const outputV = UnitConverter.getVolume(outputUnit)
      const inputW = UnitConverter.getWeight(inputUnit)
      const outputW = UnitConverter.getWeight(outputUnit)

      if (inputV !== undefined && outputV !== undefined) {
        return inputQty * (inputV.toML / outputV.toML)
      }
      if (inputW !== undefined && outputW !== undefined) {
        return inputQty * (inputW.toG / outputW.toG)
      }
      if (volumeWeightRatio !== undefined) {
        if (inputV !== undefined && outputW !== undefined) {
          return inputQty * (inputV.toML / outputW.toG) * volumeWeightRatio
        }
        if (inputW !== undefined && outputV !== undefined) {
          return (inputQty * (inputW.toG / outputV.toML)) / volumeWeightRatio
        }
        throw err
      } else {
        throw err
      }
    }
  },
}

export default UnitConverter
