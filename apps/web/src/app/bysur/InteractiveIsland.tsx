"use client";

/**
 * The five interactive components from @zied-snoussi/react.
 *
 * They ship with "use client" baked into the published package, so importing
 * them from a Server Component is fine — this island exists because their
 * event handlers (onSubmit, onValueChange) can't cross the server/client
 * boundary. That's a React rule, not a library limitation.
 */

import {
  CurrencyInput,
  FormBuilder,
  type FormField,
  Label,
  NumberField,
  Rating,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@zied-snoussi/react";
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
      { label: "Travel — Annual multi-trip", value: "travel" },
    ],
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    validate: (v) =>
      typeof v === "string" && v.length > 160
        ? "Keep it under 160 characters"
        : undefined,
  },
  { name: "newsletter", label: "Email me renewal reminders", type: "switch" },
  {
    name: "terms",
    label: "I accept the terms and conditions",
    type: "checkbox",
    required: true,
  },
];

export function InteractiveIsland() {
  const [dependents, setDependents] = useState(2);
  const [coverage, setCoverage] = useState<number | undefined>(50_000);
  const [csat, setCsat] = useState(4);
  const [submitted, setSubmitted] = useState<Record<
    string,
    string | boolean
  > | null>(null);

  return (
    <Tabs defaultValue="controls">
      <TabsList>
        <TabsTrigger value="controls">Controls</TabsTrigger>
        <TabsTrigger value="quote">Quote form</TabsTrigger>
      </TabsList>

      <TabsContent value="controls">
        <div className="flex flex-col gap-6">
          <div>
            <Label>Number of dependents</Label>
            <div className="mt-1.5">
              <NumberField
                aria-label="Dependents"
                max={12}
                min={0}
                onValueChange={setDependents}
                value={dependents}
              />
            </div>
            <p className="mt-1.5 text-xs opacity-60">Selected: {dependents}</p>
          </div>

          <div className="max-w-[260px]">
            <Label>Coverage amount</Label>
            <div className="mt-1.5">
              <CurrencyInput
                aria-label="Coverage amount"
                currency="USD"
                defaultValue={50_000}
                locale="en-US"
                onValueChange={setCoverage}
              />
            </div>
            <p className="mt-1.5 text-xs opacity-60">
              Value: {coverage ?? "—"}
            </p>
          </div>

          <div>
            <Label>How was your last claim experience?</Label>
            <div className="mt-1.5">
              <Rating aria-label="CSAT" onValueChange={setCsat} value={csat} />
            </div>
            <p className="mt-1.5 text-xs opacity-60">{csat} / 5</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="quote">
        <div className="max-w-[460px]">
          <FormBuilder
            fields={quoteFields}
            onSubmit={setSubmitted}
            submitLabel="Request quote"
          />
          {submitted ? (
            <pre className="mt-4 overflow-x-auto rounded-lg bg-[var(--color-muted)] p-3 text-xs">
              {JSON.stringify(submitted, null, 2)}
            </pre>
          ) : null}
        </div>
      </TabsContent>
    </Tabs>
  );
}
