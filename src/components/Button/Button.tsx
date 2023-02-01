import cx from 'classnames'

interface IButtonProps {
  children?: React.ReactNode
  isVisible?: boolean
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
  children,
  isVisible = true,
  onClick,
  ...props
}: IButtonProps) {
  return (
    <button
      className={cx(
        'rounded border-[1px] border-black px-[16px] hover:bg-[#ccc]',
        {
          invisible: !isVisible
        }
      )}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  )
}
