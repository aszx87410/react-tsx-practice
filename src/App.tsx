import StepIndicator from 'components/StepIndicator'

function App() {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="m-auto mt-[100px] w-[400px] rounded border-[1px] border-black">
        <StepIndicator currentStep={1} />
        <div className="h-[500px] pt-[100px]"></div>
        <div className="flex">
          <button>Previous</button>
          <button>Next</button>
        </div>
      </div>
    </div>
  )
}

export default App
