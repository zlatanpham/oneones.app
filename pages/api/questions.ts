import type { NextApiRequest, NextApiResponse } from 'next';
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });

export default async (_: NextApiRequest, res: NextApiResponse) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID,
    page_size: 100,
  });

  res.status(200).json({ response });
};
