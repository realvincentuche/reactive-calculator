import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, test, expect, beforeEach } from "vitest";
import { useCalculatorStore } from "./store";
import App from "./App";

beforeEach(() => {
  render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

describe("check for all visible elements in dom", () => {
  test("should contain cview", () => {
    expect(screen.getByTitle("CView")).toBeInTheDocument();
  });
  test("should contain AC button", () => {
    expect(screen.getByTitle("AC")).toBeInTheDocument();
  });
  test("should contain +/- button", () => {
    expect(screen.getByTitle("+/-")).toBeInTheDocument();
  });
  test("should contain % button", () => {
    expect(screen.getByTitle("%")).toBeInTheDocument();
  });
  test("should contain / button", () => {
    expect(screen.getByTitle("/")).toBeInTheDocument();
  });
  test("should contain 1 button", () => {
    expect(screen.getByTitle("1")).toBeInTheDocument();
  });
  test("should contain . button", () => {
    expect(screen.getByTitle(".")).toBeInTheDocument();
  });
  test("should contain = button", () => {
    expect(screen.getByTitle("=")).toBeInTheDocument();
  });
});

describe("check for each button individual input", () => {
  beforeEach(() => {
    useCalculatorStore.getState().updateBlink(false);
    fireEvent.click(screen.getByTitle("AC"));
  });
  test("1 should show on the cview", () => {
    fireEvent.click(screen.getByTitle("1"));
    expect(screen.getByTitle("CView")).toHaveTextContent("1");
  });
  test("/ should show '0' on the cview", () => {
    fireEvent.click(screen.getByTitle("/"));
    expect(screen.getByTitle("CView")).toHaveTextContent("0");
  });
});

describe("check for addition operation", () => {
  beforeEach(() => {
    useCalculatorStore.getState().updateBlink(false);
    fireEvent.click(screen.getByTitle("AC"));
  });
  test("should add two numbers together", () => {
    fireEvent.click(screen.getByTitle("4"));
    fireEvent.click(screen.getByTitle("5"));
    fireEvent.click(screen.getByTitle("+"));
    fireEvent.click(screen.getByTitle("6"));
    fireEvent.click(screen.getByTitle("7"));
    fireEvent.click(screen.getByTitle("="));
    expect(screen.getByTitle("CView")).toHaveTextContent("112");
  });
});
