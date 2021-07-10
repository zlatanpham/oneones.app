import React from 'react';
import classnames from 'classnames';

const Button: React.FC<React.HTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={classnames(
        'px-5 py-3 bg-orange-600 text-white rounded',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
