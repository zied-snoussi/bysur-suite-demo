import { bootstrapApplication } from "@angular/platform-browser";
import { AppComponent } from "./app/app.component";

bootstrapApplication(AppComponent).catch((err) => {
  // biome-ignore lint/suspicious/noConsole: bootstrap failure must surface
  console.error(err);
});
