import { Dish, Meal } from 'constants/types'
import { useState } from 'react'

const LAST_STEP = 3

function useOrderForm({ dishes }: { dishes: Array<Dish> }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedMeal, setSelectedMeal] = useState<Meal>('lunch')
  const [numberOfPeople, setNumberOfPeople] = useState(1)

  function handleMealChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMeal(event.target.value as Meal)
  }

  function handleNumberOfPeopleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNumberOfPeople(Number(event.target.value))
  }

  function handlePreviousClick() {
    setCurrentStep((step) => step - 1)
  }

  function handleNextClick() {
    if (!selectedMeal) {
      alert('Please select a meal')
      return
    }

    if (
      !numberOfPeople ||
      !Number.isInteger(numberOfPeople) ||
      numberOfPeople < 1 ||
      numberOfPeople > 10
    ) {
      alert('Number of people should between 1 to 10')
      return
    }

    if (currentStep === LAST_STEP) {
      console.log('order')
      return
    }

    setCurrentStep((step) => step + 1)
  }

  return {
    currentStep,
    selectedMeal,
    numberOfPeople,

    handleMealChange,
    handleNumberOfPeopleChange,
    handlePreviousClick,
    handleNextClick
  }
}

export default useOrderForm
