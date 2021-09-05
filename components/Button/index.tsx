import React from 'react'
import classnames from 'classnames'

export const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={classnames(
        'inline-flex items-center sm:text-base text-xs sm:px-5 px-4 sm:py-3 py-2.5 bg-primary text-white font-medium focus:ring-3 transition duration-150 rounded-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}
