import { Injector, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  LoadingController,
  AlertController,
  ModalController,
  PopoverController
} from '@ionic/angular';

export abstract class BasePage implements OnInit, OnDestroy {
  public isLoadingView: boolean;
  public isEmptyView: boolean;
  public isContentView: boolean;
  public isErrorView: boolean;

  protected route: ActivatedRoute;
  protected refresher: any;
  protected infiniteScroll: any;

  private loadingCtrl: LoadingController;
  private loading: any;
  private alertCtrl: AlertController;
  private modalCtrl: ModalController;
  private popoverCtrl: PopoverController;

  constructor(public injector: Injector) {
    this.route = injector.get(ActivatedRoute);
    this.loadingCtrl = injector.get(LoadingController);
    this.alertCtrl = injector.get(AlertController);
    this.modalCtrl = injector.get(ModalController);
    this.popoverCtrl = injector.get(PopoverController);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  async showLoadingView(message?: string): Promise<void> {
    this.isLoadingView = true;
    this.isEmptyView = false;
    this.isContentView = false;
    this.isErrorView = false;

    this.loading = await this.loadingCtrl.create({
      message: message
    });
    await this.loading.present();
  }

  async showEmptyView(): Promise<void> {
    this.isLoadingView = false;
    this.isEmptyView = true;
    this.isContentView = false;
    this.isErrorView = false;

    await this.loading.dismiss();
  }

  async showContentView(): Promise<void> {
    this.isLoadingView = false;
    this.isEmptyView = false;
    this.isContentView = true;
    this.isErrorView = false;

    await this.loading.dismiss();
  }

  async showErrorView(): Promise<void> {
    this.isLoadingView = false;
    this.isEmptyView = false;
    this.isContentView = false;
    this.isErrorView = true;

    await this.loading.dismiss();
  }

  onRefreshComplete(data?: any): void {
    if (this.refresher) {
      this.refresher.complete();
    }

    if (this.infiniteScroll) {
      this.infiniteScroll.complete();
      if (data && data.length > 0) {
        this.infiniteScroll.disabled = false;
      } else {
        this.infiniteScroll.disabled = true;
      }
    }
  }

  showAlert(message: string, title?: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: resolve
          }
        ]
      });
      await alert.present();
    });
  }

  showPrompt(message: string, inputs: any[], title?: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: title,
        message: message,
        inputs: inputs,
        buttons: [
          {
            text: 'OK',
            handler: data => {
              resolve(data);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(null);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  showConfirm(message: string, title?: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const alert = await this.alertCtrl.create({
        header: title,
        message: message,
        buttons: [
          {
            text: 'OK',
            handler: () => {
              resolve(true);
            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              resolve(false);
            }
          }
        ]
      });
      await alert.present();
    });
  }

  showModal(component: any, data?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const modal = await this.modalCtrl.create({
        component: component,
        componentProps: data
      });
      modal.onDidDismiss().then(data => {
        resolve(data.data);
      });
      await modal.present();
    });
  }

  async closeModal(data?: any): Promise<void> {
    await this.modalCtrl.dismiss(data);
  }

  showPopover(event: Event, component: any, data?: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const popover = await this.popoverCtrl.create({
        component: component,
        componentProps: data,
        event: event
      });
      popover.onDidDismiss().then(data => {
        resolve(data.data);
      });
      await popover.present();
    });
  }

  async closePopover(data?: any): Promise<void> {
    await this.popoverCtrl.dismiss(data);
  }
}
