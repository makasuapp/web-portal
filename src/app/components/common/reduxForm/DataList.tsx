import React, { ReactNode } from 'react'

import { ResourceRecord } from 'app/resources/ResourceHelper'

interface Props {
  data?: ResourceRecord[]
  children: (datum: ResourceRecord) => ReactNode
}
const DataList = ({ data = [], children }: Props) => {
  return <div>{data.map((datum) => children(datum))}</div>
}

export default DataList
