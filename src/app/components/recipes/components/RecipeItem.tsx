import React from 'react'
import { Link } from 'react-router-dom'
import { Recipe } from 'app/models/recipe'
import { RecipeResource } from '../../../resources/RecipeResource'
import styles from './RecipeItem.module.css'

interface Props {
  recipe: Recipe
}

const RecipeItem = ({ recipe }: Props) => {
  return (
    <div className={styles.card}>
      <div>{recipe.name}</div>
      <div className={styles.links}>
        <Link
          to={RecipeResource.editPath(recipe.id)}
          className="btn btn-warning">
          Edit Recipe
        </Link>
        <Link
          to={RecipeResource.showPath(recipe.id)}
          className="btn btn-primary">
          View Recipe
        </Link>
      </div>
    </div>
  )
}

export default RecipeItem
