import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import 'firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  private itemsCollection: AngularFirestoreCollection<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore, ) { }

  getCollection(collId) {
    this.itemsCollection = this.afs.collection<any>(collId);
    return this.itemsCollection.valueChanges();
  }

  addToCollection(collId, data) {
    this.itemsCollection = this.afs.collection<any>(collId);
    const id = this.afs.createId();
    data.id = id;
    this.itemsCollection.doc(id).set(data);
  }

  addDoc(collId, docId, data) {
    this.itemDoc = this.afs.doc<any>(collId + '/' + docId);
    return this.itemDoc.set(data);
  }
  getDoc(collId, docId) {
    this.itemDoc = this.afs.doc<any>(collId + '/' + docId);
    return this.itemDoc.valueChanges();
  }
  deleteDoc(collId, docId) {
    this.itemDoc = this.afs.doc<any>(collId + '/' + docId);
    this.itemDoc.delete();
  }
  updateDoc(collId, docId, data) {
    this.itemDoc = this.afs.doc(collId + '/' + docId);
    return this.itemDoc.update(data), { marge: true };
  }

  getPost(time) {
    return this.afs.collection('post', ref => ref.where('time', '<', time).orderBy('time', 'desc').limit(4));
  }
  getMyPost(uid) {
    // console.log(uid);
    return this.afs.collection('post', ref => ref.where('postedBy', '==', uid).orderBy('time', 'desc'));
  }

  getuserInfo(uid) {
    return this.afs.collection('user', ref => ref.where('uid', '==', uid));
  }

}
