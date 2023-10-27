import { ObjectSchema } from 'realm/dist/bundle';
import { BSON } from 'realm';
import { Product } from './Product';
import { CategoryName } from '../../libs/enums/category-name.enum';
import { ValueOf } from '../../libs/types/value-of.type';

export class Category extends Realm.Object<Category> {
  _id!: BSON.ObjectId;
  name!: ValueOf<typeof CategoryName>;
  products: Realm.List<Product>;

  static schema: ObjectSchema = {
    name: 'Category',
    properties: {
      _id: { type: 'objectId' },
      name: 'string',
      products: 'Product[]',
    },
    primaryKey: '_id',
  };
}
