import React from 'react'
import { Form } from 'formik'
import styles from './Form.module.css'

const FormikForm = ({ children }) => (
  <Form className={styles.form}>{children}</Form>
)

export default FormikForm
