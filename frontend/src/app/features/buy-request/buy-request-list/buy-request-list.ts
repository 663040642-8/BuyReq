import { Component, inject } from '@angular/core';
import { BuyRequestService } from '../buy-request-service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-buy-request-list',
  imports: [RouterModule],
  templateUrl: './buy-request-list.html',
  styleUrl: './buy-request-list.css'
})
export class BuyRequestList {
  buyRequestService = inject(BuyRequestService);

  buyRequests = this.buyRequestService.buyRequests
  loading = this.buyRequestService.loading;

  ngOnInit() {
    this.buyRequestService.getBuyRequests();
  }
} 
