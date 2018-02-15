import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// router scale-out animation
export const scaleOutAnimation: AnimationEntryMetadata =
  trigger('scaleOut', [
    state('*', style({})),
    transition(':leave', [
      animate('500ms ease-in', style({opacity: 0, transform: 'scale(10)'/*'translateY(1000px)'*/}))
    ])
  ]);
