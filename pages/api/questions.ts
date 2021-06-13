import type { NextApiRequest, NextApiResponse } from 'next';
import { Response } from 'types/schema';
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

const getData = async (
  cursor: string | undefined,
  pageSize: number,
  holder: any[],
) => {
  const response: Response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: pageSize,
    start_cursor: cursor,
  });

  holder.push(...response.results);

  if (response.has_more) {
    await getData(response.next_cursor, pageSize, holder);
  }
};

async function fetchQuestions(_: NextApiRequest, res: NextApiResponse) {
  const response: any[] = [];
  await getData(undefined, 100, response);
  res.status(200).json({ response });
}

export default fetchQuestions;
