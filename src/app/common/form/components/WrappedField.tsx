import React from 'react'
import classnames from 'classnames'
import styles from './Form.module.css'
import { FieldMetaProps } from 'formik'

export interface CustomClasses {
  input?: string
  inputWrapper?: string
  label?: string
  subtext?: string
  pretext?: string
  field?: string
}

export interface WrappedFieldProps {
  name: string
  isRequired?: boolean
  label?: string | React.ReactNode
  subtext?: string | React.ReactNode
  pretext?: string | React.ReactNode
  customclasses?: CustomClasses
}

export interface FormikMeta {
  meta: FieldMetaProps<any>
}

export class WrappedField<T> extends React.Component<
  WrappedFieldProps & FormikMeta
> {
  render() {
    const {
      name,
      label,
      subtext,
      pretext,
      isRequired,
      customclasses = {},
      meta,
      children,
    } = this.props

    let top
    if (label !== undefined) {
      top = (
        <label htmlFor={name} className={customclasses.label}>
          {label}
          {isRequired && <span className={styles.required}>*</span>}
          {subtext ? (
            <div className={classnames(styles.subtext, customclasses.subtext)}>
              {subtext}
            </div>
          ) : null}
        </label>
      )
    } else if (isRequired) {
      top = <span className={styles.required}>*</span>
    }

    return (
      <div className={classnames(styles.field, customclasses.field)}>
        {top}
        {meta.touched && meta.error && (
          <div className={styles.error}>{meta.error}</div>
        )}
        <div className={classnames(styles.input, customclasses.inputWrapper)}>
          {pretext ? (
            <span className={customclasses.pretext}>{pretext}</span>
          ) : null}
          {children}
        </div>
      </div>
    )
  }
}
