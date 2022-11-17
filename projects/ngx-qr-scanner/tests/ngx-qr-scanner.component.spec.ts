import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgxQrScannerComponent } from '../src/lib/ngx-qr-scanner.component';

describe('NgxQrScannerComponent', () => {
  let component: NgxQrScannerComponent;
  let fixture: ComponentFixture<NgxQrScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NgxQrScannerComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxQrScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
