export interface Parent {
  type: string;
  database_id: string;
}

export interface MultiSelect {
  id: string;
  name: string;
  color: string;
}

export interface Tags {
  id: string;
  type: string;
  multi_select: MultiSelect[];
}

export interface Text {
  content: string;
  link?: any;
}

export interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

export interface Title {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href?: any;
}

export interface Question {
  id: string;
  type: string;
  title: Title[];
}

export interface Properties {
  Tags: Tags;
  Question: Question;
}

export interface Result {
  object: string;
  id: string;
  created_time: Date;
  last_edited_time: Date;
  parent: Parent;
  archived: boolean;
  properties: Properties;
}

export interface Response {
  object: string;
  results: Result[];
  next_cursor: string;
  has_more: boolean;
}

export interface QuestionResponse {
  response: Response;
}
