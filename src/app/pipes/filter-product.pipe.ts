import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product';
import { Filter } from '../interfaces/filter';

@Pipe({
  name: 'filterProduct',
  standalone: true,
})
export class FilterProductPipe implements PipeTransform {
  transform(products: Product[], filter: Filter): Product[] {
    console.log('PIPE:', products, filter);

    let filteredProducts = products;

    if (filter.category != '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.category.toLocaleLowerCase() ===
          filter.category.toLocaleLowerCase()
      );
    }

    if (filter.year != '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          new Date(product.end_date).getFullYear().toString() === filter.year
      );
    }

    if (filter.month != '') {
      filteredProducts = filteredProducts.filter(
        (product) =>
          (new Date(product.end_date).getMonth() + 1).toString() ===
          filter.month
      );
    }

    if (filter.state !== null && filter.state !== '') {
      filteredProducts = filteredProducts.filter(
        (product) => product.state.toString() === filter.state
      );
    }

    if (filter.search != '') {
      const searchMin = filter.search.toLowerCase();
      filteredProducts = filteredProducts.filter((product) =>
        Object.values(product).some((prop) => {
          if (typeof prop === 'string') {
            return prop.toLowerCase().includes(searchMin);
          }
          return false;
        })
      );
    }

    if (filter.sort != '') {
      filteredProducts = this.sortProducts(filteredProducts, filter);
    }

    return filteredProducts;
  }

  private sortProducts(products: Product[], filter: Filter): Product[] {
    switch (parseInt(filter.sort.toString())) {
      case 1: // Precio Descendente
        return products.sort((a, b) => b.current_bid - a.current_bid);
      case 2: // Precio Ascendente
        return products.sort((a, b) => a.current_bid - b.current_bid);
      case 3: // A-Z
        return products.sort((a, b) =>
          a.commercial_name.localeCompare(b.commercial_name)
        );
      case 4: // Z-A
        return products.sort((a, b) =>
          b.commercial_name.localeCompare(a.commercial_name)
        );
      default:
        return products;
    }
  }
}
