import { useTypedSelector } from '../hooks/use-typed-selector'

const CellList: React.FC = () => {
  useTypedSelector(state => {
    if (state.cells) {
      const { order, data } = state.cells
      return order.map(id => data[id])
    }
  })

  return <div>Cell List</div>
}

export default CellList
