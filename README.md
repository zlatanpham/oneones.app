# oneones.app

A question generator for one-on-one meetings. The app was built with [NextJS](https://nextjs.org/) and [Notion API](https://developers.notion.com/).

## How to run

As the app sources data from a Notion database, you need to setup one to be able to run the app.

1. Register a Notion API Key by following [the instruction](https://developers.notion.com/docs/getting-started#step-1-create-an-integration).
2. Create a development database by cloning the [template](https://www.notion.so/thanhpham/832c1717bff5410abd1060404fa1dfaf?v=00cf9453a7444f9aa4d46b437206e900).

Once the API key and database ID are ready, create `.env.local` at the root of the project and add the following content.

```js
NOTION_API_KEY={{YOUR_API_KEY}}
NOTION_DATABASE_ID={{YOUR_DATABASE_ID}}
```

Finally, install dependencies and run development

```bash
yarn
yarn dev
```
