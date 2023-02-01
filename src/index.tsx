import { Dish } from 'constants/types'
import { createRoot } from 'react-dom/client'
import 'tailwindcss/tailwind.css'
import App from './App'
import jsonData from './data/dishes.json'

const container = document.getElementById('root') as HTMLDivElement
const root = createRoot(container)

root.render(<App dishes={jsonData.dishes as Array<Dish>} />)
