import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-panel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './info-panel.component.html',
  styleUrls: ['./info-panel.component.css']
})
export class InfoPanelComponent {

  @Input() titlePrefix!: string;
  @Input() titleHighlight !: string;
  @Input() subtitle!: string;
  @Input() description!: string;
  @Input() list?: string[];

}
