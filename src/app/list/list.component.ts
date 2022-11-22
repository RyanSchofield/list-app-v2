import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import * as firebase from 'firebase/app';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  public items: any[] = [];
  public newGroupName: string = '';
  public itemsData: any;
  public collectionRef: any;
  public docRef: any;
  public docSubscription: any;
  public groups$: any;

  constructor(public store: AngularFirestore) { }

  async ngOnInit(): Promise<void> {
    /*this.docRef = this.store.collection('items').doc('itemList');
    this.docSubscription = await this.docRef.get();
    this.docSubscription.subscribe((val: any) => {
      console.log(val.data());
      let data = val.data() as any;
      this.items = JSON.parse(data.itemsJSON);
    });*/

    this.collectionRef = this.store.collection('groups');
    console.log(this.collectionRef);
    console.log(this.collectionRef.snapshotChanges());
    this.groups$ = this.collectionRef.snapshotChanges();
    let subscriber = this.groups$.subscribe((val: any) => {
      console.log(val);
    });
      
  }

  ngOnDestroy() {
    this.docSubscription.unsubscribe();
  }

  public async addGroup(newGroup: string) {
    if (newGroup === '') {
      return;
    }
    console.log(newGroup);
    this.collectionRef.add({name: newGroup, items: ['test']});
    this.newGroupName = '';
  }

  public async addItem(newItem: any, groupId: any) {
    console.log(newItem, groupId);
    let groupRef = this.collectionRef.doc(groupId);
    groupRef.get().subscribe((val: any) => {
      let itemsArray = val.data().items;
      itemsArray.push(newItem);
      groupRef.update({
        items: itemsArray
      });
      
      //console.log(val.data().items); // push onto items here
    });
    //groupRef.
    /*await groupRef.update({
      items: firebase.firestore.FieldValue.arrayUnion(newItem)
    });*/
  }

  public async removeItem(index: number, groupId: any) {
    return;
  }
}
/**
todo:
add grouping logic.
  create a group component with items input
add styling
**/