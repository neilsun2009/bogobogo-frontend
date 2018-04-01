import { animate, AnimationEntryMetadata, state, style, transition, trigger } from '@angular/core';

// router scale-out animation
export const scaleOutAnimation: AnimationEntryMetadata =
  trigger('scaleOut', [
    state('*', style({})),
    transition(':leave', [
      animate('300ms ease-in', style({opacity: 0, transform: 'scale(3)'/*'translateY(1000px)'*/}))
    ])
  ]);

// loading animation
export const loadingAnimation: AnimationEntryMetadata =
  trigger('loading', [
    state('*', style({})),
    transition(':leave', [
      animate('500ms ease-in', style({opacity: 0, transform: 'scale(0)'/*'translateY(1000px)'*/}))
    ])
  ]);
