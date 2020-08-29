import React from 'react'
import { User, Kitchen, Organization } from 'app/models/user'
import styles from './SelectKitchen.module.css'

interface Props {
  user: User
  setKitchen: (kitchen: Kitchen) => void
}

const SelectKitchen = (props: Props) => {
  const uniqOrgs: {[key: number]: Organization} = {}
  props.user.organizations.forEach((org) => uniqOrgs[org.id] = org)

  if (Object.values(uniqOrgs).length === 0) {
    return <div>User is not part of any kitchens. Please make sure you're logged into the right account or have been given access.</div>
  } 

  //once we add permissions for only singular kitchens, will need to limit down the list
  return <div>
    <p>Select a Kitchen</p>
    {Object.values(uniqOrgs).map((org) => {
      return <>
        <h2>{org.name}</h2>
        {org.kitchens.map((kitchen) => {
          return <div 
            className={styles.kitchenCard}
            onClick={() => props.setKitchen(kitchen)}>
            {kitchen.name}
          </div>
        })}
      </>
    })}
  </div>
}

export default SelectKitchen