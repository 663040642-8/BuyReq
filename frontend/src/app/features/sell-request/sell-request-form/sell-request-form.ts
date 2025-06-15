import { Component, EventEmitter, inject, Input, Output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SellRequestService } from '../sell-request-service';
import { CreateSellRequestDto } from '../sell-request-model';

@Component({
  selector: 'app-sell-request-form',
  imports: [ReactiveFormsModule],
  templateUrl: './sell-request-form.html',
  styleUrl: './sell-request-form.css'
})
export class SellRequestForm {
  @Input() buyRequestId!: string;
  @Output() close = new EventEmitter<void>();

  description = '';
  quantityOffered?: number;
  priceOffered?: number;
  loading = signal(false);

  sellRequestService = inject(SellRequestService);
  router = inject(Router);
  fb = inject(FormBuilder);

  sellRequestForm = this.fb.group({
    description: [null as string | null],
    quantityOffered: [null as number | null, Validators.min(0)],
    priceOffered: [null as number | null, Validators.min(0)],
  });

  onSubmit() {
    this.loading.set(true);

    const rawValue = this.sellRequestForm.getRawValue();

    const formValue: CreateSellRequestDto = {
      buyRequestId: this.buyRequestId, 
      description: rawValue.description!,
      quantityOffered: rawValue.quantityOffered ?? undefined,
      priceOffered: rawValue.priceOffered ?? undefined,
    };

    this.sellRequestService.addSellRequest(formValue).subscribe({
      next: () => {
        console.log('Add request success');
        this.router.navigate(['/']);
      },
      error: err => {
        console.error('Add request failed', err);
        this.loading.set(false);
      },
      complete: () => {
        this.loading.set(false)
      }
    });
  }
}

