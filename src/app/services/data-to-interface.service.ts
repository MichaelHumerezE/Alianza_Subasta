import { Injectable } from '@angular/core';
import { Product } from '../interfaces/product';
import { Proposer } from '../interfaces/proposer';
import { Category } from '../interfaces/category';
import { Attribute } from '../interfaces/attribute';

@Injectable({
  providedIn: 'root'
})
export class DataToInterfaceService {

  constructor() { }

  dataToInterfaceProposers(data: any[]): Proposer[] {
    return data.map(item => ({
      id: item.id,
      name: item.nombre,
      surname: item.apellido,
      ci: item.ci,
      email: item.correo,
      phone: item.telefono,
      url_img_1: item.url_img_1,
      url_img_2: item.url_img_2,
      verify: item.verificado,
    }));
  }

  dataToInterfaceProposer(data: any): Proposer {
    return {
      id: data.id,
      name: data.nombre,
      surname: data.apellido,
      ci: data.ci,
      email: data.correo,
      phone: data.telefono,
      url_img_1: data.url_img_1,
      url_img_2: data.url_img_2,
      verify: data.verificado,
    } as Proposer;
  }

  dataToInterfaceProducts(data: any[]): Product[] {
    return data.map(item => ({
      id: item.id,
      commercial_name: item.nombre_comercial,
      full_name: item.nombre_completo,
      observation: item.observacion,
      images: JSON.parse(item.images),
      base_price: item.precio_base,
      start_date: item.fecha_inicio,
      end_date: item.fecha_fin,
      category: item.categoria,
      minimum_increase: item.incremento_minimo,
      state: item.estado_subasta,
      timer: null,
      current_bid: item.puja_actual?item.puja_actual:item.precio_base,
    }));
  }

  dataToInterfaceProduct(data: any): Product {
    return {
      id: data.id,
      commercial_name: data.nombre_comercial,
      full_name: data.nombre_completo,
      observation: data.observacion,
      images: JSON.parse(data.images),
      base_price: data.precio_base,
      start_date: data.fecha_inicio,
      end_date: data.fecha_fin,
      category: data.categoria,
      minimum_increase: data.incremento_puja,
      state: data.estado_subasta,
      timer: null,
      current_bid: data.puja_actual?data.puja_actual:data.precio_base,
    } as Product;
  }

  dataToInterfaceCategories(data: any[]): Category[] {
    return data.map(item => ({
      id: item.id,
      name: item.nombre,
      description: item.descripcion,
    }));
  }

  dataToInterfaceCategory(data: any): Category {
    return {
      id: data.id,
      name: data.nombre,
      description: data.descripcion,
    } as Category;
  }

  dataToInterfaceAttributes(data: any[]): Attribute[] {
    return data.map(item => ({
      id: item.id,
      name: item.nombre,
      value: item.valor,
    }));
  }

  dataToInterfaceAttribute(data: any): Attribute {
    return {
      id: data.id,
      name: data.nombre,
      value: data.valor,
    } as Attribute;
  }
}
