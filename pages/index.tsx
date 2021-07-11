import React, { useState } from 'react';
import { MultiSelect } from 'types/schema';
import { getTags, mapQuestions } from 'utils/mapping';
import { GetStaticProps } from 'next';
import { AppContextProvider, useAppContext } from 'context/AppContextProvider';
import { Client } from '@notionhq/client';
import { Badge, Button } from 'components';
import {
  BiRefresh,
  BiPlus,
  BiMinus,
  BiReset,
  BiRightArrowAlt,
  BiArrowBack,
} from 'react-icons/bi';
import classnames from 'classnames';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const InnerApp = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const {
    questionGroups,
    popQuestion,
    pushQuestion,
    refresh,
    reset,
    refreshQuestion,
  } = useAppContext();

  const totalQuestions = questionGroups.reduce(
    (a, c) => a + c.questions.length,
    0,
  );

  return (
    <>
      <div className="max-w-6xl px-5 text-center mx-auto mb-8 space-y-2 pt-8 sm:pt-14">
        <h1 className="font-medium text-xl sm:text-3xl text-gray-800">
          One on One Question Generator
        </h1>
        <p className="text-gray-800 leading-snug sm:text-base text-sm sm:w-full w-2/3 mx-auto">
          Fuel your next one-on-one meeting with great questions.
        </p>
      </div>

      <div
        className={classnames('max-w-3xl mx-auto px-5', {
          'pb-24 sm:pb-28': totalQuestions > 0,
          'pb-10': totalQuestions === 0,
        })}
      >
        {!showQuestions && (
          <div className="bg-white rounded-lg px-5 sm:px-6 py-3 border border-gray-300 max-w-xl mx-auto select-none">
            <ul className="divide-y divide-gray-300">
              {questionGroups.map(({ name, id, questions, color }) => (
                <li className="flex justify-between py-3 space-x-5" key={id}>
                  <Badge color={color}>{name}</Badge>
                  <div className="flex items-center space-x-1.5">
                    <button
                      className="w-6 h-6 rounded-full border-gray-200 border flex justify-center items-center p-0 text-2xl text-gray-500 hover:text-gray-900"
                      onClick={() => pushQuestion(id)}
                      aria-label="Plus"
                    >
                      <BiPlus aria-hidden />
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={questions.length}
                      className={classnames(
                        'text-center w-10 px-2 rounded-full font-medium sm:text-base text-sm h-6 transition-all duration-150',
                        questions.length === 0
                          ? 'text-gray-500 bg-gray-100 border-gray-300'
                          : 'text-gray-800 bg-secondary border-secondary',
                      )}
                    />
                    <button
                      className="w-6 h-6 rounded-full border-gray-200 border flex justify-center items-center p-0 text-2xl text-gray-500 hover:text-gray-900"
                      onClick={() => popQuestion(id)}
                      aria-label="Minus"
                    >
                      <BiMinus aria-hidden />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {showQuestions && (
          <div className="space-y-4">
            {questionGroups
              .filter(({ questions }) => questions.length > 0)
              .map(({ name, questions, color }) => (
                <div
                  className="space-y-5 bg-white rounded-lg px-5 sm:px-6 pt-5 pb-3 border border-gray-300 animate-slide-up"
                  // style={{ animationDelay: `${index * 200}ms` }}
                  key={name}
                >
                  <Badge color={color}>{name}</Badge>
                  <ul className="divide-y divide-gray-300">
                    {questions.map(({ title, id }) => (
                      <li
                        key={id}
                        className="py-3 flex items-center justify-between space-x-5 group"
                      >
                        <div className="w-full text-gray-800 sm:text-base text-sm">
                          {title}
                        </div>

                        <button
                          className="text-2xl text-gray-500 hover:text-gray-900 transition-color duration-150 opacity-0 group-hover:opacity-100"
                          aria-label="Refresh"
                          onClick={() => refreshQuestion(id)}
                        >
                          <BiRefresh aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>

      <div
        className={classnames(
          'fixed inset-x-0 bottom-0 border-gray-200 border-t bg-white border border-gray-300 transition duration-150 select-none',
          {
            '-z-1': totalQuestions === 0,
            visible: totalQuestions > 0,
            'translate-y-10 opacity-0': totalQuestions === 0,
            'translate-y-0 opacity-100': totalQuestions > 0,
          },
        )}
        aria-hidden={totalQuestions === 0}
      >
        <div
          className={classnames(
            'sm:h-20 h-16 flex justify-between items-center px-3 sm:px-6 max-w-6xl mx-auto',
          )}
        >
          {!showQuestions ? (
            <>
              <div className="font-medium sm:text-base text-sm text-gray-800">
                <span className="bg-secondary text-gray-800 rounded-full px-5 w-10 h-10 flex-none inline-flex items-center justify-center">
                  {totalQuestions}
                </span>{' '}
                question
                {totalQuestions > 1 ? 's' : ''}
              </div>
              <div className="flex items-center space-x-10">
                <button
                  onClick={() => reset()}
                  aria-label="Reset"
                  title="Reset"
                  className="hidden sm:inline-flex items-center text-gray-600 hover:text-gray-900 transition duration-150 sm:text-base text-sm"
                >
                  <BiReset className="text-2xl mr-1" /> Reset
                </button>
                <Button
                  onClick={() => {
                    setShowQuestions(true);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  Generate <BiRightArrowAlt className="text-xl ml-1" />
                </Button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowQuestions(false)}
                className="inline-flex items-center font-semibold text-gray-600 hover:text-gray-900 transition duration-150 sm:text-base text-sm"
              >
                <BiArrowBack className="text-xl mr-2" /> Go back
              </button>
              <Button
                onClick={() => {
                  refresh();
                  window.scrollTo({ top: 0 });
                }}
              >
                <BiRefresh className="mr-2 text-lg" /> Refresh
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

function App({
  questions,
  tags,
}: {
  questions: ReturnType<typeof mapQuestions>;
  tags: MultiSelect[];
}) {
  return (
    <AppContextProvider questions={questions} tags={tags}>
      <InnerApp />
    </AppContextProvider>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const getData = async (
    cursor: string | undefined,
    pageSize: number,
    holder: any[],
  ) => {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
      page_size: pageSize,
      start_cursor: cursor,
    });

    holder.push(...response.results);

    if (
      response.has_more &&
      response.next_cursor &&
      process.env.NODE_ENV === 'production'
    ) {
      await getData(response.next_cursor, pageSize, holder);
    }
  };

  const response: any[] = [];
  await getData(undefined, 100, response);

  const questions = mapQuestions(response || []);
  const tags = getTags(response || []);

  return {
    props: { questions, tags },
  };
};

export default App;
