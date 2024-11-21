import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-data-display',
  imports: [CommonModule, HttpClientModule],
  templateUrl: './data-display.component.html',
  styleUrl: './data-display.component.css'
})
export class DataDisplayComponent implements OnInit {

  httpClient = inject(HttpClient);
  data: any = [];
  ngOnInit(): void {
    this.fetchData();
  }
  
    fetchData(){
      this.httpClient
      .get('http://localhost:7777/students')
      .subscribe((data: any) => {
      console.log(data);
      this.data = data;
    });
    }
  
}