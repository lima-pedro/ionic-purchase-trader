import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class RevistaService {

  collection: string = "revistas";

  constructor(
    private firestore: AngularFirestore
  ) { }

  getAll () {
    return this.firestore.collection(this.collection).snapshotChanges();
  }
}
