import { Component, OnInit } from '@angular/core';
import {AlertController, PickerController} from '@ionic/angular';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.page.html',
  styleUrls: ['./user-setting.page.scss'],
})
export class UserSettingPage implements OnInit {

  constructor(private picker: PickerController,
              private alert: AlertController) { }

  ngOnInit() {
  }
// MARK: Save alert methods
  async saveAlertMethod() {
    const alert = await this.alert.create({
      header: 'Save changes',
      subHeader: 'The changes are irreversible!',
      message: 'Are you sure?',
      buttons: [
        {text: 'Cancel' },
        {text: 'Confirm',
        handler: _ => { this.confirmSave(); } }
      ]
    });
    await alert.present();
  }
  // Save changes!
  private confirmSave() {
    // TODO: Add save method!
    return true;
  }
  // MARK: Delete account alert methods
  async deleteAlertMethod() {
    const alert = await this.alert.create({
      header: 'Delete account',
      subHeader: 'This is irreversible!',
      message: 'Are you sure?',
      buttons: [
        {text: 'Cancel' },
        {text: 'Confirm',
          handler: _ => { this.confirmDelete(); } }
      ]
    });
    await alert.present();
  }
  // Delete account
  private confirmDelete() {
  // TODO: Delete account method
    return true;
  }
  // MARK: Logout alert methods
  async logoutAlertMethod() {
    const alert = await this.alert.create({
      header: 'Logout',
      subHeader: 'Don\'t leave us!',
      message: 'Are you sure?',
      buttons: [
        {text: 'Cancel' },
        {text: 'Confirm',
          handler: _ => { this.confirmLogout(); } }
      ]
    });
    await alert.present();
  }
  // Confirn logout
  private confirmLogout() {
  return true;
  }

  // MARK: Picker methods
  async openPicker() {
    const picker = await this.picker.create({
      buttons: [{
        text: 'Cancel',
      }, {
        text: 'Done',
        handler: _ => { this.changeCountry(); }
      }],
      columns: [
        {
          name: 'Country',
          options: [
            {
              text: '---',
              value: 0
            },
            {
              text: 'Italy',
              value: 1
            },
            {
              text: 'Greece',
              value: 2
            },
            {
              text: 'United Kingdom',
              value: 3
            },
          ]
        },
      ]
    });
    await picker.present();
  }
  // Change country
  private changeCountry() {
    console.log('Picker\'s done button triggered');
  }
}
