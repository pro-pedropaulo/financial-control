import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';
import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';
import { Transaction } from '../../models/transaction.model';

@Component({
  selector: 'app-financial-control',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective, ConfirmModalComponent],
  templateUrl: './financial-control.component.html',
  styleUrls: ['./financial-control.component.scss'],
  providers: [provideNgxMask()],
})
export class FinancialControlComponent {
  description = '';
  amount = 0;
  type = 'income';
  transactions: Transaction[] = [];
  totalIncomes = 0;
  totalExpenses = 0;
  total = 0;
  showConfirmModal = false;
  transactionToDelete: Transaction | null = null;

  constructor() {
    this.loadTransactions();
  }

  addTransaction() {
    const newTransaction: Transaction = {
      description: this.description,
      amount: this.amount,
      type: this.type,
    };
    this.transactions.push(newTransaction);
    this.saveTransactions();
    this.calculateTotals();
    this.description = '';
    this.amount = 0;
    this.type = 'income';
  }

  openConfirmModal(transaction: Transaction) {
    this.transactionToDelete = transaction;
    this.showConfirmModal = true;
  }

  closeConfirmModal() {
    this.transactionToDelete = null;
    this.showConfirmModal = false;
  }

  confirmDeletion() {
    if (this.transactionToDelete) {
      this.removeTransaction(this.transactionToDelete);
      this.closeConfirmModal();
    }
  }

  removeTransaction(transaction: Transaction) {
    const index = this.transactions.indexOf(transaction);
    if (index > -1) {
      this.transactions.splice(index, 1);
      this.saveTransactions();
      this.calculateTotals();
    }
  }

  loadTransactions() {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      this.transactions = JSON.parse(storedTransactions);
      this.calculateTotals();
    }
  }

  saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(this.transactions));
  }

  calculateTotals() {
    this.totalIncomes = this.transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + t.amount, 0);
    this.totalExpenses = this.transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + t.amount, 0);
    this.total = this.totalIncomes - this.totalExpenses;
  }

  getTransactionType(type: string): string {
    return type === 'income' ? 'Entrada' : 'Saída';
  }
}
