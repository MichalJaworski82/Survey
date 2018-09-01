import { trigger, transition, style, animate } from "@angular/animations";

export let fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate(1000)
  ])
]);
