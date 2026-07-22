import { JsonPipe } from "@angular/common";
import { Component, signal } from "@angular/core";
import {
  type FormField,
  HlmAlertDescriptionDirective,
  HlmAlertDirective,
  HlmAlertTitleDirective,
  HlmBadgeDirective,
  HlmButtonDirective,
  HlmCardContentDirective,
  HlmCardDescriptionDirective,
  HlmCardDirective,
  HlmCardFooterDirective,
  HlmCardHeaderDirective,
  HlmCardTitleDirective,
  HlmCurrencyInputComponent,
  HlmFormBuilderComponent,
  HlmLabelDirective,
  HlmNumberFieldComponent,
  HlmProgressComponent,
  HlmRatingComponent,
  HlmSeparatorDirective,
  HlmStatCardComponent,
  HlmStatusBadgeComponent,
  HlmStepperComponent,
  HlmTabsComponent,
  HlmTabsContentDirective,
  HlmTabsListDirective,
  HlmTabsTriggerDirective,
  HlmTimelineDirective,
  HlmTimelineItemComponent,
} from "@zied-snoussi/angular";

/**
 * Angular demo for the Bysur Suite — powered by @zied-snoussi/angular (spartan),
 * the Angular counterpart of @zied-snoussi/react (shadcn). One design language,
 * two frameworks. No Stencil, no web components — native Angular.
 */
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    JsonPipe,
    HlmButtonDirective,
    HlmBadgeDirective,
    HlmStatusBadgeComponent,
    HlmStatCardComponent,
    HlmAlertDirective,
    HlmAlertTitleDirective,
    HlmAlertDescriptionDirective,
    HlmCardDirective,
    HlmCardHeaderDirective,
    HlmCardTitleDirective,
    HlmCardDescriptionDirective,
    HlmCardContentDirective,
    HlmCardFooterDirective,
    HlmSeparatorDirective,
    HlmProgressComponent,
    HlmStepperComponent,
    HlmTimelineDirective,
    HlmTimelineItemComponent,
    HlmTabsComponent,
    HlmTabsListDirective,
    HlmTabsTriggerDirective,
    HlmTabsContentDirective,
    HlmLabelDirective,
    HlmNumberFieldComponent,
    HlmCurrencyInputComponent,
    HlmRatingComponent,
    HlmFormBuilderComponent,
  ],
  template: `
    <main class="mx-auto max-w-5xl px-4 py-8">
      <header class="flex items-start justify-between gap-4">
        <div>
          <h1 class="font-semibold text-2xl tracking-tight">Bysur Suite — Angular</h1>
          <p class="mt-1.5 text-sm text-muted-foreground">
            Powered by <code>&#64;zied-snoussi/angular</code> (spartan) — the Angular
            twin of the React/shadcn package. Native Angular, no web components.
          </p>
        </div>
        <button hlmBtn variant="outline" (click)="toggleTheme()">
          {{ dark() ? '☀ Light' : '☾ Dark' }} theme
        </button>
      </header>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">StatCard</h2>
        <div class="mt-4 grid gap-4 sm:grid-cols-3">
          <hlm-stat-card label="Active policies" value="1,284" delta="+12.5%" trend="up" hint="vs last month" />
          <hlm-stat-card label="Open claims" value="47" delta="-3.1%" trend="down" hint="vs last month" />
          <hlm-stat-card label="Renewal rate" value="92.4%" delta="+0.8pt" trend="up" hint="quarter to date" />
        </div>
      </section>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">StatusBadge &amp; Badge</h2>
        <div class="mt-4 flex flex-wrap items-center gap-2">
          @for (s of statuses; track s) {
            <hlm-status-badge [status]="s" />
          }
          <hlm-status-badge status="vip" label="VIP client" tone="info" />
        </div>
        <div class="mt-3 flex flex-wrap items-center gap-2">
          <span hlmBadge>Default</span>
          <span hlmBadge variant="secondary">Auto</span>
          <span hlmBadge variant="destructive">Overdue</span>
          <span hlmBadge variant="outline">Outline</span>
        </div>
      </section>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">Button</h2>
        <div class="mt-4 flex flex-wrap items-center gap-3">
          <button hlmBtn>Default</button>
          <button hlmBtn variant="secondary">Secondary</button>
          <button hlmBtn variant="destructive">Destructive</button>
          <button hlmBtn variant="outline">Outline</button>
          <button hlmBtn variant="ghost">Ghost</button>
          <button hlmBtn variant="link">Link</button>
        </div>
      </section>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">Alert</h2>
        <div class="mt-4 flex max-w-xl flex-col gap-3">
          <div hlmAlert variant="success">
            <h5 hlmAlertTitle>Payment received</h5>
            <div hlmAlertDescription>Premium paid for the 2026 term.</div>
          </div>
          <div hlmAlert variant="warning">
            <h5 hlmAlertTitle>Renewal due</h5>
            <div hlmAlertDescription>This policy expires in 14 days.</div>
          </div>
        </div>
      </section>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">Card, Separator, Progress</h2>
        <div hlmCard class="mt-4 max-w-xl">
          <div hlmCardHeader>
            <h3 hlmCardTitle>Policy BYS-2026-004821</h3>
            <p hlmCardDescription>Auto — Comprehensive</p>
          </div>
          <div hlmCardContent>
            <div class="flex items-center justify-between">
              <span class="font-medium text-sm">Zied Snoussi</span>
              <hlm-status-badge status="active" />
            </div>
            <div hlmSeparator class="my-4"></div>
            <div class="flex flex-col gap-3">
              <hlm-progress label="Deductible met" tone="success" [value]="100" />
              <hlm-progress label="Annual coverage used" tone="warning" [value]="72" />
              <hlm-progress label="Claim limit reached" tone="danger" [value]="95" />
            </div>
          </div>
          <div hlmCardFooter>
            <button hlmBtn>Renew policy</button>
          </div>
        </div>
      </section>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">Stepper</h2>
        <div class="mt-4 max-w-2xl">
          <hlm-stepper [current]="2" [steps]="steps" />
        </div>
      </section>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">Timeline</h2>
        <div hlmTimeline class="mt-4 max-w-md pl-2">
          <hlm-timeline-item time="Today, 09:12" title="Claim approved">
            Payout of $3,400 scheduled to the policyholder.
          </hlm-timeline-item>
          <hlm-timeline-item time="Yesterday" title="Adjuster review completed">
            Damage assessed as within coverage limits.
          </hlm-timeline-item>
          <hlm-timeline-item time="Mar 1" title="Claim submitted" />
        </div>
      </section>

      <section class="mt-10">
        <h2 class="font-semibold text-sm">Interactive</h2>
        <hlm-tabs value="controls" class="mt-4 max-w-[460px]">
          <div hlmTabsList>
            <button hlmTabsTrigger value="controls">Controls</button>
            <button hlmTabsTrigger value="quote">Quote form</button>
          </div>
          <div hlmTabsContent value="controls">
            <div class="flex flex-col gap-6">
              <div>
                <label hlmLabel>Number of dependents</label>
                <div class="mt-1.5">
                  <hlm-number-field [value]="dependents()" (valueChange)="dependents.set($event)" [min]="0" [max]="12" aria-label="Dependents" />
                </div>
                <p class="mt-1.5 text-muted-foreground text-xs">Selected: {{ dependents() }}</p>
              </div>
              <div class="max-w-[260px]">
                <label hlmLabel>Coverage amount</label>
                <div class="mt-1.5">
                  <hlm-currency-input [value]="coverage()" (valueChange)="coverage.set($event)" currency="USD" locale="en-US" aria-label="Coverage amount" />
                </div>
                <p class="mt-1.5 text-muted-foreground text-xs">Value: {{ coverage() ?? '—' }}</p>
              </div>
              <div>
                <label hlmLabel>How was your last claim experience?</label>
                <div class="mt-1.5">
                  <hlm-rating [value]="csat()" (valueChange)="csat.set($event)" aria-label="CSAT" />
                </div>
                <p class="mt-1.5 text-muted-foreground text-xs">{{ csat() }} / 5</p>
              </div>
            </div>
          </div>
          <div hlmTabsContent value="quote">
            <div class="max-w-[460px]">
              <hlm-form-builder [fields]="quoteFields" submitLabel="Request quote" (submitted)="submitted.set($event)" />
              @if (submitted()) {
                <pre class="mt-4 overflow-x-auto rounded-lg bg-muted p-3 text-xs">{{ submitted() | json }}</pre>
              }
            </div>
          </div>
        </hlm-tabs>
      </section>

      <footer class="mt-16 border-t pt-6 text-xs text-muted-foreground">
        One design language, two frameworks — <code>&#64;zied-snoussi/react</code>
        (shadcn) and <code>&#64;zied-snoussi/angular</code> (spartan).
      </footer>
    </main>
  `,
})
export class AppComponent {
  readonly statuses = [
    "active",
    "pending",
    "in-review",
    "quoted",
    "bound",
    "lapsed",
    "cancelled",
    "overdue",
    "rejected",
    "draft",
    "new",
  ];

  readonly steps = [
    { label: "Quote", description: "Coverage & price" },
    { label: "Details", description: "Applicant info" },
    { label: "Review", description: "Confirm terms" },
    { label: "Bind", description: "Issue policy" },
  ];

  readonly quoteFields: FormField[] = [
    { name: "fullName", label: "Full name", type: "text", required: true },
    {
      name: "email",
      label: "Email",
      type: "email",
      required: true,
      description: "We'll send the quote here.",
    },
    {
      name: "product",
      label: "Product",
      type: "select",
      required: true,
      placeholder: "Choose a product",
      options: [
        { label: "Auto — Comprehensive", value: "auto" },
        { label: "Home — Buildings & contents", value: "home" },
        { label: "Travel — Annual multi-trip", value: "travel" },
      ],
    },
    { name: "newsletter", label: "Email me renewal reminders", type: "switch" },
    {
      name: "terms",
      label: "I accept the terms and conditions",
      type: "checkbox",
      required: true,
    },
  ];

  readonly dark = signal(false);
  readonly dependents = signal(2);
  readonly coverage = signal<number | undefined>(50_000);
  readonly csat = signal(4);
  readonly submitted = signal<Record<string, string | boolean> | null>(null);

  toggleTheme(): void {
    const next = !this.dark();
    this.dark.set(next);
    document.documentElement.classList.toggle("dark", next);
  }
}
