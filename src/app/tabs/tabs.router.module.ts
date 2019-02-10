import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'drinkWater',
        children: [
          {
            path: '',
            loadChildren: '../drinkWater/drinkWater.module#DrinkWaterPageModule'
          }
        ]
      },
      {
        path: 'analysis',
        children: [
          {
            path: '',
            loadChildren: '../analysis/analysis.module#AnalysisPageModule'
          }
        ]
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            loadChildren: '../settings/settings.module#SettingsPageModule'
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/drinkWater',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/drinkWater',
    pathMatch: 'full'
  }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
