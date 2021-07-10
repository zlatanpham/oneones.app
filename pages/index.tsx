import React, { useState } from 'react';
import { MultiSelect } from 'types/schema';
import { getTags, mapQuestions } from 'utils/mapping';
import { GetStaticProps } from 'next';
import { AppContextProvider, useAppContext } from 'context/AppContextProvider';
import { Client } from '@notionhq/client';
import { Button } from 'components';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const InnerApp = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const { questionGroups, popQuestion, pushQuestion, refresh, reset } =
    useAppContext();

  const totalQuestions = questionGroups.reduce(
    (a, c) => a + c.questions.length,
    0,
  );

  return (
    <>
      <header>
        <div className="max-w-6xl px-5 flex items-center mx-auto h-20 justify-between">
          <span className="font-bold text-2xl">oneones</span>
          <a
            href="https://github.com/zlatanpham/oneones.app"
            target="_blank"
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-5 pb-28">
        {!showQuestions && (
          <div className="bg-white rounded-lg p-5 shadow-lg">
            <ul className="divide-y">
              {questionGroups.map(({ name, id, questions }) => (
                <li className="flex justify-between py-2" key={id}>
                  <span>{name}</span>
                  <div className="flex items-center">
                    <button className="w-5" onClick={() => pushQuestion(id)}>
                      +
                    </button>
                    <input
                      type="text"
                      readOnly
                      value={questions.length}
                      className="text-center w-10 px-2"
                    />
                    <button className="w-5" onClick={() => popQuestion(id)}>
                      -
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {showQuestions && (
          <div className="space-y-5 bg-white rounded-lg p-5 shadow-lg">
            {questionGroups
              .filter(({ questions }) => questions.length > 0)
              .map(({ name, questions }) => (
                <div key={name}>
                  <h4 className="font-bold">{name}</h4>
                  <ul className="divide-y">
                    {questions.map(({ title, id }) => (
                      <li key={id} className="py-2">
                        {title}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}
      </div>

      {totalQuestions > 0 ? (
        <>
          {!showQuestions && (
            <div className="fixed inset-x-0 bottom-0 border-t border-gray-200 px-5 sm:px-8 h-20 flex justify-between items-center bg-white">
              <span className="font-semibold">
                {totalQuestions} question{totalQuestions > 1 ? 's' : ''}
              </span>
              <div className="flex items-center space-x-4">
                <button onClick={() => reset()}>reset</button>
                <Button onClick={() => setShowQuestions(true)}>Generate</Button>
              </div>
            </div>
          )}

          {showQuestions && (
            <div className="fixed inset-x-0 bottom-0 border-t border-gray-300 px-5 sm:px-8 h-20 flex justify-between items-center bg-white">
              <button onClick={() => setShowQuestions(false)}>Back</button>
              <Button onClick={() => refresh()}>Refresh</Button>
            </div>
          )}
        </>
      ) : null}
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
