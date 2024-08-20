import { useState } from 'react'
import { Button } from "@/components/ui/button"


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Button variant="ghost">Button</Button>

    </>
  )
}

export default App
