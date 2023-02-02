import { MealTypes, Meal } from 'constants/types'
import { MAX_NUMBER_OF_PEOPLE } from 'constants/index'

interface IStepInitialProps {
  selectedMeal: Meal
  numberOfPeople: number
  handleMealChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  handleNumberOfPeopleChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void
}

export default function StepInitial({
  selectedMeal,
  numberOfPeople,
  handleMealChange,
  handleNumberOfPeopleChange
}: IStepInitialProps) {
  return (
    <div className="p-[16px]">
      <div>
        <label htmlFor="meal-select" className="block">
          Please Select a meal
        </label>
        <select
          id="meal-select"
          className="border-[1px] border-black"
          value={selectedMeal}
          onChange={handleMealChange}
          required
        >
          {MealTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="people-input" className="block">
          Please Enter Number of people
        </label>
        <input
          type="number"
          inputMode="numeric"
          min="1"
          max={MAX_NUMBER_OF_PEOPLE}
          id="people-input"
          className="border-[1px] border-black px-[2px]"
          required
          value={numberOfPeople}
          onChange={handleNumberOfPeopleChange}
        />
      </div>
    </div>
  )
}
