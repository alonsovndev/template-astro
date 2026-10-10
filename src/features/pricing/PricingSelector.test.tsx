import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { siteContent } from "../../config/site";
import PricingSelector from "./PricingSelector";

describe("PricingSelector", () => {
  it("renders monthly pricing and disabled controls before hydration", () => {
    const markup = renderToStaticMarkup(
      <PricingSelector
        plans={siteContent.plans}
        contactEmail={siteContent.contactEmail}
        disclaimer={siteContent.sections.pricing.disclaimer}
      />
    );
    const renderedMarkup = document.createElement("div");
    renderedMarkup.innerHTML = markup;
    expect(renderedMarkup.querySelector("fieldset")).toBeDisabled();
    expect(renderedMarkup).toHaveTextContent("$12");
    expect(renderedMarkup).toHaveTextContent("$24");
    expect(renderedMarkup.querySelector('input[value="monthly"]')).toBeChecked();
  });
  it("switches to annual prices and back through keyboard-accessible controls", async () => {
    const user = userEvent.setup();
    render(
      <PricingSelector
        plans={siteContent.plans}
        contactEmail={siteContent.contactEmail}
        disclaimer={siteContent.sections.pricing.disclaimer}
      />
    );
    const essential = screen.getByRole("article", { name: "Essential plan" });
    const together = screen.getByRole("article", { name: "Together plan" });
    expect(within(essential).getByText("$12")).toBeVisible();
    await user.click(screen.getByRole("radio", { name: "Annual" }));
    expect(within(essential).getByText("$10")).toBeVisible();
    expect(within(together).getByText("$20")).toBeVisible();
    expect(within(essential).getByText("Billed annually")).toBeVisible();
    await user.keyboard("{ArrowLeft}");
    expect(screen.getByRole("radio", { name: "Monthly" })).toBeChecked();
    expect(within(together).getByText("$24")).toBeVisible();
    expect(within(essential).getByRole("link", { name: "Ask about Essential" })).toHaveAttribute(
      "href",
      "mailto:hello@example.com?subject=Ask%20about%20Essential"
    );
  });
});
