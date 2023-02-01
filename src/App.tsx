import { useState } from 'react'
import StepIndicator from 'components/StepIndicator'
import Button from './components/Button'

const MAX_STEP = 3

function App() {
  const [currentStep, setCurrentStep] = useState(0)

  function handlePreviousClick() {
    setCurrentStep((step) => step - 1)
  }

  function handleNextClick() {
    if (currentStep === MAX_STEP) {
      console.log('order')
      return
    }

    setCurrentStep((step) => step + 1)
  }

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="m-auto mt-[100px] w-[350px] rounded border-[1px] border-black">
        <StepIndicator currentStep={currentStep} />
        <div className="h-[500px] pt-[100px]"></div>
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
