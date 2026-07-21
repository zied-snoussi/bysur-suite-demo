import { bootstrapApplication } from "@angular/platform-browser";
// The Stencil loader registers <bysur-*> custom elements with the browser.
// This is what makes the SAME components from @zied-snoussi/core usable here.
import { defineCustomElements } from "@zied-snoussi/core/loader";
import { AppComponent } from "./app/app.component";

defineCustomElements();

bootstrapApplication(AppComponent).catch((err) => {
  // biome-ignore lint/suspicious/noConsole: bootstrap failure must surface
  console.error(err);
});
