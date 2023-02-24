import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { WebsocketConnectionService } from './services/websocket-connect.service';
import { appInitializer } from './helpers/appInitializer';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [ {
    provide: APP_INITIALIZER,
    multi: true,
    deps: [WebsocketConnectionService],
    useFactory: appInitializer
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
