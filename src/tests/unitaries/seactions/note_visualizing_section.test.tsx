import { describe, test, expect } from "@jest/globals";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import NoteVisualizingSection from "../../../sections/note_visualizing_section/note_visualizing_section";
import {
  NOTE_BODY,
  NOTE_MODEL_OBJECT,
  NOTE_TITLE,
} from "../../../constants/note_constants";

describe("Test Section NoteVisualizingSection", () => {
  test("Test If Section Renders", () => {
    const { getByText } = ReactRenderingAdapter.render(
      <NoteVisualizingSection note={NOTE_MODEL_OBJECT} />,
    );

    expect(getByText(NOTE_TITLE)).toBeTruthy();
    expect(getByText(NOTE_BODY)).toBeTruthy();
  });
});
