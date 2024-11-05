import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <h1>Kredi Hesaplama</h1>
    <div>
      <label>Kredi Tutarı</label>
      <input [(ngModel)]="krediTutari" type="number" placeholder="0" />
    </div>
    <div>
      <label>Taksit Sayısı</label>
      <select [(ngModel)]="taksitSayisi">
        <option *ngFor="let data of taksitler">{{ data }}</option>
      </select>
    </div>
    <div>
      <button (click)="hesapla()">Hesapla</button>
    </div>
    <hr />
    <h2 *ngIf="result">{{ result }}</h2>
    <hr />
    <table *ngIf="odemePlani.length > 0">
      <thead>
        <tr>
          <th>Taksit</th>
          <th>Taksit Tutarı</th>
          <th>Kalan Geri Ödeme</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of odemePlani; let i = index">
          <td>{{ i + 1 }}</td>
          <td>{{ data.taksitTutari | number : '1.2-2' }}</td>
          <td>{{ data.kalanGeriOdeme | number : '1.2-2' }}</td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        text-align: center;
      }

      body {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #f4f4f9;
        color: #333;
      }

      app-root {
        width: 100%;
        max-width: 400px;
        padding: 20px;
        background-color: #ffffff;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
      }

      h1 {
        font-size: 24px;
        color: #4caf50;
        text-align: center;
        margin-bottom: 20px;
        font-weight: bold;
      }

      div {
        margin-bottom: 15px;
      }

      label {
        font-size: 14px;
        font-weight: bold;
        display: block;
        color: #666;
        margin-bottom: 5px;
      }

      input[type='number'],
      select {
        width: 10%;
        padding: 8px;
        font-size: 14px;
        border: 1px solid #ddd;
        border-radius: 4px;
        transition: border-color 0.3s;
      }

      input[type='number']:focus,
      select:focus {
        border-color: #4caf50;
        outline: none;
      }

      button {
        width: 5%;
        padding: 10px;
        background-color: #4caf50;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 14px;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      button:hover {
        background-color: #45a049;
      }

      hr {
        margin: 20px 0;
        border: none;
        border-top: 1px solid #ddd;
        width: 50%;
        margin-left: 25%
      }

      h2 {
        font-size: 20px;
        color: #4caf50;
        text-align: center;
        font-weight: normal;
        margin-bottom: 20px;
      }

      table {
        width: 100%;
        border-collapse: collapse;
        margin-top: 20px;
        text-align: center;
      }

      th,
      td {
        padding: 8px;
        border-bottom: 1px solid #ddd;
      }

      th {
        background-color: #f7f7f7;
        font-weight: bold;
      }

      tbody tr:hover {
        background-color: #f2f2f2;
      }

      td {
        color: #333;
      }
    `,
  ],
})
export class AppComponent {
  krediTutari: number = 0;
  taksitSayisi: number = 3;

  taksitler: number[] = [3, 6, 12, 24];

  result: string = '';

  odemePlani: { taksitTutari: number; kalanGeriOdeme: number }[] = [];

  hesapla() {
    const taksitTutari: number = (this.krediTutari / this.taksitSayisi) * 1.29;
    let toplamGeriOdeme: number = taksitTutari * this.taksitSayisi;
    this.result = `Taksit Tutarı: ${taksitTutari.toFixed(2)} - Taksit Sayısı: ${
      this.taksitSayisi
    } - Toplam Geri Ödeme: ${toplamGeriOdeme.toFixed(2)}`;

    this.odemePlani = [];
    for (let i = 0; i < this.taksitSayisi; i++) {
      toplamGeriOdeme -= taksitTutari;
      const data = {
        taksitTutari: taksitTutari,
        kalanGeriOdeme: toplamGeriOdeme,
      };
      this.odemePlani.push(data);
    }
  }
}
