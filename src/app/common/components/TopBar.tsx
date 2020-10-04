import React, { ReactNode } from 'react'
import styles from './TopBar.module.css'

interface Props {
  items?: ReactNode[]
}

const TopBar = ({ items }: Props) => {
  return <div className={styles.topBar}>{items}</div>
}

export default TopBar
