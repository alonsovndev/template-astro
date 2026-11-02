import { useState, useSyncExternalStore } from "react";
import type { PricingPlan } from "../../config/site";

interface PricingSelectorProps {
  plans: PricingPlan[];
  contactEmail: string;
  disclaimer: string;
}

const subscribe = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function PricingSelector({ plans, contactEmail, disclaimer }: PricingSelectorProps) {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  // The server snapshot keeps controls disabled until hydration attaches their handlers.
  const hydrated = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  return (
    <div>
      <fieldset className="billing-period" disabled={!hydrated}>
        <legend className="visually-hidden">Billing period</legend>
        <label>
          <input
            type="radio"
            name="billing"
            value="monthly"
            checked={billingPeriod === "monthly"}
            onChange={() => setBillingPeriod("monthly")}
          />
          Monthly
        </label>
        <label>
          <input
            type="radio"
            name="billing"
            value="annual"
            checked={billingPeriod === "annual"}
            onChange={() => setBillingPeriod("annual")}
          />
          Annual
        </label>
      </fieldset>
      <div className="pricing-grid" aria-live="polite" aria-atomic="true">
        {plans.map((plan) => (
          <article className="pricing-card" key={plan.name} aria-label={`${plan.name} plan`}>
            <h3>{plan.name}</h3>
            <p>{plan.description}</p>
            <p className="price">
              <strong>
                ${billingPeriod === "monthly" ? plan.monthlyPrice : plan.annualMonthlyPrice}
              </strong>
              <span> / month</span>
            </p>
            <p className="billing-note">
              {billingPeriod === "annual" ? "Billed annually" : "Billed monthly"}
            </p>
            <ul>
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <a
              className="button button-secondary"
              href={`mailto:${contactEmail}?subject=${encodeURIComponent(`Ask about ${plan.name}`)}`}
            >
              Ask about {plan.name}
            </a>
          </article>
        ))}
      </div>
      <p className="pricing-disclaimer">{disclaimer}</p>
    </div>
  );
}
