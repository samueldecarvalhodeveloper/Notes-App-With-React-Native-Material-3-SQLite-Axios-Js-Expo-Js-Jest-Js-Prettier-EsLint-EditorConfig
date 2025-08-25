import { describe, test, expect } from "@jest/globals";
import ReactRenderingAdapter from "../../concerns/react_rendering_adapter";
import GreetingAppBar from "../../../components/greeting_app_bar";
import { USER_USERNAME } from "../../../constants/user_constants";
import { TOP_BAR_GREETING_TITLE_TEXT } from "../../../constants/user_interface_constants";

describe("Test Component GreetingAppBar", () => {
  test("Test If Component Renders", () => {
    const { getByText } = ReactRenderingAdapter.render(
      <GreetingAppBar userUsername={USER_USERNAME} />,
    );

    expect(getByText(TOP_BAR_GREETING_TITLE_TEXT(USER_USERNAME))).toBeTruthy();
  });
});
