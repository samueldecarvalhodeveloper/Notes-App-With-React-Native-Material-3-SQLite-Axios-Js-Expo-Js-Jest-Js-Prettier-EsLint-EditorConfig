import { describe, test, expect } from "@jest/globals";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import { LOADING_SECTION_ACCESSIBILITY_HINT } from "../../../constants/user_interface_constants";
import LoadingSection from "../../../sections/loading_section/loading_section";

describe("Test Section LoadingSection", () => {
  test("Test If Section Renders", () => {
    const { getByAccessibilityHint } = ReactRenderingAdapter.render(
      <LoadingSection />,
    );

    expect(
      getByAccessibilityHint(LOADING_SECTION_ACCESSIBILITY_HINT),
    ).toBeTruthy();
  });
});
