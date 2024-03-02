import { ChangeDetectionStrategy, Component, ElementRef, InputSignal, OnInit, Signal, input, viewChild } from "@angular/core";
import { BidimentionalCoords, PixelMeassure } from "./glow.types";

/**
 * ### Glow
 * #### variables
 * |var|def|
 * |---|---|
 * |--glow-x|x axe glow position|
 * |--glow-y|y axe glow position|
 * |--off-glow-x|x translation aura glow coord|
 * |--off-glow-y|y translation aura glow coord|
 * |--glow-color|glow color|
 * |--glow-bg|glow background|
 * |--glow-transition-speed|glow speed|
 * |--glow-size|glow size|
 *
*/
@Component(
  {
    selector: 'ngx-glow-card',
    template: `
      <div class="glow-cotainer">
        <div class="glow-content" #content>
          <ng-content></ng-content>
        </div>
        <div data-target="glow-card.aura" #aura></div>
      </div>
    `,
    standalone: true,
    styleUrl: './glow.component.sass',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
      // '[style.overflow]': `'hidden'`,
      // '[style.display]': `'block'`,
      // '[style.z-index]': '1',
      // '[style.position]': `'relative'`,
      '[style.--glow-x]': 'xAxe',
      '[style.--glow-y]': 'yAxe',
      '[style.--off-glow-x]': '_xOff',
      '[style.--off-glow-y]': '_yOff',
      '[style.--glow-color]': 'color()',
      '[style.--glow-bg]': 'background()',
      '[style.--glow-transition-speed]': 'tranitionSpeed()',
      '[style.--glow-size]': 'size()',
      '[style.--glow-border]': 'border_size()',
      '[style.--glow-border-color]': 'border_color()',
      '[style.--glow-border-radius]': 'border_radius()',
      '[style.border-radius]': 'border_radius()',
      '(mouseover)': 'SetCoords($event)',
      '(mousemove)': 'SetCoords($event)'
    }
  }
)
export class Glow implements OnInit {

  //#region coords
  protected _xAxe!: number;
  protected get xAxe(): PixelMeassure { return `${this._xAxe}px`; }
  //--------------------------------------------------
  protected _yAxe!: number;
  protected get yAxe(): PixelMeassure { return `${this._yAxe}px`; }
  //--------------------------------------------------
  protected _xOff!: number;
  protected _yOff!: number;
  //#endregion coords
  public color: InputSignal<string> = input.required<string>();
  public size: InputSignal<string> = input.required<string>();
  public border_size: InputSignal<string> = input<string>('5px', { 'alias': 'border-size' });
  public border_color: InputSignal<string> = input.required<string>({ 'alias': 'border-color' });
  public border_radius: InputSignal<string | undefined> = input<string | undefined>(undefined, { 'alias': 'border-radius' });
  public background: InputSignal<string> = input.required<string>({ 'alias': 'background' });
  public tranitionSpeed: InputSignal<string> = input<string>('150ms', { 'alias': 'transition-speed' });
  //--------------------------------------------------
  protected aura: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>('aura');
  protected content: Signal<ElementRef<HTMLDivElement>> = viewChild.required<ElementRef<HTMLDivElement>>('content');
  //--------------------------------------------------
  public constructor() { }
  
  public ngOnInit(): void {
    this._xAxe = this._xOff = this._yAxe = this._yOff = 0;
  }

  protected SetCoords($event: MouseEvent): void {
    let content_size: Partial<BidimentionalCoords> = {};
    let aura_size: Partial<BidimentionalCoords> = {};
    ({ clientHeight: content_size.y, clientWidth: content_size.x } = this.content().nativeElement);
    ({ clientHeight: aura_size.y, clientWidth: aura_size.x } = this.aura().nativeElement);
    let { left, top }: DOMRect = this.content().nativeElement.getBoundingClientRect();
    this._xOff = $event.clientX - left - content_size.x + (aura_size.x / 2);
    this._yOff = $event.clientY - top - content_size.y + (aura_size.y / 2);
    this._xAxe = $event.clientX - left;
    this._yAxe = $event.clientY - top;
  }
}