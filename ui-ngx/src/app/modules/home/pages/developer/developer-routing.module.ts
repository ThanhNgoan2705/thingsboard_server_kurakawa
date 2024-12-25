import {RouterModule, Routes} from "@angular/router";
import {DeveloperComponent} from "@home/pages/developer/developer.component";
import {MenuId} from "@core/services/menu.models";
import {NgModule} from "@angular/core";
import {Authority} from "@shared/models/authority.enum";

const routes: Routes = [
  {
    path: 'developers',
    component: DeveloperComponent,
    data: {
      auth:[Authority.TENANT_ADMIN, Authority.CUSTOMER_USER],
      breadcrumb:{
        menuId: MenuId.developers
      },
      isPage: true,
    },
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeveloperRoutingModule { }
