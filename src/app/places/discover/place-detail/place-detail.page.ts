import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';

import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {
  place: Place;

  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private placesService: PlacesService,
    private modalCtrl: ModalController ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
        return;
      }
      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });
  }

  onBookPlace() {
    // with this Option you are not going back to the last page, you're going forward and generate a new Page on the Stack
    // this.router.navigateByUrl('/places/tabs/discover');
    // with this Option you are routing to your last used Page on your stack
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this Option clears the Pagestack and is not helpfull wenn you refresh the app in a detail page and try to go back,
    // this.navCtrl.pop();

    this.modalCtrl.create({
      component: CreateBookingComponent,
       componentProps: { selectedPlace: this.place }
      }).then
      (modalEl => {
      modalEl.present();
      return modalEl.onDidDismiss();
    })
    .then(resultData => {
      console.log(resultData, resultData.role);
      if (resultData.role === 'confirm') {
        console.log('Booked!');
      }
    });
  }

}
