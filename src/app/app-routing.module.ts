import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ShopComponent } from './components/shop/shop.component';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { CartComponent } from './components/cart/cart.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ProductComponent } from './components/product/product.component';
import { ConditionsComponent } from './components/infos/conditions/conditions.component';
import { PrivacyComponent } from './components/infos/privacy/privacy.component';
import { WithdrawalComponent } from './components/infos/withdrawal/withdrawal.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { AboutComponent } from './components/about/about.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'shop', component: ShopComponent },
  { path: 'favorites', component: FavoritesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartComponent },
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product/:id', component: ProductComponent },
  { path: 'conditions', component: ConditionsComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'withdrawal', component: WithdrawalComponent },
  { path: 'order-summary', component: OrderSummaryComponent },

  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
