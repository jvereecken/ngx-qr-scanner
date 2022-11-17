import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import QrScanner from 'qr-scanner';

@Component({
  selector: 'ngx-qr-scanner',
  template: `
    <video #videoFeed></video>
  `,
  styles: [
    `
      video {
        width: 100%;
        height: 100%;
      }
    `
  ]
})
export class NgxQrScannerComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Output() decode = new EventEmitter<QrScanner.ScanResult>();
  @Output() decodeError = new EventEmitter<string | Error>();
  @Output() ready = new EventEmitter<void>();

  @Input() preferredCamera: QrScanner.FacingMode | QrScanner.DeviceId = "environment";
  @Input() maxScansPerSecond: number | undefined = 1;
  @Input() deviceId?: string;
  @Input() highlightScanRegion: boolean = true;
  @Input() highlightCodeOutline: boolean = true;
  @Input() calculateScanRegion: ((video: HTMLVideoElement) => QrScanner.ScanRegion) | undefined;
  @Input() overlay: HTMLDivElement | undefined;

  private _qrScanner: QrScanner | undefined;

  @ViewChild('videoFeed') private videoFeed?: ElementRef<HTMLVideoElement>;

  ngAfterViewInit() {
    if (this.videoFeed) {
      this._qrScanner = new QrScanner(
        this.videoFeed.nativeElement,
        result => this.decode.emit(result),
        {
          onDecodeError: error => this.decodeError.emit(error),
          preferredCamera: this.deviceId ?? this.preferredCamera,
          maxScansPerSecond: this.maxScansPerSecond,
          returnDetailedScanResult: true,
          highlightScanRegion: this.highlightScanRegion,
          highlightCodeOutline: this.highlightCodeOutline,
          calculateScanRegion: this.calculateScanRegion,
          overlay: this.overlay,
      });

      this._qrScanner.start();
      this.ready.emit();
    } else {
      console.error('something went wrong');
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['deviceId']) {
      const change = changes['deviceId'];
      this._qrScanner?.setCamera(change.currentValue);
    }
  }

  ngOnDestroy() {
    this._qrScanner?.destroy();
    this._qrScanner = undefined;
  }
}
