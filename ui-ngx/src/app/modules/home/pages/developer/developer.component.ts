import {AfterViewInit, Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {PageComponent} from "@shared/components/page.component";
import {Store} from "@ngrx/store";
import {AppState} from "@core/core.state";
import {BreakpointObserver} from "@angular/cdk/layout";
import {FormBuilder} from "@angular/forms";
import {ActiveComponentService} from "@core/services/active-component.service";
import {WINDOW} from "@core/services/window.service";
import {DashboardPageInitData, DashboardPageScope} from "@home/components/dashboard-page/dashboard-page.models";
import {getCurrentAuthUser} from "@core/auth/auth.selectors";
import {Authority} from "@shared/models/authority.enum";
import {DashboardService} from "@core/http/dashboard.service";

@Component({
  selector: 'tb-developer',
  templateUrl: './developer.component.html',
  styleUrl: './developer.component.scss'
})
export class DeveloperComponent extends PageComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(protected store: Store<AppState>,
              @Inject(WINDOW) private window: Window,
              private activeComponentService: ActiveComponentService,
              private fb: FormBuilder,
              public breakpointObserver: BreakpointObserver) {
    super(store);
  }

  currentDashboardId: string;
  currentCustomerId: string;
  currentDashboardScope: DashboardPageScope;
  authUser = getCurrentAuthUser(this.store);
  dashboardService: DashboardService;

  ngAfterViewInit(): void {
  }

  ngOnInit(): void {
    this.currentCustomerId = this.authUser.customerId;
    this.currentDashboardScope = this.authUser.authority === Authority.TENANT_ADMIN ? 'tenant' : 'customer';
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

    private init(data: DashboardPageInitData) {
      this.currentDashboardId = data.currentDashboardId;
    }

}
