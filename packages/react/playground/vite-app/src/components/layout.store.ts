enum LayoutKeys {
  A = "a",
  B = "b",
  C = "c",
  D = "d",
  E = "e",
  F = "f",
}

enum ActionTypes {
  SET_A_WIDTH = "A_WIDTH",
  SET_A_HEIGHT = "A_HEIGHT",
  SET_B_WIDTH = "B_WIDTH",
  SET_B_HEIGHT = "B_HEIGHT",
  SET_C_WIDTH = "C_WIDTH",
  SET_C_HEIGHT = "C_HEIGHT",
  SET_D_WIDTH = "D_WIDTH",
  SET_D_HEIGHT = "D_HEIGHT",
  SET_E_WIDTH = "E_WIDTH",
  SET_E_HEIGHT = "E_HEIGHT",
  SET_F_WIDTH = "F_WIDTH",
  SET_F_HEIGHT = "F_HEIGHT",
}

type ContainerSizeKeys =
  | "width"
  | "minWidth"
  | "maxWidth"
  | "height"
  | "minHeight"
  | "maxHeight";
type ContainerSize = Record<ContainerSizeKeys, number>;

interface Layout
  extends Record<LayoutKeys, Partial<ContainerSize & { title: string }>> {}

interface Actions {
  type: ActionTypes;
  payload: number;
}

const initState: Layout = {
  a: {
    height: 200,
    minHeight: 200,
    maxHeight: 320,
    title: "A",
  },
  b: {
    width: 320,
    minWidth: 240,
    maxWidth: 640,
    title: "B",
  },
  c: {
    width: 360,
    title: "C",
  },
  d: {
    width: 320,
    minWidth: 240,
    maxWidth: 640,
    title: "D",
  },
  e: {
    height: 320,
    minHeight: 240,
    maxHeight: 400,
    width: 640,
    minWidth: 240,
    maxWidth: 640,
    title: "E",
  },
  f: {
    title: "F",
  },
};

export {
  LayoutKeys,
  ActionTypes,
  type ContainerSizeKeys,
  type Actions,
  type ContainerSize,
  type Layout,
  initState,
};
