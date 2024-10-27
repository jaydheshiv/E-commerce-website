import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderedProductsComponent } from './order-track.component';

describe('OrderedProductsComponent', () => {
  let component: OrderedProductsComponent;
  let fixture: ComponentFixture<OrderedProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderedProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
