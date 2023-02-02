import { Meal, SelectedDish } from 'constants/types'
import { useState, useRef } from 'react'

const STEP = {
  SELECT_MEAL: 0,
  SELECT_RESTAURANT: 1,
  SELECT_DISH: 2,
  REVIEW: 3
}

function useOrderForm() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedMeal, setSelectedMeal] = useState<Meal>('lunch')
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [selectedRestaurant, setSelectedRestaurant] = useState('')
  const [selectedDishes, setSelectedDishes] = useState<Array<SelectedDish>>([
    { id: undefined, quantity: 1, rowId: 1 }
  ])
  const rowIdRef = useRef(1)

  function handleMealChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedMeal(event.target.value as Meal)
  }

  function handleNumberOfPeopleChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setNumberOfPeople(Number(event.target.value))
  }

  function handleRestaurantChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedRestaurant(event.target.value as Meal)
  }

  function handleAddNewDishClick() {
    rowIdRef.current++
    setSelectedDishes((currentDishes) => [
      ...currentDishes,
      { id: undefined, quantity: 1, rowId: rowIdRef.current }
    ])
  }

  function removeSelectedDish(rowId: number) {
    setSelectedDishes((currentDishes) =>
      currentDishes.filter((dish) => dish.rowId !== rowId)
    )
  }

  function updateSelectedDish(rowId: number, dishId: number) {
    setSelectedDishes((currentDishes) =>
      currentDishes.map((dish) => {
        if (dish.rowId !== rowId) return dish
        return {
          ...dish,
          id: dishId
        }
      })
    )
  }

  function updateDishQuantity(rowId: number, quantity: number) {
    setSelectedDishes((currentDishes) =>
      currentDishes.map((dish) => {
        if (dish.rowId !== rowId) return dish
        return {
          ...dish,
          quantity
        }
      })
    )
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

    if (currentStep === STEP.SELECT_RESTAURANT && !selectedRestaurant) {
      alert('Please select a restaurant')
      return
    }

    if (currentStep === STEP.SELECT_DISH) {
      if (
        selectedDishes.find(
          (item) => !item.quantity || !Number.isInteger(item.quantity)
        )
      ) {
        alert('Number of quantity should be a integer')
        return
      }

      if (selectedDishes.find((item) => !item.id)) {
        alert('Please select a valid dish or remove the invalid')
        return
      }

      const totalQuantity = selectedDishes.reduce(
        (total, item) => total + item.quantity,
        0
      )

      if (totalQuantity < numberOfPeople) {
        alert(
          `You have ${numberOfPeople} people but only order ${totalQuantity} servings, please check again`
        )
        return
      }
    }

    if (currentStep === STEP.REVIEW) {
      console.log('Your order:')
      console.log({
        selectedMeal,
        numberOfPeople,
        selectedRestaurant,
        selectedDishes
      })
      return
    }

    setCurrentStep((step) => step + 1)
  }

  return {
    currentStep,
    selectedMeal,
    numberOfPeople,
    selectedRestaurant,
    selectedDishes,

    handleMealChange,
    handleNumberOfPeopleChange,
    handleRestaurantChange,
    handleAddNewDishClick,
    removeSelectedDish,
    updateSelectedDish,
    updateDishQuantity,

    handlePreviousClick,
    handleNextClick
  }
}

export default useOrderForm
