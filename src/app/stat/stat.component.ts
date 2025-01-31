import { Component } from '@angular/core';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrl: './stat.component.css'
})
export class StatComponent {
  cards = [
    {
      title: 'Energy',
      icon: 'fa-bolt',
      value: '45%',
      color: 'text-blue-500',
      strokeColor: 'stroke-blue-500',
      strokeDashArray: '45, 100',
    },
    {
      title: 'Range',
      icon: 'fa-location-arrow',
      value: '157k',
      color: 'text-red-500',
      strokeColor: 'stroke-red-500',
      strokeDashArray: '75, 100',
    },
    // Add more cards
  ];
}
