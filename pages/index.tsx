import React from 'react';
import tw from 'twin.macro';
import useSWR from 'hooks/useSWR';
import fetcher from 'libs/fetcher';
import { QuestionResponse } from 'types/schema';
import { getTags, mapQuestions } from 'utils/mapping';

const App = () => {
  const { data } = useSWR('/api/questions', () =>
    fetcher<QuestionResponse>('/api/questions'),
  );

  const questions = mapQuestions(data?.response.results || []);
  const tags = getTags(data?.response.results || []);
  console.log({ questions, tags });

  return (
    <div>
      <h1 css={tw`text-4xl font-bold mb-8`}>Welcome</h1>
      <p css={tw`text-lg mb-8`}>
        <b>Next Boilerplate</b> provides the basics to get a fast web app with
        NextJS. Features:
      </p>
      <ul css={tw`list-disc list-inside`}>{'s'}</ul>
    </div>
  );
};

export default App;
