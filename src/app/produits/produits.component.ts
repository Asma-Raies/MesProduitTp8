import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Produit } from '../model/produits.model';
import { AuthService } from '../service/auth.service';
//import { AuthService } from '../service/auth.service';
import { ProduitService } from '../service/produit.service';
@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  produits!: Produit[];

  constructor(  private produitService : ProduitService,
    public authService: AuthService,
    private router : Router ){
   //this.produits=[];
  // this.produits =this.produitService.listeProduits();
  }
    
  ngOnInit(): void {
    this.produitService.listeProduit().subscribe(prods => {
      console.log(prods);
      this.produits = prods;
      });
  }
  supprimerProduit(p: Produit)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.produitService.supprimerProduit(p.idProduit!).subscribe(() => {
  console.log("produit supprimé");
  this.SuprimerProduitDuTableau(p);
  });
 
  }
  SuprimerProduitDuTableau(prod : Produit) {
    this.produits.forEach((cur, index) => {
    if(prod.idProduit=== cur.idProduit) {
    this.produits.splice(index, 1);
    }
    });
    }
}


