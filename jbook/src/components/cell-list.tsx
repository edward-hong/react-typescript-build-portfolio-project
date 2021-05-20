import { Fragment } from 'react'

import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import { useTypedSelector } from '../hooks/use-typed-selector'

const CellList: React.FC = () => {
  const cells = useTypedSelector((state) => {
    if (state.cells) {
      const { order, data } = state.cells
      return order.map((id) => data[id])
    }
  })

  const renderedCells = cells?.map((cell) => (
    <Fragment key={cell.id}>
      <CellListItem cell={cell} />
      <AddCell previousCellId={cell.id} />
    </Fragment>
  ))

  return (
    <div>
      <AddCell forceVisible={cells?.length === 0} previousCellId={null} />
      {renderedCells}
    </div>
  )
}

export default CellList
