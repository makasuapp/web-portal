import { Ingredient } from 'app/models/ingredient'
import { Vendor } from 'app/models/vendor'
import { IngredientResource } from 'app/resources/IngredientResource'
import UnitConverter from 'app/utils/UnitConverter'
import React from 'react'
import { Link } from 'react-router-dom'
import styles from './IngredientCard.module.css'

interface Props {
  vendorsMap: { [key: number]: Vendor }
  ingredient: Ingredient
}

const IngredientCard = ({ vendorsMap, ingredient }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>{ingredient.name}</div>
      {ingredient.volume_weight_ratio && (
        <div>
          Grams per Tbsp:{' '}
          {UnitConverter.gramsPerTbsp(ingredient.volume_weight_ratio)}
        </div>
      )}
      {ingredient.default_vendor_id && (
        <div>
          Default Vendor: {vendorsMap[ingredient.default_vendor_id].name}
        </div>
      )}
      <Link
        key="edit"
        to={IngredientResource.editPath(ingredient.id)}
        className="btn btn-primary">
        Edit Ingredient
      </Link>
    </div>
  )
}

export default IngredientCard
