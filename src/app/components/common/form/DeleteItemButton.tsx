import React from 'react'
import classnames from 'classnames'
import { FaTrashAlt } from 'react-icons/fa'
import styles from './Form.module.css'

interface Props {
  onClick: () => void
}

const DeleteItemButton = ({ onClick }: Props) => (
  <div className={styles.trashContainer}>
    <span
      className={classnames('btn btn-danger', styles.trash)}
      onClick={onClick}>
      <FaTrashAlt />
    </span>
  </div>
)

export default DeleteItemButton
