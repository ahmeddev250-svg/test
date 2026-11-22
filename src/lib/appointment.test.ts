import { describe, expect, it } from "vitest";

import { emailSchema, makeAppointmentSchema, messageSchema } from "./appointment";

const now = new Date(2026, 10, 21, 10, 0, 0); // 21 Nov 2026
const schema = makeAppointmentSchema(now);
const valid = {
  name: "Sarah Johnson",
  email: "sarah@example.com",
  phone: "+1 (555) 012-3478",
  department: "Cardiology",
  date: "2026-11-24",
  time: "09:30 AM",
};

describe("appointment form rules", () => {
  it("accepts a complete booking", () => {
    expect(schema.safeParse(valid).success).toBe(true);
  });

  it("rejects a date in the past", () => {
    expect(schema.safeParse({ ...valid, date: "2026-11-20" }).success).toBe(false);
  });

  it("accepts today's date", () => {
    expect(schema.safeParse({ ...valid, date: "2026-11-21" }).success).toBe(true);
  });

  it("rejects a phone number with fewer than 7 digits", () => {
    expect(schema.safeParse({ ...valid, phone: "12345" }).success).toBe(false);
  });

  it("requires a department from the list", () => {
    expect(schema.safeParse({ ...valid, department: "" }).success).toBe(false);
  });

  it("requires a time slot", () => {
    expect(schema.safeParse({ ...valid, time: "" }).success).toBe(false);
  });
});

describe("email rule (appointments and newsletter)", () => {
  it("rejects an address without a domain", () => {
    expect(emailSchema.safeParse("sarah@").success).toBe(false);
  });
});

describe("doctor message rule", () => {
  it("rejects a message shorter than 10 characters", () => {
    expect(
      messageSchema.safeParse({ name: "Sam Lee", email: "sam@example.com", message: "Hi" }).success,
    ).toBe(false);
  });
});
