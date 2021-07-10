import React from 'react';
import classnames from 'classnames';

export const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={classnames(
        'inline-flex items-center px-5 py-3 bg-primary text-white font-semibold focus:ring-3 transition duration-150 rounded-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};
