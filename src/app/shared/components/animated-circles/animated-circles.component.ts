import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-animated-circles',
  imports: [CommonModule],
  templateUrl: './animated-circles.component.html',
  styleUrls: ['./animated-circles.component.css']
})
export class AnimatedCirclesComponent implements OnInit {
  @Input() circlesConfig: any[][] = [];
  keyframesStyles: string[] = [];

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    // If config not passed, use a default
    if (!this.circlesConfig.length) {
      this.circlesConfig = [
        [75, 10, 10, '#ffb86c88', '#ff6e7f77', 7, 0],
        [55, 220, 110, '#8e71fb99', '#01c8ee77', 8, 2.2],
        [40, 10, 200, '#ffb86c99', '#8e71fb44', 8.8, 3],
        [30, 250, 220, '#ffb86c33', '#8e71fb66', 9.1, 1.1],
        [55, 125, 10, '#8e71fb44', '#ff6e7f66', 10, 0.7],
        [24, 10, 10, '#ff6e7f44', '#ffb86c66', 9.5, 5.4],
        [32, 50, 110, '#ffb86c55', '#8e71fb55', 8.5, 3.7],
        [40, 120, 240, '#ffb86c44', '#ff6e7f99', 8.1, 4.2],
        [23, 65, 65, '#ff6e7f44', '#8e71fb66', 7.8, 6.8],
        [40, 200, 60, '#8e71fb99', '#ffb86c44', 10.2, 7.5],
        [33, 70, 180, '#ffb86c77', '#01c8ee88', 11, 5.9],
        [45, 230, 180, '#8e71fb77', '#ffb86c33', 9.7, 3.2],
        [60, 120, 130, '#01c8ee77', '#ff6e7f66', 12, 1.8],
        [28, 200, 160, '#ff6e7f55', '#8e71fb33', 8.7, 2.8],
        [19, 60, 140, '#ffb86c33', '#ff6e7f99', 10.8, 6.3],
        [85, 125, 70, '#ffb86c88', '#ff6e7f77', 7.8, 0.5],
        [32, 250, 10, '#ffb86c55', '#8e71fb55', 8.5, 3.7],
        [20, 125, 40, '#ffb86c44', '#ff6e7f99', 8.1, 4.2],
        [23, 60, 65, '#ff6e7f44', '#8e71fb66', 7.8, 6.8],
        [40, 20, 60, '#8e71fb99', '#ffb86c44', 10.2, 7.5],
      ];
    }
    this.injectKeyframes();
  }

  injectKeyframes() {
    this.circlesConfig.forEach((c, idx) => {
      const angle1 = Math.floor(20 + Math.random() * 50);
      const angle2 = Math.floor(10 + Math.random() * 30);
      const ampX = Math.floor(6 + Math.random() * 19);
      const ampY = Math.floor(5 + Math.random() * 17);

      const keyframes = `
        @keyframes floatCircle${idx} {
          0% { transform: translate(0, 0) scale(1);}
          50% { transform: translate(${ampX}px, -${ampY}px) scale(1.08);}
          100% { transform: translate(-${angle1}px, ${angle2}px) scale(0.96);}
        }
      `;
      // Inject style into document head
      const styleEl = this.renderer.createElement('style');
      styleEl.innerHTML = keyframes;
      this.renderer.appendChild(document.head, styleEl);
    });
  }
}