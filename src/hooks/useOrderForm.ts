import { Dish, Meal, SelectedDish } from 'constants/types'
import { useState, useRef } from 'react'
import { STEP, MAX_NUMBER_OF_PEOPLE } from 'constants/index'

function useOrderForm({ dishes }: { dishes: Array<Dish> }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedMeal, setSelectedMeal] = useState<Meal>('lunch')
  const [numberOfPeople, setNumberOfPeople] = useState(1)
  const [selectedRestaurant, setSelectedRestaurant] = useState('')
  const [selectedDishes, setSelectedDishes] = useState<Array<SelectedDish>>([
    { id: undefined, quantity: 1, rowId: 1 }
  ])
  const rowIdRef = useRef(1)
  const currentRestaurantRef = useRef('')

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
      numberOfPeople > MAX_NUMBER_OF_PEOPLE
    ) {
      alert(`Number of people should between 1 to ${MAX_NUMBER_OF_PEOPLE}`)
      return
    }

    switch (currentStep) {
      // if meal type is updated and selected restaurant is not supported, need to reset
      case STEP.SELECT_MEAL: {
        if (
          selectedRestaurant &&
          !dishes.find(
            (item) =>
              item.restaurant === selectedRestaurant &&
              item.availableMeals.includes(selectedMeal)
          )
        ) {
          setSelectedRestaurant('')
        }
        break
      }

      case STEP.SELECT_RESTAURANT: {
        if (!selectedRestaurant) {
          alert('Please select a restaurant')
          return
        }

        // if restaurant is updated, need to reset dishes
        if (currentRestaurantRef.current !== selectedRestaurant) {
          setSelectedDishes([{ id: undefined, quantity: 1, rowId: 1 }])
        }

        currentRestaurantRef.current = selectedRestaurant
        break
      }

      case STEP.SELECT_DISH: {
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
        break
      }

      case STEP.REVIEW: {
        console.log('Your order:')
        console.log({
          selectedMeal,
          numberOfPeople,
          selectedRestaurant,
          selectedDishes
        })
        alert('Order success! Please check console for your order detail')
        return
      }
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
