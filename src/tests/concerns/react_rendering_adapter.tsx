import { Provider } from "react-native-paper";
import { render } from "@testing-library/react-native";
import { JSX } from "react";

class ReactRenderingAdapter {
  private constructor() {}

  public static render(component: JSX.Element) {
    return render(<Provider>{component}</Provider>);
  }
}

export default ReactRenderingAdapter;
