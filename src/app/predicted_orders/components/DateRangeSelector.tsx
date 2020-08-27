import React from 'react'
import DatePicker from 'react-datepicker'
import styles from './DateRangeSelector.module.css'

interface Props {
  startDate: Date
  endDate: Date
  onStartChange: (date: Date) => void
  onEndChange: (date: Date) => void
}

const DateRangeSelector = ({
  startDate, endDate, onStartChange, onEndChange
}: Props) => {
  return <div className={styles.range}>
    <span className={styles.text}>From</span>
    <DatePicker
      selected={startDate}
      onChange={onStartChange}
      selectsStart
      startDate={startDate}
      endDate={endDate}
    />
    <span className={styles.text}>To</span>
    <DatePicker
      selected={endDate}
      onChange={onEndChange}
      selectsEnd
      startDate={startDate}
      endDate={endDate}
      minDate={startDate}
    />
  </div>
}

export default DateRangeSelector