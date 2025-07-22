import { Component, Input, Output, EventEmitter, ContentChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-btn-submit',
  imports: [CommonModule],
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.css']
})
export class SubmitComponent {

  @Input() label = '';
  @Input() type: 'button' | 'submit' = 'button';
  @Input() btnClass = 'btn';
  @Input() extraClasses: string = '';
  @Input() disabled = false;
  @Input() loading = false;
  @Output() onClick = new EventEmitter<Event>();

  @ContentChildren('content', {descendants: true}) contentChildren!: QueryList<any>;
  hasContent = false;

  ngAfterContentInit() {
    this.hasContent = this.contentChildren && this.contentChildren.length > 0;
  }

}
