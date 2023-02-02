import cx from 'classnames'

interface IStepProps {
  isActive: boolean
  children: React.ReactNode
}

function Step({ children, isActive }: IStepProps) {
  return (
    <div
      className={cx(
        'flex-1 border-l-[1px] border-black py-[8px] first:border-l-0',
        {
          'bg-sky-300': isActive
        }
      )}
      data-active={isActive}
    >
      {children}
    </div>
  )
}

interface IStepIndicatorProps {
  currentStep: number
}

export default function StepIndicator({ currentStep }: IStepIndicatorProps) {
  const labels = ['Step 1', 'Step 2', 'Step 3', 'Review']
  return (
    <div className="flex border-b-[1px] border-black text-center">
      {labels.map((item, index) => (
        <Step key={index} isActive={currentStep === index}>
          {item}
        </Step>
      ))}
    </div>
  )
}
