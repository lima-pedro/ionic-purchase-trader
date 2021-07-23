import { Component, ChangeDetectorRef } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { InAppPurchase2, IAPProduct } from '@ionic-native/in-app-purchase-2/ngx';
import { RevistaService } from '../services/revista.service';

const PRODUCT_TEST = "rev01_teste";
// const PRODUCT_TEST_PRO = "rev01_teste_pro";
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {

    gems: number = 0;
    isPro: boolean = false;
    products: IAPProduct[] = [];
    revistas: Array<any> = [];

    constructor(
        private plt: Platform,
        private store: InAppPurchase2,
        private ref: ChangeDetectorRef,
        private revistaService: RevistaService,
        private router: Router,
    ) {
        this.plt.ready().then(() => {
            this.store.verbosity = this.store.DEBUG;

            this.registerProducts();
            this.setupListeners();

            this.store.ready(() => {
                this.products = this.store.products;
                this.ref.detectChanges();
            })
        });
    }

    ionViewDidEnter() {
        this.buscarRevistas();
        console.log(this.revistas);
    }

    buscarRevistas() {
        this.revistas = [];
        this.revistaService.getAll().subscribe(data => {
            data.map(c => {
                let revista: any = c.payload.doc.data();
                this.revistas.push({
                    ...revista,
                    id: c.payload.doc.id
                })
            })
        })
    }

    getProducts () {    
    }

    registerProducts() {
        this.store.register({
            id: PRODUCT_TEST,
            type: this.store.CONSUMABLE
        })

        // this.store.register({
        //     id: PRODUCT_TEST_PRO,
        //     type: this.store.NON_CONSUMABLE
        // })

        this.store.refresh();
    }

    setupListeners() {
        console.log(this.store.when('product'));
        this.store.when('product')
            .approved((product: IAPProduct) => {
                this.ref.detectChanges();
                return product.verify();
            })
            .verified((product: IAPProduct) => product.finish());

        this.store.when(PRODUCT_TEST).owned((p: IAPProduct) => {
            this.isPro = true;
        })
    }

    purchase(product: IAPProduct) {
        this.store.order(product).then(p => {
            console.log(`p order`, p)
        }, e => {
            console.log("Erro", e)
        })
    }

    restore() {
        this.store.refresh();
    }

    abrirRevista(id_revista: string) {
        console.log(id_revista);
        const revista = this.revistas.filter(encontrado => encontrado.id === id_revista)
        const navigationExtras: NavigationExtras = {
            state: {
                revista: revista[0]
            },
        };
        this.router.navigate(["/visualizacao"], navigationExtras);
    }

    assinaturaRevista(id_revista: string) {

    }
}
