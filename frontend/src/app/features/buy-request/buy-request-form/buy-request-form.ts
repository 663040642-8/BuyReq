import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateBuyRequestDto } from '../buy-request-model';
import { BuyRequestService } from '../buy-request-service';

@Component({
  selector: 'app-buy-request-form',
  imports: [ReactiveFormsModule],
  templateUrl: './buy-request-form.html',
  styleUrl: './buy-request-form.css'
})
export class BuyRequestForm {
  buyRequest = inject(BuyRequestService);
  router = inject(Router);
  fb = inject(FormBuilder);
  loading = signal<boolean>(false);

  buyRequestForm = this.fb.group({
    title: ['', Validators.required],
    description: [null as string | null],
    minPrice: [null as number | null, Validators.min(0)],
    maxPrice: [null as number | null, Validators.min(0)],
    quantity: [null as number | null, Validators.min(0)],
  });

  onSubmit() {
    if (this.buyRequestForm.invalid) {
      this.buyRequestForm.markAllAsTouched();
      return;
    }
    this.loading.set(true);

    const rawValue = this.buyRequestForm.getRawValue();

    const formValue: CreateBuyRequestDto = {
      title: rawValue.title!,
      description: rawValue.description ?? undefined,
      minPrice: rawValue.minPrice ?? undefined,
      maxPrice: rawValue.maxPrice ?? undefined,
      quantity: rawValue.quantity ?? undefined,
    };

    this.buyRequest.addBuyRequest(formValue).subscribe({
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
