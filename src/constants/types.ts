export const MealTypes = ['breakfast', 'lunch', 'dinner'] as const
export type Meal = (typeof MealTypes)[number]

export type Dish = {
  id: number
  name: string
  restaurant: string
  availableMeals: Array<Meal>
}

export type SelectedDish = {
  id: number | undefined
  rowId: number
  quantity: number
}
