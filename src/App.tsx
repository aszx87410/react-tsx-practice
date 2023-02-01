import StepIndicator from 'components/StepIndicator'
import Button from 'components/Button'
import StepInitial from 'components/StepInitial'
import StepRestaurant from 'components/StepRestaurant'
import StepDish from 'components/StepDish'
import StepReview from 'components/StepReview'
import { Dish } from 'constants/types'
import useOrderForm from 'hooks/useOrderForm'

interface IAppProps {
  dishes: Array<Dish>
}

function App({ dishes }: IAppProps) {
  const {
    currentStep,
    selectedMeal,
    numberOfPeople,

    handleMealChange,
    handleNumberOfPeopleChange,
    handlePreviousClick,
    handleNextClick
  } = useOrderForm({
    dishes
  })

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="m-auto mt-[100px] w-[350px] rounded border-[1px] border-black">
        <StepIndicator currentStep={currentStep} />
        <div className="h-[500px]">
          {currentStep === 0 && (
            <StepInitial
              selectedMeal={selectedMeal}
              numberOfPeople={numberOfPeople}
              handleMealChange={handleMealChange}
              handleNumberOfPeopleChange={handleNumberOfPeopleChange}
            />
          )}
          {currentStep === 1 && <StepRestaurant />}
          {currentStep === 2 && <StepDish />}
          {currentStep === 3 && <StepReview />}
        </div>
        <div className="m-[8px] flex justify-between">
          <Button onClick={handlePreviousClick} isVisible={currentStep > 0}>
            Previous
          </Button>
          <Button onClick={handleNextClick}>Next</Button>
        </div>
      </div>
    </div>
  )
}

export default App
