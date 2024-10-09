import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VotesuccessComponent } from './votesuccess.component';

describe('VotesuccessComponent', () => {
  let component: VotesuccessComponent;
  let fixture: ComponentFixture<VotesuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VotesuccessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VotesuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
