/**
 * @jest-environment jsdom
 */
import renderer from "react-test-renderer";

import GradeGradient from "./GradeGradient";

describe("GradGradient", () => {
  it("renders", () => {
    const json = renderer
      .create(
        <GradeGradient data={[{ distance: 5, color: "red" }]} xMax={20} />
      )
      .toJSON();
    expect(json).toMatchInlineSnapshot(`
    <stop
      offset={0.25}
      stopColor="red"
      stopOpacity={1}
    />
  `);
  });

  it("consolidates stops if the same color", () => {
    const data = [
      { distance: 5, color: "red" },
      { distance: 10, color: "red" },
      { distance: 15, color: "red" },
      { distance: 20, color: "red" },
    ];
    const json = renderer
      .create(
        <>
          <GradeGradient data={data} xMax={20} />
        </>
      )
      .toJSON();
    expect(json).toMatchInlineSnapshot(`
    [
      <stop
        offset={0.25}
        stopColor="red"
        stopOpacity={1}
      />,
      <stop
        offset={1}
        stopColor="red"
        stopOpacity={1}
      />,
    ]
  `);
  });
});
