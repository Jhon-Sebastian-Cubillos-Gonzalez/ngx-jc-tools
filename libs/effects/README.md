# @ngx-jc-tools/effects

Angular fancy effects library

## Installation

Install the pacjage with npm

```shell
  npm add @ngx-jc-tools/effects
```

## Effects

### Glow

Glow effect Angular component inspired by [react-glow]((https://codaworks.com)).

#### Usage

Use the custom tag `<glow-effect>`

##### params

|name|condition|default|
|-|-|-|
|border-radius|optional||
|background|required||
|border-color|required||
|border-size|optional|5px|
|color|required||
|size|required||
|transition-speed|optional|150ms|

##### typescript

```ts
import { Glow } from '@ngx-jc-tools/effects';

@Component({
  ...,
  standalone: true,
  imports: [
    ...,
    Glow
  ]
})
(...)
```

##### html

```html
<div class="flex flex-col justify-center items-center min-h-screen bg-[#232323]">
  <!--
    @tag glow-effect
    @attr size set de glow aura size
    @attr transition-speed glow aura transition duration
    @attr border-color passive border color
  -->
  <glow-effect
    border-radius="10px"
    color="#db80e7"
    size="200px"
    transition-speed="2.2s"
    background="#232323"
    border-color="#b0b0b05e"
    border-size="2px"
  >
    <!-- content -->
    ...
  </glow-effect>
</div>
```

#### result

![glow effect gif](./media/glow-ex.gif)

### Skew

Skew effect Angular directive inspired by [github]((https://github.com)).

#### Usage

Use the directive `<element skew-effect>`

##### params

|name|condition|default|
|-|-|-|
|skew-perspective|optional|700px|
|x-range|optional|2|
|y-range|optional|2|

##### typescript

```ts
import { Skew } from '@ngx-jc-tools/effects';

@Component({
  ...,
  standalone: true,
  imports: [
    ...,
    Skew
  ]
})
(...)
```

##### html

```html
<div class="flex flex-col justify-center items-center min-h-screen bg-[#232323]">
  <!--
    @tag element[skew-effect]
    @attr x-range range of degrees on the x axe
    @attr y-range range of degrees on the y axe
    @attr skew-perspective
  -->
  <div skew-effect [x-range]="8" [x-range]="6" class="rounded-md border-2 border-gray-400 sm:py-32 py-24">
    <!-- content -->
    ...
  </div>
</div>
```