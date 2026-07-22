import { provideZonelessChangeDetection } from "@angular/core";
import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

// The Bysur spartan components are fully signal-based, so we run Angular
// zoneless (no zone.js). Signals + template event bindings drive change
// detection — this is the Angular 20 recommended setup for a signals UI.
bootstrapApplication(AppComponent, {
  providers: [provideZonelessChangeDetection()],
}).catch((err) => {
  // biome-ignore lint/suspicious/noConsole: bootstrap failure must surface
  console.error(err);
});
