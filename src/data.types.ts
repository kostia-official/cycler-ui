export interface IField {
  _id: string;
  value: any;
  iterationId: string;
  fieldTemplateId: string;
}

export interface IIteration {
  _id: string;
  date: Date;
  cycleId: string;
}

export interface IIterationPopulated {
  _id: string;
  date: Date;
  fields: IField[];
  cycleId: string;
}

export enum Periodicity {
  Day = 'day',
  Week = 'week',
  Month = 'month'
}

export interface ICycle {
  _id: string;
  name: string;
  periodicity: Periodicity;
  fieldsTemplates: string[];
}

export interface ICyclePopulated {
  _id: string;
  name: string;
  periodicity: Periodicity;
  fieldsTemplates: IFieldTemplate[];
}

export interface IFieldTemplate {
  _id: string;
  type: FieldType;
  name: string;
  typeMeta?: any;
}

export enum FieldType {
  Text = 'text',
  Select = 'select'
}
