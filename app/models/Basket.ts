import { ObjectSchema } from 'realm/dist/bundle';
import { BSON } from 'realm';
import { Product } from './Product';

export class Basket extends Realm.Object<Basket> {
  _id!: BSON.ObjectId;
  amount!: number;
  chosenProduct!: Product;

  static schema: ObjectSchema = {
    name: 'Basket',
    properties: {
      _id: 'objectId',
      amount: 'int',
      chosenProduct: 'Product'
    },
    primaryKey: '_id',
  };
}
