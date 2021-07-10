import { MultiSelect, Result } from 'types/schema';

export function mapQuestions(data: Result[]) {
  return data.map((item) => {
    return {
      id: item.id,
      title: item.properties.Question.title[0].plain_text,
      tags: item.properties.Tags.multi_select,
    };
  });
}

export function getTags(data: Result[]) {
  const tags = data.reduce<MultiSelect[]>((a, c) => {
    let items = a;
    c.properties.Tags.multi_select.forEach((tag) => {
      if (!a.find((t) => t.id === tag.id)) {
        items = [...items, tag];
      }
    });

    return items;
  }, []);

  return tags;
}
