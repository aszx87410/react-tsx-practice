import { Meal, SelectedDish, Dish } from 'constants/types'

interface IStepReviewProps {
  selectedMeal: Meal
  selectedRestaurant: string
  numberOfPeople: number
  selectedDishes: Array<SelectedDish>
  dishes: Array<Dish>
}

interface IDisplayItemProps {
  title: string
  children: React.ReactNode
}

function DisplayItem({ title, children }: IDisplayItemProps) {
  return (
    <div className="mt-[32px] flex first:mt-0">
      <div className="flex-1">{title}</div>
      <div className="flex-1">{children}</div>
    </div>
  )
}

export default function StepReview({
  selectedMeal,
  selectedRestaurant,
  numberOfPeople,
  selectedDishes,
  dishes
}: IStepReviewProps) {
  return (
    <div className="p-[16px]">
      <DisplayItem title="Meal">{selectedMeal}</DisplayItem>
      <DisplayItem title="No. of. People">{numberOfPeople}</DisplayItem>
      <DisplayItem title="Restaurant">{selectedRestaurant}</DisplayItem>
      <DisplayItem title="Dishes">
        <ul className="border border-black p-[4px]">
          {selectedDishes.map((item) => (
            <li key={item.id}>
              {dishes.find((dish) => dish.id === item.id)?.name} -{' '}
              {item.quantity}
            </li>
          ))}
        </ul>
      </DisplayItem>
    </div>
  )
}
