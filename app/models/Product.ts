import { ObjectSchema } from 'realm/dist/bundle';
import { BSON } from 'realm';
import {Category} from "./Category";

export class Product extends Realm.Object<Product> {
  _id!: BSON.ObjectId;
  name!: string;
  price!:number;
  quantity!:number;
  category!:Realm.List<Category>;

  static schema: ObjectSchema = {
    name: 'Product',
    properties: {
      _id: 'objectId',
      name: 'string',
      price: 'double',
      quantity: 'int',
      category:{type:'linkingObjects',objectType:'Category',property:'products'}
    },
    primaryKey: '_id',
  };
}
