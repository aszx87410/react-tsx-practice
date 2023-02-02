import StepIndicator from 'components/StepIndicator'
import Button from 'components/Button'
import StepInitial from 'components/StepInitial'
import StepRestaurant from 'components/StepRestaurant'
import StepDish from 'components/StepDish'
import StepReview from 'components/StepReview'
import { Dish } from 'constants/types'
import useOrderForm from 'hooks/useOrderForm'
import { STEP } from 'constants/index'

interface IAppProps {
  dishes: Array<Dish>
}

function App({ dishes }: IAppProps) {
  const {
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
  } = useOrderForm({
    dishes
  })

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="m-auto mt-[100px] w-[350px] rounded border-[1px] border-black">
        <StepIndicator currentStep={currentStep} />
        <div className="h-[500px] overflow-auto">
          {currentStep === 0 && (
            <StepInitial
              selectedMeal={selectedMeal}
              numberOfPeople={numberOfPeople}
              handleMealChange={handleMealChange}
              handleNumberOfPeopleChange={handleNumberOfPeopleChange}
            />
          )}
          {currentStep === 1 && (
            <StepRestaurant
              selectedMeal={selectedMeal}
              dishes={dishes}
              selectedRestaurant={selectedRestaurant}
              handleRestaurantChange={handleRestaurantChange}
            />
          )}
          {currentStep === 2 && (
            <StepDish
              selectedMeal={selectedMeal}
              selectedRestaurant={selectedRestaurant}
              selectedDishes={selectedDishes}
              dishes={dishes}
              handleAddNewDishClick={handleAddNewDishClick}
              removeSelectedDish={removeSelectedDish}
              updateSelectedDish={updateSelectedDish}
              updateDishQuantity={updateDishQuantity}
            />
          )}
          {currentStep === 3 && (
            <StepReview
              selectedMeal={selectedMeal}
              selectedRestaurant={selectedRestaurant}
              numberOfPeople={numberOfPeople}
              selectedDishes={selectedDishes}
              dishes={dishes}
            />
          )}
        </div>
        <div className="m-[8px] flex justify-between border-t-[1px] border-black pt-[8px]">
          <Button onClick={handlePreviousClick} isVisible={currentStep > 0}>
            Previous
          </Button>
          <Button onClick={handleNextClick}>
            {currentStep === STEP.REVIEW ? 'Submit' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default App
