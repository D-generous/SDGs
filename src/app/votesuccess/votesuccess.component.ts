import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-votesuccess',
  standalone: true,
  imports: [],
  templateUrl: './votesuccess.component.html',
  styleUrl: './votesuccess.component.css'
})
export class VotesuccessComponent {

  @Output() closeModal = new EventEmitter<void>();

  close() {
    this.closeModal.emit();
  }

}
