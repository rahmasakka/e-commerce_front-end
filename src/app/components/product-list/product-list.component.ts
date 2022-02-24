import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  //templateUrl: './product-list-table.component.html',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    }
    else {
      this.handleListProducts();
    }
  }

  handleSearchProducts(){
    const theKeyword: string = String(this.route.snapshot.paramMap.get('keyword'));
    
    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe(
      data => {
        this.products = data;
      }
    )

  }



  handleListProducts() {
    //check if "id" parameter is available

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    // const hasCategoryId: boolean = this.route/*use the activated route*/.snapshot/*State of route at this given moment in time*/.paramMap/*Map of all the route parameters*/.has('id');


    if (hasCategoryId) {
      // get the "id" param string. convert string to a numberusing the "+" symbol
      this.currentCategoryId = Number(this.route.snapshot.paramMap.get('id'));
    } else {
      // not category id available ... default to category id 1
      this.currentCategoryId = 1;
    }

    console.log(this.productService.getProductList(this.currentCategoryId));


    //now get the products for the given category id 
    this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )
  }

}