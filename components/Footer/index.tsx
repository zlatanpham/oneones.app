import { useAppContext } from 'context/AppContextProvider'
import classnames from 'classnames'

export const Footer = () => {
  const { totalQuestions } = useAppContext()

  return (
    <footer className="mx-auto max-w-6xl px-5 text-center space-y-1">
      <p className="text-sm text-gray-500">
        © {new Date().getFullYear()} Thanh Pham - All Rights Reserved
      </p>
      <div
        className={classnames('text-sm space-x-3', {
          'pb-8': totalQuestions === 0,
          'pb-24 sm:pb-28': totalQuestions > 0,
        })}
      >
        <a
          href="https://twitter.com/_zlatanpham"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          Twitter
        </a>
        <a
          href="https://github.com/zlatanpham/oneones.app"
          target="_blank"
          rel="noreferrer"
          className="text-primary underline"
        >
          Github
        </a>
      </div>
    </footer>
  )
}
