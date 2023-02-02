import { Meal, Dish } from 'constants/types'
import { useMemo } from 'react'

interface IStepRestaurantProps {
  selectedMeal: Meal
  selectedRestaurant: string
  dishes: Array<Dish>
  handleRestaurantChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export default function StepRestaurant({
  selectedMeal,
  selectedRestaurant,
  dishes,
  handleRestaurantChange
}: IStepRestaurantProps) {
  const restaurants = useMemo(() => {
    return Array.from(
      new Set(
        dishes
          .filter((item) => item.availableMeals.includes(selectedMeal))
          .map((item) => item.restaurant)
      )
    )
  }, [dishes, selectedMeal])

  return (
    <div className="p-[16px]">
      <div>
        <label htmlFor="restaurant-select" className="block">
          Please Select a Restaurant
        </label>
        <select
          id="restaurant-select"
          className="border-[1px] border-black"
          value={selectedRestaurant}
          onChange={handleRestaurantChange}
          required
        >
          <option value="" hidden>
            ---
          </option>
          {restaurants.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
