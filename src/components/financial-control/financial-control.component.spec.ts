import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FinancialControlComponent } from './financial-control.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Transaction } from '../../models/transaction.model';

describe('FinancialControlComponent', () => {
  let component: FinancialControlComponent;
  let fixture: ComponentFixture<FinancialControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        NgxMaskDirective,
        FinancialControlComponent,
        ConfirmModalComponent,
      ],
      providers: [provideNgxMask()],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancialControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.description).toBe('');
    expect(component.amount).toBe(0);
    expect(component.type).toBe('income');
    expect(component.transactions).toEqual([]);
    expect(component.totalIncomes).toBe(0);
    expect(component.totalExpenses).toBe(0);
    expect(component.total).toBe(0);
    expect(component.showConfirmModal).toBe(false);
    expect(component.transactionToDelete).toBeNull();
  });

  it('should add a transaction', () => {
    component.description = 'Test Income';
    component.amount = 100;
    component.type = 'income';
    component.addTransaction();
    expect(component.transactions.length).toBe(1);
    expect(component.transactions[0].description).toBe('Test Income');
    expect(component.transactions[0].amount).toBe(100);
    expect(component.transactions[0].type).toBe('income');
    expect(component.totalIncomes).toBe(100);
    expect(component.totalExpenses).toBe(0);
    expect(component.total).toBe(100);
  });

  it('should open confirm modal for deletion', () => {
    const transaction: Transaction = {
      description: 'Test',
      amount: 50,
      type: 'income',
    };
    component.transactions.push(transaction);
    component.openConfirmModal(transaction);
    expect(component.showConfirmModal).toBe(true);
    expect(component.transactionToDelete).toBe(transaction);
  });

  it('should close confirm modal', () => {
    component.showConfirmModal = true;
    component.transactionToDelete = {
      description: 'Test',
      amount: 50,
      type: 'income',
    };
    component.closeConfirmModal();
    expect(component.showConfirmModal).toBe(false);
    expect(component.transactionToDelete).toBeNull();
  });

  it('should confirm deletion of a transaction', () => {
    const transaction: Transaction = {
      description: 'Test',
      amount: 50,
      type: 'income',
    };
    component.transactions.push(transaction);
    component.openConfirmModal(transaction);
    component.confirmDeletion();
    expect(component.transactions.length).toBe(0);
    expect(component.showConfirmModal).toBe(false);
    expect(component.transactionToDelete).toBeNull();
  });

  it('should load transactions from localStorage', () => {
    const transactions: Transaction[] = [
      { description: 'Income', amount: 100, type: 'income' },
      { description: 'Expense', amount: 50, type: 'expense' },
    ];
    localStorage.setItem('transactions', JSON.stringify(transactions));
    component.loadTransactions();
    expect(component.transactions).toEqual(transactions);
    expect(component.totalIncomes).toBe(100);
    expect(component.totalExpenses).toBe(50);
    expect(component.total).toBe(50);
  });

  it('should save transactions to localStorage', () => {
    const transaction: Transaction = {
      description: 'Test',
      amount: 50,
      type: 'income',
    };
    component.transactions.push(transaction);
    component.saveTransactions();
    const storedTransactions = JSON.parse(
      localStorage.getItem('transactions') || '[]',
    );
    expect(storedTransactions.length).toBe(1);
    expect(storedTransactions[0].description).toBe('Test');
  });

  it('should calculate totals correctly', () => {
    component.transactions = [
      { description: 'Income 1', amount: 100, type: 'income' },
      { description: 'Expense 1', amount: 50, type: 'expense' },
    ];
    component.calculateTotals();
    expect(component.totalIncomes).toBe(100);
    expect(component.totalExpenses).toBe(50);
    expect(component.total).toBe(50);
  });

  it('should return the correct transaction type label', () => {
    expect(component.getTransactionType('income')).toBe('Entrada');
    expect(component.getTransactionType('expense')).toBe('Saída');
  });
});
