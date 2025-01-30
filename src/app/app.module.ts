import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { ShopComponent } from './components/shop/shop.component';
import { IntroSectionComponent } from './components/intro-section/intro-section.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { CompanyInfosComponent } from './components/company-infos/company-infos.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { TokenInterceptor } from './services/token.interceptor';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { ConditionsComponent } from './components/infos/conditions/conditions.component';
import { PrivacyComponent } from './components/infos/privacy/privacy.component';
import { WithdrawalComponent } from './components/infos/withdrawal/withdrawal.component';
import { AddressComponent } from './components/address/address.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { AboutComponent } from './components/about/about.component';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FavoritesComponent,
    CartComponent,
    ShopComponent,
    IntroSectionComponent,
    FeaturedProductsComponent,
    CompanyInfosComponent,
    ProductCardComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    ProductComponent,
    ConditionsComponent,
    PrivacyComponent,
    WithdrawalComponent,
    AddressComponent,
    OrderSummaryComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    NgxSliderModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    provideHttpClient(
      withInterceptorsFromDi()
    ),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
