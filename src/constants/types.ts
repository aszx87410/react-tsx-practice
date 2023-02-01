export type Meal = 'breakfast' | 'lunch' | 'dinner'

export type Dish = {
  id: number
  name: string
  restaurant: string
  availableMeals: Array<Meal>
}
