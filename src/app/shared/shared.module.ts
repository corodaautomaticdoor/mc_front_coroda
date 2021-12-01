import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';  
import { FlexLayoutModule } from '@angular/flex-layout';
import { SwiperModule } from 'ngx-swiper-wrapper'; 
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  wheelPropagation: false,
  suppressScrollX: true               
};

import { PipesModule } from '../theme/pipes/pipes.module';
import { DirectivesModule } from '../theme/directives/directives.module';

import { LogoComponent } from './components/logo/logo.component';
import { HeaderImageComponent } from './components/header-image/header-image.component';
import { HeaderCarouselComponent } from './components/header-carousel/header-carousel.component';
import { OurServicesComponent } from './components/our-services/our-services.component';
import { OurAwardsComponent } from './components/our-awards/our-awards.component';
import { GetInTouchComponent } from './components/get-in-touch/get-in-touch.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MenuItemsCarouselComponent } from './components/menu-items-carousel/menu-items-carousel.component';
import { CartOverviewComponent } from './components/cart-overview/cart-overview.component';
import { QuantityCounterComponent } from './components/quantity-counter/quantity-counter.component';
import { RatingComponent } from './components/rating/rating.component';
import { CommentsComponent } from './components/comments/comments.component';
import { MenuItemsToolbarComponent } from './components/menu-items-toolbar/menu-items-toolbar.component';
import { MenuItemHoverableComponent } from './components/menu-item-hoverable/menu-item-hoverable.component';
import { OurChefsComponent } from './components/our-chefs/our-chefs.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { GetAppComponent } from './components/get-app/get-app.component';
import { ReservationFormComponent } from './components/reservation-form/reservation-form.component';
import { ReservationDialogComponent } from './components/reservation-dialog/reservation-dialog.component'; 
import { DialogHeaderControlsComponent } from './components/dialog-header-controls/dialog-header-controls.component'; 
import { ImageUploadComponent } from './components/image-upload/image-upload.component';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { AlertDialogComponent } from './components/alert-dialog/alert-dialog.component'; 
import { SocialIconsComponent } from './components/social-icons/social-icons.component';
import { TodayMenuComponent } from './components/today-menu/today-menu.component';
import { LangComponent } from './components/lang/lang.component';
import { OrderDetailsDialogComponent } from './components/order-details-dialog/order-details-dialog.component';
import { HeaderVideoComponent } from './components/header-video/header-video.component'; 
import { TokenService } from '../app-auth/shared/service/token.service';

@NgModule({
  declarations: [
    LogoComponent,
    HeaderImageComponent,
    HeaderCarouselComponent,
    OurServicesComponent,
    OurAwardsComponent,
    GetInTouchComponent,
    MenuItemComponent,
    MenuItemsCarouselComponent,
    CartOverviewComponent,
    QuantityCounterComponent,
    RatingComponent,
    CommentsComponent,
    MenuItemsToolbarComponent,
    MenuItemHoverableComponent,
    OurChefsComponent,
    TimelineComponent,
    TestimonialsComponent,
    GetAppComponent,
    ReservationFormComponent,
    ReservationDialogComponent,
    DialogHeaderControlsComponent,
    ImageUploadComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    SocialIconsComponent,
    TodayMenuComponent,
    LangComponent,
    OrderDetailsDialogComponent,
    HeaderVideoComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule, 
    FlexLayoutModule,
    SwiperModule, 
    TranslateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    DirectivesModule
  ],
  exports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule, 
    FlexLayoutModule,
    SwiperModule, 
    TranslateModule,
    MatAutocompleteModule,
    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatStepperModule,
    PerfectScrollbarModule,
    PipesModule,
    DirectivesModule,
    LogoComponent,
    HeaderImageComponent,
    HeaderCarouselComponent,
    OurServicesComponent,
    OurAwardsComponent,
    GetInTouchComponent,
    MenuItemComponent,
    MenuItemsCarouselComponent,
    QuantityCounterComponent,
    RatingComponent,
    CommentsComponent,
    MenuItemsToolbarComponent,
    MenuItemHoverableComponent,
    OurChefsComponent,
    TimelineComponent,
    TestimonialsComponent,
    GetAppComponent,
    ReservationFormComponent,
    ReservationDialogComponent,
    DialogHeaderControlsComponent,
    ImageUploadComponent,
    ConfirmDialogComponent,
    AlertDialogComponent,
    SocialIconsComponent,
    TodayMenuComponent,
    LangComponent,
    OrderDetailsDialogComponent,
    HeaderVideoComponent
  ],
  providers:[
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    TokenService
  ]
})
export class SharedModule { }
