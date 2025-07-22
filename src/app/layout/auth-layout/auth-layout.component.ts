import { Component, HostListener, Renderer2 } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.css']
})
export class AuthLayoutComponent {
  colorStops = [
    { x: 0.0, color1: "#fdfbfb", color2: "#ebedee" },
    { x: 0.15, color1: "#f7e7e2", color2: "#ffe2ec" },
    { x: 0.31, color1: "#e6f3ff", color2: "#f7f8ff" },
    { x: 0.47, color1: "#eafbf7", color2: "#f3e6fa" },
    { x: 0.62, color1: "#fffbe6", color2: "#e6f7ff" },
    { x: 0.78, color1: "#f5e6ff", color2: "#e6faff" },
    { x: 0.93, color1: "#e8ffe6", color2: "#fff9e6" },
    { x: 1.0, color1: "#fdfbfb", color2: "#ebedee" },
  ];

  constructor(private renderer: Renderer2) {}

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent) {
    const xFrac = e.clientX / window.innerWidth;
    let idx = 0;
    for (let i = 0; i < this.colorStops.length - 1; i++) {
      if (xFrac >= this.colorStops[i].x && xFrac <= this.colorStops[i + 1].x) {
        idx = i;
        break;
      }
    }
    const t =
      (xFrac - this.colorStops[idx].x) /
      (this.colorStops[idx + 1].x - this.colorStops[idx].x);
    const color1 = this.interpolateColor(
      this.colorStops[idx].color1,
      this.colorStops[idx + 1].color1,
      t
    );
    const color2 = this.interpolateColor(
      this.colorStops[idx].color2,
      this.colorStops[idx + 1].color2,
      t
    );
    this.renderer.setStyle(
      document.body,
      'background',
      `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`
    );
  }

  interpolateColor(hex1: string, hex2: string, t: number): string {
    const a = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex1)!;
    const b = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex2)!;
    const c1 = [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)];
    const c2 = [parseInt(b[1], 16), parseInt(b[2], 16), parseInt(b[3], 16)];
    const rgb = c1.map((v, i) => Math.round(v + (c2[i] - v) * t));
    return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
  }
}