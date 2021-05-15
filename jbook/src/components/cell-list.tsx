import CellListItem from './cell-list-item'
import AddCell from './add-cell'
import { useTypedSelector } from '../hooks/use-typed-selector'

const CellList: React.FC = () => {
  const cells = useTypedSelector(state => {
    if (state.cells) {
      const { order, data } = state.cells
      return order.map(id => data[id])
    }
  })

  const renderedCells = cells?.map(cell => (
    <>
      <AddCell nextCellId={cell.id} />
      <CellListItem key={cell.id} cell={cell} />
    </>
  ))

  return (
    <div>
      {renderedCells}
      <AddCell nextCellId={null} />
    </div>
  )
}

export default CellList
