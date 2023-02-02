import {
  render,
  screen,
  fireEvent,
  queryByText,
  getByText
} from '@testing-library/react'
import { Dish } from 'constants/types'

import App from './App'

const mockDishes = [
  {
    id: 1,
    name: 'food1',
    restaurant: 'r1',
    availableMeals: ['breakfast', 'lunch', 'dinner']
  },
  {
    id: 2,
    name: 'food2',
    restaurant: 'r1',
    availableMeals: ['breakfast', 'lunch', 'dinner']
  },
  {
    id: 3,
    name: 'food3',
    restaurant: 'r1',
    availableMeals: ['breakfast', 'lunch', 'dinner']
  },
  {
    id: 4,
    name: 'food4',
    restaurant: 'r-breakfast',
    availableMeals: ['breakfast']
  },
  {
    id: 5,
    name: 'food5',
    restaurant: 'r-breakfast',
    availableMeals: ['breakfast']
  },
  {
    id: 6,
    name: 'food6',
    restaurant: 'r-lunch',
    availableMeals: ['lunch']
  }
]

describe('Food Order Form - step 1 - meal', () => {
  it('should render all the steps', () => {
    render(<App dishes={[]} />)
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Step 3')).toBeInTheDocument()
    expect(screen.getByText('Review')).toBeInTheDocument()
  })

  it('should highlight the first step at initial screen', () => {
    render(<App dishes={[]} />)
    expect(screen.getByText('Step 1').getAttribute('data-active')).toBe('true')
    expect(screen.getByText('Step 2').getAttribute('data-active')).toBe('false')
    expect(screen.getByText('Step 3').getAttribute('data-active')).toBe('false')
    expect(screen.getByText('Review').getAttribute('data-active')).toBe('false')
  })

  it('should have three options for meal', () => {
    const { container } = render(<App dishes={[]} />)
    fireEvent.click(container.querySelector('#meal-select') as Element)
    expect(screen.getByText('breakfast')).toBeInTheDocument()
    expect(screen.getByText('lunch')).toBeInTheDocument()
    expect(screen.getByText('dinner')).toBeInTheDocument()
  })

  it('should display default value for input', () => {
    const { container } = render(<App dishes={[]} />)
    const inputElement = container.querySelector('#people-input') as Element
    expect(inputElement.getAttribute('value')).toBe('1')
  })

  it('should block invalid number of people', () => {
    const { container } = render(<App dishes={[]} />)
    const inputElement = container.querySelector('#people-input') as Element
    const nextButton = screen.getByText('Next')
    global.alert = jest.fn()

    fireEvent.change(inputElement, { target: { value: '30' } })
    fireEvent.click(nextButton)
    expect(global.alert).toHaveBeenCalledTimes(1)

    fireEvent.change(inputElement, { target: { value: '1.1' } })
    fireEvent.click(nextButton)
    expect(global.alert).toHaveBeenCalledTimes(2)

    fireEvent.change(inputElement, { target: { value: '-1' } })
    fireEvent.click(nextButton)
    expect(global.alert).toHaveBeenCalledTimes(3)

    fireEvent.change(inputElement, { target: { value: '5' } })
    fireEvent.click(nextButton)
    expect(global.alert).toHaveBeenCalledTimes(3)
    expect(screen.getByText('Step 2').getAttribute('data-active')).toBe('true')
  })
})

describe('Food Order Form - user flow', () => {
  it('should pass happy path', () => {
    const { container } = render(<App dishes={mockDishes as Array<Dish>} />)
    global.alert = jest.fn()

    // step1
    const inputElement = container.querySelector('#people-input') as Element
    fireEvent.change(inputElement, { target: { value: '5' } })
    fireEvent.click(screen.getByText('Next'))
    expect(global.alert).toHaveBeenCalledTimes(0)

    // step2
    expect(screen.getByText('Step 2').getAttribute('data-active')).toBe('true')
    const selectElement = container.querySelector(
      '#restaurant-select'
    ) as Element
    fireEvent.click(selectElement)
    expect(screen.getByText('r1')).toBeInTheDocument()
    expect(screen.queryByText('r-breakfast')).not.toBeInTheDocument()
    expect(screen.getByText('r-lunch')).toBeInTheDocument()

    fireEvent.change(selectElement, { target: { value: 'r1' } })
    fireEvent.click(screen.getByText('Next'))

    // step3
    expect(screen.getByText('Step 3').getAttribute('data-active')).toBe('true')
    const dish1Select = container.querySelector('#dish-select-1') as Element
    const input1 = container.querySelector('#dish-quantity-input-1') as Element

    // select "food1" and "2"
    fireEvent.click(dish1Select)
    expect(screen.getByText('food1')).toBeInTheDocument()
    expect(screen.getByText('food2')).toBeInTheDocument()
    expect(screen.getByText('food3')).toBeInTheDocument()
    fireEvent.change(dish1Select, { target: { value: '1' } })

    expect(input1.getAttribute('value')).toBe('1')
    fireEvent.change(input1, { target: { value: '2' } })

    // Add new dish and select "food2" and "2"
    fireEvent.click(screen.getByText('Add new dish'))
    const dish2Select = container.querySelector('#dish-select-2') as HTMLElement
    const input2 = container.querySelector('#dish-quantity-input-2') as Element
    fireEvent.click(dish2Select)
    expect(queryByText(dish2Select, 'food1')).not.toBeInTheDocument()
    expect(getByText(dish2Select, 'food2')).toBeInTheDocument()
    expect(getByText(dish2Select, 'food3')).toBeInTheDocument()
    fireEvent.change(dish2Select, { target: { value: '2' } })

    expect(input2.getAttribute('value')).toBe('1')
    fireEvent.change(input2, { target: { value: '2' } })

    fireEvent.click(screen.getByText('Next'))
    expect(global.alert).toHaveBeenCalledTimes(1)

    // update to 3 servings
    fireEvent.change(input2, { target: { value: '3' } })
    fireEvent.click(screen.getByText('Next'))
    expect(global.alert).toHaveBeenCalledTimes(1)

    // review
    expect(screen.getByText('Review').getAttribute('data-active')).toBe('true')
    expect(screen.getByText('lunch')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
    expect(screen.getByText('r1')).toBeInTheDocument()
    expect(screen.getByText('food1 - 2')).toBeInTheDocument()
    expect(screen.getByText('food2 - 3')).toBeInTheDocument()

    fireEvent.click(screen.getByText('Submit'))
    expect(global.alert).toHaveBeenCalledTimes(2)

    // go to previous step
    fireEvent.click(screen.getByText('Previous'))
    expect(screen.getByText('Step 3').getAttribute('data-active')).toBe('true')

    fireEvent.click(screen.getByText('Previous'))
    expect(screen.getByText('Step 2').getAttribute('data-active')).toBe('true')

    fireEvent.click(screen.getByText('Previous'))
    expect(screen.getByText('Step 1').getAttribute('data-active')).toBe('true')

    // update people
    fireEvent.change(container.querySelector('#people-input') as Element, {
      target: { value: '10' }
    })
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    fireEvent.click(screen.getByText('Next'))
    expect(global.alert).toHaveBeenCalledTimes(3)

    // remove first food
    fireEvent.click(screen.getAllByText('X')[0])

    // Add food
    fireEvent.click(screen.getByText('Add new dish'))
    const dish3Select = container.querySelector('#dish-select-3') as HTMLElement
    const input3 = container.querySelector('#dish-quantity-input-3') as Element
    fireEvent.change(dish3Select, { target: { value: '3' } })
    fireEvent.change(input3, { target: { value: '7' } })
    fireEvent.click(screen.getByText('Next'))

    expect(screen.getByText('Review').getAttribute('data-active')).toBe('true')
    expect(screen.getByText('lunch')).toBeInTheDocument()
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('r1')).toBeInTheDocument()
    expect(screen.queryByText('food1')).not.toBeInTheDocument()
    expect(screen.getByText('food2 - 3')).toBeInTheDocument()
    expect(screen.getByText('food3 - 7')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Submit'))
  })

  it('should reset deal after selecting different restaurant', () => {
    const { container } = render(<App dishes={mockDishes as Array<Dish>} />)
    global.alert = jest.fn()

    // step1
    const inputElement = container.querySelector('#people-input') as Element
    const mealSelect = container.querySelector('#meal-select') as Element
    fireEvent.change(inputElement, { target: { value: '5' } })
    fireEvent.change(mealSelect, { target: { value: 'breakfast' } })
    fireEvent.click(screen.getByText('Next'))

    // step2
    const selectElement = container.querySelector(
      '#restaurant-select'
    ) as Element
    fireEvent.click(selectElement)
    expect(screen.getByText('r-breakfast')).toBeInTheDocument()
    expect(screen.queryByText('r-lunch')).not.toBeInTheDocument()

    fireEvent.change(selectElement, { target: { value: 'r-breakfast' } })
    fireEvent.click(screen.getByText('Next'))

    // step3, add new dish
    const dish1Select = container.querySelector('#dish-select-1') as Element
    const input1 = container.querySelector('#dish-quantity-input-1') as Element
    fireEvent.change(dish1Select, { target: { value: '4' } })
    fireEvent.change(input1, { target: { value: '2' } })
    fireEvent.click(screen.getByText('Add new dish'))
    expect(container.querySelector('#dish-select-2')).not.toBeNull()

    // back to previous page, select new restaurant
    // dishes should reset
    fireEvent.click(screen.getByText('Previous'))
    fireEvent.change(container.querySelector('#restaurant-select') as Element, {
      target: { value: 'r1' }
    })
    fireEvent.click(screen.getByText('Next'))
    expect(
      container.querySelector('#dish-select-1')?.getAttribute('value')
    ).toBeNull()
    expect(
      container.querySelector('#dish-quantity-input-1')?.getAttribute('value')
    ).toBe('1')
    expect(container.querySelector('#dish-select-2')).toBeNull()
    fireEvent.click(screen.getByText('Add new dish'))
  })

  it('should reset restaurant after selecting unsupported meal', () => {
    const { container } = render(<App dishes={mockDishes as Array<Dish>} />)
    global.alert = jest.fn()

    // step1
    const inputElement = container.querySelector('#people-input') as Element
    const mealSelect = container.querySelector('#meal-select') as Element
    fireEvent.change(inputElement, { target: { value: '5' } })
    fireEvent.change(mealSelect, { target: { value: 'breakfast' } })
    fireEvent.click(screen.getByText('Next'))

    // step2
    const selectElement = container.querySelector(
      '#restaurant-select'
    ) as Element
    fireEvent.click(selectElement)
    expect(screen.getByText('r-breakfast')).toBeInTheDocument()
    expect(screen.queryByText('r-lunch')).not.toBeInTheDocument()

    fireEvent.change(selectElement, { target: { value: 'r-breakfast' } })
    fireEvent.click(screen.getByText('Next'))

    // step3, add new dish
    const dish1Select = container.querySelector('#dish-select-1') as Element
    const input1 = container.querySelector('#dish-quantity-input-1') as Element
    fireEvent.change(dish1Select, { target: { value: '4' } })
    fireEvent.change(input1, { target: { value: '2' } })
    fireEvent.click(screen.getByText('Add new dish'))
    expect(container.querySelector('#dish-select-2')).not.toBeNull()

    // back to step1 and select different meal
    fireEvent.click(screen.getByText('Previous'))
    fireEvent.click(screen.getByText('Previous'))
    fireEvent.change(container.querySelector('#meal-select') as Element, {
      target: { value: 'lunch' }
    })
    fireEvent.click(screen.getByText('Next'))

    // should reset restaurant
    expect(
      container.querySelector('#restaurant-select')?.getAttribute('value')
    ).toBeNull()
  })
})
