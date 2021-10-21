import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'langue',
    loadChildren: () => import('./langue/langue.module').then( m => m.LanguePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot',
    loadChildren: () => import('./forgot/forgot.module').then( m => m.ForgotPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'guest',
    loadChildren: () => import('./guest/guest.module').then( m => m.GuestPageModule)
  },
  {
    path: 'note',
    loadChildren: () => import('./note/note.module').then( m => m.NotePageModule)
  },
  {
    path: 'recharge',
    loadChildren: () => import('./recharge/recharge.module').then( m => m.RechargePageModule)
  },
  {
    path: 'solde',
    loadChildren: () => import('./solde/solde.module').then( m => m.SoldePageModule)
  },
  {
    path: 'version',
    loadChildren: () => import('./version/version.module').then( m => m.VersionPageModule)
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./onboarding/onboarding.module').then( m => m.OnboardingPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'editprofil',
    loadChildren: () => import('./editprofil/editprofil.module').then( m => m.EditprofilPageModule)
  },
  {
    path: 'editpass',
    loadChildren: () => import('./editpass/editpass.module').then( m => m.EditpassPageModule)
  },
  {
    path: 'write',
    loadChildren: () => import('./write/write.module').then( m => m.WritePageModule)
  },
  {
    path: 'airtime',
    loadChildren: () => import('./airtime/airtime.module').then( m => m.AirtimePageModule)
  },
  {
    path: 'ask',
    loadChildren: () => import('./ask/ask.module').then( m => m.AskPageModule)
  },
  {
    path: 'transfer',
    loadChildren: () => import('./transfer/transfer.module').then( m => m.TransferPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
