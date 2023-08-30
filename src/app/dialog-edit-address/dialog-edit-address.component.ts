import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/moduls/user.class';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-dialog-edit-address',
  templateUrl: './dialog-edit-address.component.html',
  styleUrls: ['./dialog-edit-address.component.scss']
})
export class DialogEditAddressComponent {
  user!: User;
  userId!: string;
  loading = false;

  editAddressForm = new FormGroup({
    streetForm: new FormControl('', [Validators.required]),
    zipCodeForm: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
    cityForm: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-ZöÖüÜäÄß\s]+$")])
  });


    /**
   * Get the name input field from the form group to use form control
   *
   */
    get streetForm() {
      return this.editAddressForm.get('streetForm');
    }


    /**
     * Get the name input field from the form group to use form control
     *
     */
    get zipCodeForm() {
      return this.editAddressForm.get('zipCodeForm');
    }


    /**
     * Get the name input field from the form group to use form control
     *
     */
    get cityForm() {
      return this.editAddressForm.get('cityForm');
    }

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>, private firestore: AngularFirestore) {}

  saveUser() {
    this.loading = true;
    this.firestore
      .collection('users')
      .doc(this.userId)
      .update(this.user.toJSON())
      .then(() => {
        this.loading = false;
        this.dialogRef.close()
      });
  }

}
