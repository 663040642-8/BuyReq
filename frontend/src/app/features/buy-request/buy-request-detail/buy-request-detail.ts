import { Component, inject, OnInit, signal } from '@angular/core';
import { BuyRequest } from '../buy-request-model';
import { BuyRequestService } from '../buy-request-service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SellRequestForm } from '../../sell-request/sell-request-form/sell-request-form';

@Component({
  selector: 'app-buy-request-detail',
  imports: [RouterModule,SellRequestForm],
  templateUrl: './buy-request-detail.html',
  styleUrl: './buy-request-detail.css'
})
export class BuyRequestDetail implements OnInit {
  buyRequest = signal<BuyRequest | null>(null);
  loading = signal(false);
  showSellRequestForm = signal(false);

  buyRequestService = inject(BuyRequestService);
  route = inject(ActivatedRoute);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      return;
    }

    this.loading.set(true);
    this.buyRequestService.getBuyRequestById(id).subscribe({
      next: (data) => {
        this.buyRequest.set(data);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        this.loading.set(false);
      },
    });
  }

  openSellRequestForm() {
    this.showSellRequestForm.set(true);
  }

  closeSellRequestForm() {
    this.showSellRequestForm.set(false);
  }
}

