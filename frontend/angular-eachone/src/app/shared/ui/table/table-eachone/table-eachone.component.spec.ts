import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEachoneComponent } from './table-eachone.component';

describe('TableEachoneComponent', () => {
  let component: TableEachoneComponent;
  let fixture: ComponentFixture<TableEachoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableEachoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableEachoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
