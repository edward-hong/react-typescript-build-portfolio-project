import { ChildAsFC } from './Child'

const Parent = () => {
  return (
    <ChildAsFC color="red" onClick={() => console.log('clicked')}>
      asdf
    </ChildAsFC>
  )
}

export default Parent
