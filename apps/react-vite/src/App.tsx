/**
 * React + Vite demo — the SAME @zied-snoussi/ui package as the Next.js app,
 * in a plain client-rendered React app with no framework magic.
 *
 * Everything is a normal component here (no RSC), so the interactive and
 * presentational components sit side by side in one file.
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
  CurrencyInput,
  DescriptionItem,
  DescriptionList,
  EmptyState,
  FormBuilder,
  type FormField,
  Input,
  Label,
  NumberField,
  Progress,
  RadioGroup,
  RadioGroupItem,
  Rating,
  Separator,
  Skeleton,
  Spinner,
  StatCard,
  StatusBadge,
  Stepper,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  Timeline,
  TimelineItem,
} from "@zied-snoussi/ui";
import { useState } from "react";

const quoteFields: FormField[] = [
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
    ],
  },
  { name: "notes", label: "Notes", type: "textarea" },
  { name: "terms", label: "I accept the terms", type: "checkbox", required: true },
];

export function App() {
  const [dark, setDark] = useState(false);
  const [dependents, setDependents] = useState(2);
  const [coverage, setCoverage] = useState<number | undefined>(50_000);
  const [csat, setCsat] = useState(4);
  const [submitted, setSubmitted] = useState<Record<
    string,
    string | boolean
  > | null>(null);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
  };

  return (
    <main className="page">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 16,
        }}
      >
        <div>
          <h1 style={{ margin: 0, fontSize: "1.6rem", letterSpacing: "-0.02em" }}>
            Bysur Suite — React + Vite
          </h1>
          <p style={{ margin: "6px 0 0", color: "var(--color-muted-foreground)" }}>
            The same <code>@zied-snoussi/ui</code> package, plain React (no SSR).
          </p>
        </div>
        <Button onClick={toggleTheme} variant="outline">
          {dark ? "☀ Light" : "☾ Dark"} theme
        </Button>
      </header>

      <section className="section">
        <h2>KPIs</h2>
        <div className="grid-3">
          <StatCard delta="+12.5%" hint="vs last month" label="Active policies" trend="up" value="1,284" />
          <StatCard delta="-3.1%" hint="vs last month" label="Open claims" trend="down" value="47" />
          <StatCard delta="+0.8pt" hint="QTD" label="Renewal rate" trend="up" value="92.4%" />
        </div>
      </section>

      <section className="section">
        <h2>Statuses &amp; badges</h2>
        <div className="row">
          {["active", "pending", "in-review", "lapsed", "overdue", "quoted", "draft", "new"].map(
            (s) => (
              <StatusBadge key={s} status={s} />
            )
          )}
          <Badge variant="secondary">Auto</Badge>
          <Badge variant="destructive">Overdue</Badge>
        </div>
      </section>

      <section className="section">
        <h2>Buttons</h2>
        <div className="row">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <section className="section">
        <h2>Alerts</h2>
        <div className="stack" style={{ maxWidth: 520 }}>
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
      </section>

      <section className="section">
        <h2>Policy card</h2>
        <Card style={{ maxWidth: 520 }}>
          <CardHeader>
            <CardTitle>Policy BYS-2026-004821</CardTitle>
            <CardDescription>Auto — Comprehensive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="row" style={{ marginBottom: 12 }}>
              <Avatar>
                <AvatarFallback>ZS</AvatarFallback>
              </Avatar>
              <span style={{ fontSize: 14, fontWeight: 500 }}>Zied Snoussi</span>
            </div>
            <Separator style={{ margin: "12px 0" }} />
            <DescriptionList>
              <DescriptionItem term="Premium">$1,240 / year</DescriptionItem>
              <DescriptionItem term="Deductible">$500</DescriptionItem>
              <DescriptionItem term="Status">
                <StatusBadge status="active" />
              </DescriptionItem>
            </DescriptionList>
            <Separator style={{ margin: "12px 0" }} />
            <div className="stack">
              <Progress label="Deductible met" tone="success" value={100} />
              <Progress label="Coverage used" tone="warning" value={72} />
              <Progress label="Claim limit" tone="danger" value={95} />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Renew policy</Button>
          </CardFooter>
        </Card>
      </section>

      <section className="section">
        <h2>Stepper &amp; Timeline</h2>
        <div style={{ maxWidth: 600 }}>
          <Stepper
            current={2}
            steps={[
              { label: "Quote" },
              { label: "Details" },
              { label: "Review" },
              { label: "Bind" },
            ]}
          />
        </div>
        <div style={{ maxWidth: 460, marginTop: 24 }}>
          <Timeline>
            <TimelineItem time="Today" title="Claim approved">
              Payout of $3,400 scheduled.
            </TimelineItem>
            <TimelineItem time="Mar 3" title="Documents uploaded" />
            <TimelineItem time="Mar 1" title="Claim submitted" />
          </Timeline>
        </div>
      </section>

      <section className="section">
        <h2>Form controls</h2>
        <div className="stack" style={{ maxWidth: 400 }}>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="you@bysur.com" type="email" />
          </div>
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Tell us more…" />
          </div>
          <div className="row">
            <Checkbox defaultChecked id="terms" />
            <Label htmlFor="terms">Accept terms</Label>
          </div>
          <div className="row">
            <Switch defaultChecked id="notify" />
            <Label htmlFor="notify">Renewal notifications</Label>
          </div>
          <RadioGroup defaultValue="standard" name="plan">
            <RadioGroupItem description="Liability only" label="Basic" value="basic" />
            <RadioGroupItem description="Liability + collision" label="Standard" value="standard" />
            <RadioGroupItem description="Full coverage" label="Premium" value="premium" />
          </RadioGroup>

          <div>
            <Label>Dependents</Label>
            <div style={{ marginTop: 6 }}>
              <NumberField aria-label="Dependents" max={12} min={0} onValueChange={setDependents} value={dependents} />
            </div>
          </div>

          <div>
            <Label>Coverage amount</Label>
            <div style={{ marginTop: 6 }}>
              <CurrencyInput aria-label="Coverage" defaultValue={50_000} onValueChange={setCoverage} />
            </div>
            <small style={{ color: "var(--color-muted-foreground)" }}>Value: {coverage ?? "—"}</small>
          </div>

          <div>
            <Label>Satisfaction</Label>
            <div style={{ marginTop: 6 }}>
              <Rating aria-label="CSAT" onValueChange={setCsat} value={csat} />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>Tabs &amp; FormBuilder</h2>
        <Tabs defaultValue="quote">
          <TabsList>
            <TabsTrigger value="quote">Quote form</TabsTrigger>
            <TabsTrigger value="states">Loading &amp; empty</TabsTrigger>
          </TabsList>

          <TabsContent value="quote">
            <div style={{ maxWidth: 440 }}>
              <FormBuilder fields={quoteFields} onSubmit={setSubmitted} submitLabel="Request quote" />
              {submitted ? (
                <pre
                  style={{
                    marginTop: 16,
                    padding: 12,
                    borderRadius: 8,
                    background: "var(--color-muted)",
                    fontSize: 12,
                    overflowX: "auto",
                  }}
                >
                  {JSON.stringify(submitted, null, 2)}
                </pre>
              ) : null}
            </div>
          </TabsContent>

          <TabsContent value="states">
            <div className="grid-3">
              <Card>
                <CardContent style={{ paddingTop: 24 }}>
                  <div className="row">
                    <Skeleton style={{ height: 48, width: 48, borderRadius: 9999 }} />
                    <div className="stack" style={{ flex: 1, gap: 8 }}>
                      <Skeleton style={{ height: 12, width: "80%" }} />
                      <Skeleton style={{ height: 12, width: "60%" }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent
                  style={{
                    paddingTop: 24,
                    display: "flex",
                    gap: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Spinner size="sm" />
                  <Spinner />
                  <Spinner size="lg" />
                </CardContent>
              </Card>
              <EmptyState
                description="New leads will show up here."
                icon={<span style={{ fontSize: 28 }}>📇</span>}
                title="No leads yet"
              />
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
}
