/**
 * /bysur — every component from @zied-snoussi/react, installed from the internal
 * GitHub Packages registry.
 *
 * NOTE: no "use client" here. This is a SERVER COMPONENT, and that's the point:
 * 20 of the 25 components render with zero client JavaScript. If any of them
 * secretly needed the client, `next build` would fail on this file.
 *
 * The five interactive ones live in <InteractiveIsland />.
 */

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Checkbox,
  DescriptionItem,
  DescriptionList,
  EmptyState,
  Input,
  Label,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Separator,
  Skeleton,
  Spinner,
  StatCard,
  StatusBadge,
  Stepper,
  Switch,
  Textarea,
  Timeline,
  TimelineItem,
} from "@zied-snoussi/react";
import { InteractiveIsland } from "./InteractiveIsland";

const STATUSES = [
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

function Section({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="font-semibold text-sm">{title}</h2>
      {hint ? <p className="mt-0.5 mb-4 text-xs opacity-60">{hint}</p> : null}
      <div className={hint ? "" : "mt-4"}>{children}</div>
    </section>
  );
}

export default function BysurShowcase() {
  return (
    <main className="container mx-auto max-w-5xl overflow-y-auto px-4 py-8">
      <header>
        <h1 className="font-semibold text-2xl tracking-tight">
          Bysur Suite — component showcase
        </h1>
        <p className="mt-1.5 text-sm opacity-70">
          All 25 components from <code>@zied-snoussi/react</code>, installed from
          the internal registry. This page is a React Server Component.
        </p>
      </header>

      <Section
        hint="Dashboard KPIs with trend direction."
        title="StatCard"
      >
        <div className="grid gap-4 sm:grid-cols-3">
          <StatCard
            delta="+12.5%"
            hint="vs last month"
            label="Active policies"
            trend="up"
            value="1,284"
          />
          <StatCard
            delta="-3.1%"
            hint="vs last month"
            label="Open claims"
            trend="down"
            value="47"
          />
          <StatCard
            delta="+0.8pt"
            hint="quarter to date"
            label="Renewal rate"
            trend="up"
            value="92.4%"
          />
        </div>
      </Section>

      <Section
        hint="Domain statuses map to tones automatically; unknown values fall back to neutral."
        title="StatusBadge & Badge"
      >
        <div className="flex flex-wrap items-center gap-2">
          {STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
          <StatusBadge label="VIP client" status="vip" tone="info" />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Badge>Default</Badge>
          <Badge variant="secondary">Auto</Badge>
          <Badge variant="destructive">Overdue</Badge>
          <Badge variant="outline">Outline</Badge>
        </div>
      </Section>

      <Section hint="Six variants, three sizes." title="Button">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      <Section title="Alert">
        <div className="flex max-w-xl flex-col gap-3">
          <Alert>
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>This is the default alert.</AlertDescription>
          </Alert>
          <Alert variant="success">
            <AlertTitle>Payment received</AlertTitle>
            <AlertDescription>Premium paid for the 2026 term.</AlertDescription>
          </Alert>
          <Alert variant="warning">
            <AlertTitle>Renewal due</AlertTitle>
            <AlertDescription>This policy expires in 14 days.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Policy lapsed</AlertTitle>
            <AlertDescription>Coverage ended on 12 June 2026.</AlertDescription>
          </Alert>
        </div>
      </Section>

      <Section title="Card, Avatar, Separator, DescriptionList, Progress">
        <Card className="max-w-xl">
          <CardHeader>
            <CardTitle>Policy BYS-2026-004821</CardTitle>
            <CardDescription>Auto — Comprehensive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>ZS</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium text-sm">Zied Snoussi</div>
                <div className="text-xs opacity-60">
                  Policyholder since 2021
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <DescriptionList>
              <DescriptionItem term="Policy #">BYS-2026-004821</DescriptionItem>
              <DescriptionItem term="Premium">$1,240 / year</DescriptionItem>
              <DescriptionItem term="Deductible">$500</DescriptionItem>
              <DescriptionItem term="Status">
                <StatusBadge status="active" />
              </DescriptionItem>
            </DescriptionList>

            <Separator className="my-4" />

            <div className="flex flex-col gap-3">
              <Progress label="Deductible met" tone="success" value={100} />
              <Progress label="Annual coverage used" tone="warning" value={72} />
              <Progress label="Claim limit reached" tone="danger" value={95} />
              <Progress label="Onboarding" value={40} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Renew policy</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section hint="Quote → bind flow, currently on step 3." title="Stepper">
        <div className="max-w-2xl">
          <Stepper
            current={2}
            steps={[
              { label: "Quote", description: "Coverage & price" },
              { label: "Details", description: "Applicant info" },
              { label: "Review", description: "Confirm terms" },
              { label: "Bind", description: "Issue policy" },
            ]}
          />
        </div>
      </Section>

      <Section title="Timeline">
        <div className="max-w-md">
          <Timeline>
            <TimelineItem time="Today, 09:12" title="Claim approved">
              Payout of $3,400 scheduled to the policyholder.
            </TimelineItem>
            <TimelineItem time="Yesterday" title="Adjuster review completed">
              Damage assessed as within coverage limits.
            </TimelineItem>
            <TimelineItem time="Mar 3" title="Documents uploaded">
              3 photos and a repair estimate attached.
            </TimelineItem>
            <TimelineItem time="Mar 1" title="Claim submitted" />
          </Timeline>
        </div>
      </Section>

      <Section
        hint="Native elements — server-rendered with no client JavaScript."
        title="Input, Textarea, Label, Checkbox, Switch, RadioGroup"
      >
        <div className="flex max-w-md flex-col gap-4">
          <div>
            <Label htmlFor="email">Email address</Label>
            <Input id="email" placeholder="you@bysur.com" type="email" />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Tell us more…" />
          </div>
          <div className="flex items-center gap-2">
            <Checkbox defaultChecked id="terms" />
            <Label htmlFor="terms">Accept terms and conditions</Label>
          </div>
          <div className="flex items-center gap-2">
            <Switch defaultChecked id="notify" />
            <Label htmlFor="notify">Enable renewal notifications</Label>
          </div>
          <div>
            <Label>Coverage plan</Label>
            <div className="mt-2">
              <RadioGroup defaultValue="standard" name="plan">
                <RadioGroupItem
                  description="Liability only — lowest premium"
                  label="Basic"
                  value="basic"
                />
                <RadioGroupItem
                  description="Liability + collision + comprehensive"
                  label="Standard"
                  value="standard"
                />
                <RadioGroupItem
                  description="Full coverage + roadside + rental"
                  label="Premium"
                  value="premium"
                />
              </RadioGroup>
            </div>
          </div>
        </div>
      </Section>

      <Section
        hint="FormBuilder, NumberField, CurrencyInput, Tabs and Rating — the only five that ship “use client”."
        title="Interactive components (client island)"
      >
        <InteractiveIsland />
      </Section>

      <Section title="Skeleton, Spinner, EmptyState">
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="flex flex-1 flex-col gap-2">
                  <Skeleton className="h-3 w-4/5" />
                  <Skeleton className="h-3 w-3/5" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-center gap-5 pt-6">
              <Spinner size="sm" />
              <Spinner />
              <Spinner size="lg" />
            </CardContent>
          </Card>

          <EmptyState
            description="New leads from your web forms will show up here."
            icon={<span className="text-2xl">📇</span>}
            title="No leads yet"
          />
        </div>
      </Section>

      <footer className="mt-16 border-t pt-6 text-xs opacity-60">
        Rendered with <code>@zied-snoussi/react</code> from GitHub Packages ·{" "}
        <a
          className="underline"
          href="https://zied-snoussi.github.io/bysur-suite-components/"
        >
          Storybook
        </a>{" "}
        ·{" "}
        <a
          className="underline"
          href="https://github.com/zied-snoussi/bysur-suite-components/wiki"
        >
          Docs
        </a>
      </footer>
    </main>
  );
}
