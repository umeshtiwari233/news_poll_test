import "react-native";
import React from "react";
import App from "../App";

// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";
it("should first", () => {
  let Homed = renderer.create(<App />).getInstance();
  Homed.onChangeSearch("Umesh");
  expect(Homed.state.searchText).toEqual("Umesh");
});
