import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  products: any[] = [];
  newProductName: string = '';
  newProductPrice: number = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    this.loadProducts();
  }

  async loadProducts() {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      this.products = response.data.products.map((product: any) => ({
        id: product.id,
        name: product.title,
        description: product.description,
        price: product.price
      }));
    } catch (error) {
      console.error('Error cargando productos:', error);
    }
  }

  async editProduct(product: any) {
    try {
      const response = await axios.put(`https://dummyjson.com/products/${product.id}`, {
        title: product.name,
        description: product.description,
        price: parseFloat(product.price)
      });
      console.log('Producto editado:', response.data);
      // Actualizar el producto localmente
      const index = this.products.findIndex(p => p.id === product.id);
      if (index !== -1) {
        this.products[index] = response.data;
      }
    } catch (error) {
      console.error('Error editando producto:', error);
    }
  }

  async deleteProduct(id: number) {
    try {
      // Eliminar el producto de la lista localmente
      this.products = this.products.filter(product => product.id !== id);
      // Eliminar el producto de la API
      await axios.delete(`https://dummyjson.com/products/${id}`);
      console.log(`Producto eliminado con id ${id}`);
    } catch (error) {
      console.error('Error eliminando producto:', error);
    }
  }

  async addProduct() {
    try {
      const response = await axios.post('https://dummyjson.com/products/add', {
        title: this.newProductName,
        description: '',
        price: parseFloat(this.newProductPrice.toFixed(2))
      });
      const newProduct = response.data;
      this.products.push({
        id: newProduct.id,
        name: newProduct.title,
        description: newProduct.description,
        price: newProduct.price
      });

      // Limpiar los campos de entrada después de agregar el producto
      this.newProductName = '';
      this.newProductPrice = 0;
    } catch (error) {
      console.error('Error agregando producto:', error);
    }
  }
}
