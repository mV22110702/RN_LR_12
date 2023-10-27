import { Category } from '../../../../app/models/Category';
import { Product } from '../../../../app/models/Product';
import {MutableRefObject} from "react";
import * as BSON from "@realm/react";

export async function initDb(realmRef: MutableRefObject<Realm>) {


  realmRef.current.write(()=>{
    realmRef.current.deleteAll();
    const categoriesMock: Array<Pick<Category, 'name'>> = [
      { name: 'Motherboards' },
      { name: 'Processors' },
      { name: 'RAM' },
      { name: 'Video cards' },
      { name: 'Sound cards' },
      { name: 'Hard disks' },
      { name: 'Optical drives' },
      { name: 'Power supplies' },
      { name: 'Housings' },
      { name: 'Cooling systems' },
      { name: 'UPS' },
      { name: 'SSD' },
      { name: 'Video capture cards' },
      { name: 'UPS batteries and accessories' },
      { name: 'Keyboards and mice' },
      { name: 'RAID controllers' },
      { name: 'Mini computers' },
      { name: 'Mining equipment' },
    ];

    categoriesMock.map(async (category) => {
      realmRef.current.create(Category, {...category,_id:new Realm.BSON.ObjectId()});
    });
    realmRef.current.objects(Category).forEach((category) => {
      Object.keys(Array.from({ length: 10 })).forEach((index) => {
        const createdProduct = realmRef.current.create(Product, {
          name: `${index}-${category.name}`,
          price: Number.parseFloat((Math.random() * 1000).toFixed(1)),
          quantity:100,
          _id:new Realm.BSON.ObjectId()
        });

        category.products.push(createdProduct);
      });
    });

  })
}
