import { Directive, ElementRef, InputSignal, OnInit, input } from "@angular/core";
import { BidimentionalCoords } from "../glow/glow.types";

@Directive(
  {
    selector: '[skew-effect]',
    standalone: true,
    host: {
      '[style.transform]': 'coords',
      '(mouseover)': 'UpdateCoords($event)',
      '(mousemove)': 'UpdateCoords($event)',
      '(mouseleave)': 'ResetCoords()'
    }
  }
)
export class Skew implements OnInit {
  public perspective: InputSignal<string> = input<string>('700px', { 'alias': 'skew-perspective' });
  public xRange: InputSignal<number> = input<number>(2, { 'alias': 'x-range' });
  public yRange: InputSignal<number> = input<number>(2, { 'alias': 'y-range' });
  protected _xAxe!: number;
  protected _yAxe!: number;

  private Onset: boolean = false;

  protected get coords(): string {
    return `rotateX(${this._xAxe * this.xRange()}deg) rotateY(${this._yAxe * this.yRange()}deg) perspective(${this.perspective()})`
  }

  public constructor(
    private _el: ElementRef<HTMLElement>
  ) { }

  public ngOnInit(): void {
    this.ResetCoords();
  }

  protected async UpdateCoords($event: MouseEvent): Promise<void> {
    let box_size: Partial<BidimentionalCoords> = {};
    ({ clientHeight: box_size.y, clientWidth: box_size.x } = this._el.nativeElement);
    let { left, top }: DOMRect = this._el.nativeElement.getBoundingClientRect();
    this._xAxe = ($event.clientX - left - (box_size.x * 0.5)) / (box_size.x * 0.5);
    this._yAxe = ($event.clientY - top - (box_size.y * 0.5)) / (box_size.y * 0.5);
    if(!this.Onset) {
      this.Onset = !this.Onset;
      new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          this._el.nativeElement.style.removeProperty('transition');
          resolve();
        }, 500);
      })
    }
  }

  protected ResetCoords(): void {
    this._xAxe = this._yAxe = 0;
    this._el.nativeElement.style.setProperty('transition', 'all .5s linear')
    this.Onset = false;
  }
}