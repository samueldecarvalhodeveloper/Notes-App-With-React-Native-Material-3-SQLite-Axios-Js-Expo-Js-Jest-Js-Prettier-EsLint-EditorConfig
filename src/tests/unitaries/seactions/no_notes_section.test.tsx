import { describe, test, expect } from "@jest/globals";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import NoNotesSection from "../../../sections/no_notes_section/no_notes_section";
import { NO_NOTES_LABEL_TEXT } from "../../../constants/user_interface_constants";

describe("Test Section NoNotesSection", () => {
  test("Test If Section Renders", () => {
    const { getByText } = ReactRenderingAdapter.render(<NoNotesSection />);

    expect(getByText(NO_NOTES_LABEL_TEXT)).toBeTruthy();
  });
});
