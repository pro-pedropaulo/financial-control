import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModalComponent } from './confirm-modal.component';
import { By } from '@angular/platform-browser';

describe('ConfirmModalComponent', () => {
  let component: ConfirmModalComponent;
  let fixture: ComponentFixture<ConfirmModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit confirmed event on confirm button click', () => {
    spyOn(component.confirmed, 'emit');
    const button = fixture.debugElement.query(
      By.css('.actions button:first-child'),
    );
    button.triggerEventHandler('click', null);
    expect(component.confirmed.emit).toHaveBeenCalled();
  });

  it('should emit closed event on close button click', () => {
    spyOn(component.closed, 'emit');
    const button = fixture.debugElement.query(
      By.css('.actions button:last-child'),
    );
    button.triggerEventHandler('click', null);
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should emit closed event on backdrop click', () => {
    spyOn(component.closed, 'emit');
    const backdrop = fixture.debugElement.query(By.css('.modal-backdrop'));
    backdrop.triggerEventHandler('click', null);
    expect(component.closed.emit).toHaveBeenCalled();
  });

  it('should not emit closed event on modal click', () => {
    spyOn(component.closed, 'emit');
    const modal = fixture.debugElement.query(By.css('.modal'));
    modal.triggerEventHandler('click', null);
    expect(component.closed.emit).not.toHaveBeenCalled();
  });
});
