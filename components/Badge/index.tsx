import classnames from 'classnames';

export const Badge = ({
  color,
  children,
}: {
  color: string;
  children: string;
}) => {
  return (
    <span
      className={classnames(
        'px-5 py-2 rounded-full font-medium text-sm inline-flex',
        {
          'bg-notion-default': color === 'default',
          'bg-notion-gray': color === 'gray',
          'bg-notion-brown': color === 'brown',
          'bg-notion-orange': color === 'orange',
          'bg-notion-yellow': color === 'yellow',
          'bg-notion-green': color === 'green',
          'bg-notion-blue': color === 'blue',
          'bg-notion-purple': color === 'purple',
          'bg-notion-pink': color === 'pink',
          'bg-notion-red': color === 'red',
        },
      )}
    >
      {children}
    </span>
  );
};
