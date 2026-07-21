import { CUSTOM_ELEMENTS_SCHEMA, Component, signal } from "@angular/core";

/**
 * Angular demo for the Bysur Suite.
 *
 * This proves the cross-framework claim: the <bysur-*> elements below are the
 * SAME source that produces the React wrappers — compiled once by Stencil in
 * @zied-snoussi/core, consumed here as standards-based custom elements.
 *
 * CUSTOM_ELEMENTS_SCHEMA tells Angular's template compiler that unknown
 * <bysur-*> tags are custom elements, not typos.
 *
 * NOTE: this app deliberately consumes @zied-snoussi/core directly rather than
 * the @zied-snoussi/angular wrapper package — that package still ships
 * generated *sources* (ng-packagr isn't wired yet), so it can't be installed
 * from the registry. See docs/CROSS-FRAMEWORK.md.
 */
@Component({
  selector: "app-root",
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  template: `
    <main class="page">
      <header
        style="display:flex;justify-content:space-between;align-items:flex-start;gap:16px"
      >
        <div>
          <h1 style="margin:0;font-size:1.6rem;letter-spacing:-0.02em">
            Bysur Suite — Angular
          </h1>
          <p style="margin:6px 0 0;color:var(--color-muted-foreground)">
            Web components from <code>&#64;zied-snoussi/core</code> + tokens from
            <code>&#64;zied-snoussi/tokens</code>. No React anywhere.
          </p>
        </div>
        <bysur-button variant="outline" (click)="toggleTheme()">
          {{ dark() ? '☀ Light' : '☾ Dark' }} theme
        </bysur-button>
      </header>

      <section class="section">
        <h2>Button</h2>
        <p class="hint">Same variants and sizes as the React build.</p>
        <div class="row">
          <bysur-button>Default</bysur-button>
          <bysur-button variant="secondary">Secondary</bysur-button>
          <bysur-button variant="destructive">Destructive</bysur-button>
          <bysur-button variant="outline">Outline</bysur-button>
          <bysur-button variant="ghost">Ghost</bysur-button>
          <bysur-button variant="link">Link</bysur-button>
          <bysur-button [attr.disabled]="true">Disabled</bysur-button>
        </div>
        <div class="row" style="margin-top:12px">
          <bysur-button size="sm">Small</bysur-button>
          <bysur-button size="default">Default</bysur-button>
          <bysur-button size="lg">Large</bysur-button>
        </div>
      </section>

      <section class="section">
        <h2>StatusBadge</h2>
        <p class="hint">
          The status→tone mapping lives in the component, so Angular gets it for
          free.
        </p>
        <div class="row">
          @for (s of statuses; track s) {
            <bysur-status-badge [status]="s"></bysur-status-badge>
          }
          <bysur-status-badge
            status="vip"
            tone="info"
            label="VIP client"
          ></bysur-status-badge>
        </div>
      </section>

      <section class="section">
        <h2>Input</h2>
        <p class="hint">
          Two-way-ish binding via the component's custom event
          <code>bysurInput</code>.
        </p>
        <div class="stack">
          <bysur-input
            placeholder="you@bysur.com"
            type="email"
            [value]="email()"
            (bysurInput)="onEmail($event)"
          ></bysur-input>

          <bysur-input
            placeholder="Invalid state"
            [invalid]="true"
            value="not-an-email"
          ></bysur-input>

          <p style="font-size:12px;color:var(--color-muted-foreground);margin:0">
            Bound value: {{ email() || '—' }}
          </p>
        </div>
      </section>

      <section class="section">
        <h2>Composed example</h2>
        <div class="card" style="max-width:460px">
          <div
            style="display:flex;justify-content:space-between;align-items:center;gap:12px"
          >
            <strong>Policy BYS-2026-004821</strong>
            <bysur-status-badge status="active"></bysur-status-badge>
          </div>
          <p style="color:var(--color-muted-foreground);font-size:14px">
            Auto — Comprehensive · $1,240 / year
          </p>
          <div class="row">
            <bysur-button>Renew</bysur-button>
            <bysur-button variant="destructive">Cancel policy</bysur-button>
          </div>
        </div>
      </section>

      <footer
        style="margin-top:56px;padding-top:20px;border-top:1px solid var(--color-border);font-size:13px;color:var(--color-muted-foreground)"
      >
        Cross-framework proof: these components share one source with the React
        library.
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
    "draft",
    "new",
  ];

  readonly dark = signal(false);
  readonly email = signal("");

  toggleTheme(): void {
    const next = !this.dark();
    this.dark.set(next);
    document.documentElement.classList.toggle("dark", next);
  }

  onEmail(event: Event): void {
    this.email.set((event as CustomEvent<string>).detail);
  }
}
