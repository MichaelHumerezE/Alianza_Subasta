import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
import { Filter } from '../interfaces/filter';

@Pipe({
  name: 'filterProduct',
  standalone: true,
})
export class FilterProductPipe implements PipeTransform {
  filters?: Filter;

  ngOnChange() {
    if (this.filters) {
      console.log(this.filters);
    }
  }

  transform(products: Product[], ...args: string[]): Product[] {
    let filteredProducts = products;

    if (args[0] != '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLocaleLowerCase() === args[0].toLocaleLowerCase()
      );
    }

    if (args[1] != '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          (new Date(product.end_date).getMonth() + 1).toString() === args[1]
      );
    }

    if (args[2] != '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          new Date(product.end_date).getFullYear().toString() === args[2]
      );
    }

    if (args[3] != '') {
      const searchMin = args[3].toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        Object.values(product).some((prop) => {
          if (typeof prop === 'string') {
            return prop.toLowerCase().includes(searchMin);
          }
          return false;
        })
      );
    }

    if (args[4] != '') {
      console.log('entorrrr');
      filteredProducts = this.sortProducts(filteredProducts, args[4]);
    }

    if (args[5] !== '') {
      if (args[5] == '3' || args[5] == '4') {
        filteredProducts = filteredProducts.filter(
          (product) => product.state.toString() === '3' || product.state.toString() === '4'
        );
      } else {
        filteredProducts = filteredProducts.filter(
          (product) => product.state.toString() === args[5]
        );
      }
    }

    return filteredProducts;
  }

  private sortProducts(products: Product[], index: string): Product[] {
    switch (parseInt(index)) {
      case 0: // Precio Descendente
        return products.sort((a, b) => b.current_bid - a.current_bid);
      case 1: // Precio Ascendente
        return products.sort((a, b) => a.current_bid - b.current_bid);
      case 2: // A-Z
        return products.sort((a, b) =>
          a.commercial_name.localeCompare(b.commercial_name)
        );
      case 3: // Z-A
        return products.sort((a, b) =>
          b.commercial_name.localeCompare(a.commercial_name)
        );
      default:
        return products;
    }
  }
}
