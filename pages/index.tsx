import React, { useState } from 'react';
import { MultiSelect, Response } from 'types/schema';
import { getTags, mapQuestions } from 'utils/mapping';
import { GetStaticProps } from 'next';
import { AppContextProvider, useAppContext } from 'context/AppContextProvider';
import { Client } from '@notionhq/client';

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const InnerApp = () => {
  const [showQuestions, setShowQuestions] = useState(false);
  const { questionGroups, popQuestion, pushQuestion, refresh } =
    useAppContext();
  const totalQuestions = questionGroups.reduce(
    (a, c) => a + c.questions.length,
    0,
  );

  return (
    <>
      {!showQuestions && (
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
      )}
      {showQuestions && (
        <div className="space-y-5">
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

      {totalQuestions > 0 ? (
        <>
          {!showQuestions && (
            <div className="fixed inset-x-0 bottom-0 border-t border-gray-300 px-6 py-5 flex justify-between">
              <span>
                {totalQuestions} question{totalQuestions > 1 ? 's' : ''}
              </span>
              <button onClick={() => setShowQuestions(true)}>Generate</button>
            </div>
          )}

          {showQuestions && (
            <div className="fixed inset-x-0 bottom-0 border-t border-gray-300 px-6 py-5 flex justify-between">
              <button onClick={() => setShowQuestions(false)}>Back</button>
              <button onClick={() => refresh()}>Refresh</button>
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
    // @ts-ignore
    const response: Response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID || '',
      page_size: pageSize,
      start_cursor: cursor,
    });

    holder.push(...response.results);

    if (response.has_more && process.env.NODE_ENV === 'production') {
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
