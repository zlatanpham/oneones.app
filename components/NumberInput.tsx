import { BiPlus, BiMinus } from 'react-icons/bi'
import classnames from 'classnames'

interface Props {
  onPlusClick: () => void
  onMinusClick: () => void
  value: number
}

export const NumberInput = ({ onMinusClick, onPlusClick, value }: Props) => (
  <div className="flex items-center space-x-1.5">
    <button
      className="w-6 h-6 rounded-full border-gray-200 border flex justify-center items-center p-0 text-lg text-gray-500 hover:text-gray-900"
      onClick={onMinusClick}
      aria-label="Minus"
    >
      <BiMinus aria-hidden />
    </button>
    <input
      type="text"
      readOnly
      tabIndex={-1}
      value={value}
      className={classnames(
        'text-center w-10 px-2 rounded-full font-medium sm:text-base text-sm h-6 transition-all duration-150',
        {
          'text-gray-500 bg-gray-100 border-gray-300': value === 0,
          'text-gray-800 bg-secondary border-secondary': value !== 0,
        },
      )}
    />
    <button
      className="w-6 h-6 rounded-full border-gray-200 border flex justify-center items-center p-0 text-lg text-gray-500 hover:text-gray-900"
      onClick={onPlusClick}
      aria-label="Plus"
    >
      <BiPlus aria-hidden />
    </button>
  </div>
)
