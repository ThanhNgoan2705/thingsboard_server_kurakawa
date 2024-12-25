import {AfterViewInit, ChangeDetectionStrategy, Component, Inject, Input, OnDestroy, OnInit} from "@angular/core";
import {NgIf} from "@angular/common";
import {SharedModule} from "@shared/shared.module";
import {DashboardPageInitData, DashboardPageScope} from "@home/components/dashboard-page/dashboard-page.models";
import {Authority} from "@shared/models/authority.enum";
import {Store} from "@ngrx/store";
import {AppState} from "@core/core.state";
import {Router} from "@angular/router";
import {Dashboard} from "@shared/models/dashboard.models";
import {WINDOW} from "@core/services/window.service";
import {getCurrentAuthUser} from "@core/auth/auth.selectors";
import {DashboardService} from "@core/http/dashboard.service";


@Component({
  selector: 'tb-side-menu-customer',
  templateUrl: './side-menu-customer.component.html',
  styleUrls: ['./side-menu-customer.component.scss'],
  standalone: true,
  imports: [
    NgIf,
    SharedModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuCustomerComponent implements OnInit , OnDestroy, AfterViewInit{
  singlePageMode: boolean;
  currentDashboardId: string;
  currentCustomerId: string;
  currentDashboardScope: DashboardPageScope;
  authUser = getCurrentAuthUser(this.store);
  dashboardService: DashboardService;

  @Input()
  dashboard: Dashboard;
    constructor( protected store: Store<AppState>,
                 @Inject(WINDOW) private window: Window,
                 private router: Router,

                 ) {
    }


  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.currentCustomerId = this.authUser.customerId;
    this.currentDashboardScope = this.authUser.authority === Authority.CUSTOMER_USER? 'customer' : 'customer';
    this.dashboardService.getDashboard(this.currentDashboardId).subscribe(
      (dashboard) => {
        this.currentDashboardId = dashboard.id.id;
        const data: DashboardPageInitData = {
          dashboard,
          currentDashboardId: this.currentDashboardId,
        };
        this.init(data);
      }
    );
  }
  public currentDashboardIdChanged(dashboardId: string) {

      if (this.currentDashboardScope === 'customer' && this.authUser.authority === Authority.TENANT_ADMIN) {
        this.router.navigateByUrl(`customers/${this.currentCustomerId}/dashboards/${dashboardId}`);
      } else {
        if (this.singlePageMode) {
          this.router.navigateByUrl(`dashboard/${dashboardId}`);
        } else {
          this.router.navigateByUrl(`dashboards/${dashboardId}`);
        }
    }
  }

  private init(data: DashboardPageInitData) {
    this.currentDashboardId = data.currentDashboardId;
  }

  ngOnDestroy(): void {
  }

}
