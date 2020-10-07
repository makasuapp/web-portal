import React from 'react'
import classnames from 'classnames'
import { FaPlus } from 'react-icons/fa'
import styles from './Form.module.css'

interface Props {
  onClick: () => void
  text: string
}

const AddItemButton = ({ onClick, text }: Props) => (
  <span
    className={classnames('btn btn-secondary', styles.add)}
    onClick={onClick}>
    <FaPlus /> {text}
  </span>
)

export default AddItemButton
