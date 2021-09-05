import { useMemo, useRef, useState } from 'react'
import { MultiSelect } from 'types/schema'
import { createContext, getRandomInt, mapQuestions } from 'utils'

type Questions = ReturnType<typeof mapQuestions>

type QuestionGroup = MultiSelect & { questions: Questions }

interface AppContextValues {
  tags: MultiSelect[]
  questionGroups: QuestionGroup[]
  pushQuestion: (tagId: string) => void
  popQuestion: (tagId: string) => void
  refreshQuestion: (id: string) => void
  refresh: () => void
  reset: () => void
  totalQuestions: number
}

const [Provider, useAppContext] = createContext<AppContextValues>({})

export const AppContextProvider: React.FC<{
  tags: MultiSelect[]
  questions: Questions
}> = ({ children, tags, questions }) => {
  const internalQuestions = useRef(questions)
  const [questionGroups, setInternalQuestionGroups] = useState<QuestionGroup[]>(
    tags.map((tag) => ({ ...tag, questions: [] })),
  )

  const pushQuestion = (tagId: string) => {
    const questionsByTag = internalQuestions.current.filter(({ tags }) =>
      tags.find((t) => t.id === tagId),
    )

    if (questionsByTag.length > 0) {
      setInternalQuestionGroups((prev) => {
        return prev.map((group) => {
          if (group.id === tagId) {
            const randomIndex = getRandomInt(questionsByTag.length - 1)
            const addedQuestion = questionsByTag[randomIndex]
            internalQuestions.current = internalQuestions.current.filter(
              (q) => q !== addedQuestion,
            )

            return {
              ...group,
              questions: [...group.questions, addedQuestion],
            }
          }

          return group
        })
      })
    }
  }

  const popQuestion = (tagId: string) => {
    const questionsByTag = questionGroups.filter(({ id }) => id === tagId)[0]
      .questions
    if (questionsByTag.length > 0) {
      const question = questionsByTag[questionsByTag.length - 1]
      internalQuestions.current.push(question)

      setInternalQuestionGroups((prev) => {
        return prev.map((group) => {
          if (group.id === tagId) {
            return {
              ...group,
              questions: group.questions.filter(
                (_, index) => index !== group.questions.length - 1,
              ),
            }
          }

          return group
        })
      })
    }
  }

  const refresh = () => {
    setInternalQuestionGroups((prev) => {
      return prev.map((group) => {
        const tag = group.id
        const currentQuestions = group.questions
        const questionsByTag = internalQuestions.current.filter(
          (q) =>
            q.tags.find((t) => t.id === tag) && !currentQuestions.includes(q),
        )
        const questions: Questions = [...currentQuestions]
        const returnQuestions: Questions = []
        const len = Math.min(currentQuestions.length, questionsByTag.length)
        for (let i = 0; i < len; i++) {
          returnQuestions.push(currentQuestions[i])
          questions.splice(0, 1)
          const randomIndex = getRandomInt(questionsByTag.length - 1)
          const addedQuestion = questionsByTag[randomIndex]
          questionsByTag.splice(randomIndex, 1)
          internalQuestions.current = internalQuestions.current.filter(
            (q) => q !== addedQuestion,
          )
          questions.push(addedQuestion)
        }

        internalQuestions.current.push(...returnQuestions)

        return {
          ...group,
          questions,
        }
      })
    })
  }

  const reset = () => {
    setInternalQuestionGroups((prev) => {
      return prev.map(({ questions, ...rest }) => {
        internalQuestions.current.push(...questions)

        return { ...rest, questions: [] }
      })
    })
  }

  const refreshQuestion = (id: string) => {
    setInternalQuestionGroups((prev) => {
      return prev.map(({ questions, ...rest }) => {
        let newQuestions = questions
        const currentQuestion = questions.find((q) => q.id === id)

        if (currentQuestion) {
          const tag = currentQuestion?.tags[0].id
          const questionsByTag = internalQuestions.current.filter((q) =>
            q.tags.find((t) => t.id === tag),
          )
          if (questionsByTag.length > 0) {
            const randomIndex = getRandomInt(questionsByTag.length - 1)
            const addedQuestion = questionsByTag[randomIndex]

            newQuestions = questions.map((q) => {
              return q === currentQuestion ? addedQuestion : q
            })

            internalQuestions.current = internalQuestions.current.map((q) => {
              return q === addedQuestion ? currentQuestion : q
            })
          }
        }

        return { ...rest, questions: newQuestions }
      })
    })
  }

  const totalQuestions = useMemo(() => {
    return questionGroups.reduce((a, c) => a + c.questions.length, 0)
  }, [questionGroups])

  return (
    <Provider
      value={{
        tags,
        questionGroups,
        pushQuestion,
        popQuestion,
        refresh,
        reset,
        refreshQuestion,
        totalQuestions,
      }}
    >
      {children}
    </Provider>
  )
}

export { useAppContext }
