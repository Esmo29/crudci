import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-product',
  templateUrl: './product.page.html',
  styleUrls: ['./product.page.scss'],
})
export class ProductPage implements OnInit {
  product: any = {};
  productId: string | null = null; 

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.loadProduct();
    }
  }

  async loadProduct() {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${this.productId}`);
      this.product = response.data;
    } catch (error) {
      console.error('Error loading product:', error);
    }
  }

  async saveProduct() {
    try {
      if (this.productId) {
        await axios.put(`https://jsonplaceholder.typicode.com/posts/${this.productId}`, this.product);
      } else {
        await axios.post('https://jsonplaceholder.typicode.com/posts', this.product);
      }
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error saving product:', error);
    }
  }
}
