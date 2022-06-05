import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





type Jlkim909ModelMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Jlkim909Model {
  readonly id: string;
  readonly createdAt?: string | null;
  readonly updatedAt?: string | null;
  constructor(init: ModelInit<Jlkim909Model, Jlkim909ModelMetaData>);
  static copyOf(source: Jlkim909Model, mutator: (draft: MutableModel<Jlkim909Model, Jlkim909ModelMetaData>) => MutableModel<Jlkim909Model, Jlkim909ModelMetaData> | void): Jlkim909Model;
}