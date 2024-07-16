import { useReducer } from "react";

import ResizeBounding from "./ResizeBounding";
import deepmerge from "deepmerge";

import "./InteractiveGrid.scss";

import UIInnerBlock from "@/components/helpers/UIInnerBlock";
import UISizeField from "@/components/helpers/UISizeField";

import {
  type Actions,
  type ContainerSizeKeys,
  initState,
  LayoutKeys,
  ActionTypes,
} from "./layout.store";

import { colors } from "@/components/colors";

const borderStyle = `1px solid ${colors.borderNormal}`;

const layoutReducer = (
  state: typeof initState,
  action: Actions,
): typeof initState => {
  const { type, payload } = action;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sectionKey, propKey] = type.toLowerCase().split("_");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  for (const [_, v] of Object.entries(LayoutKeys)) {
    if (sectionKey === v) {
      return deepmerge(
        state,
        (state[sectionKey][propKey as ContainerSizeKeys] = payload),
      );
    }
  }

  throw new Error("Invalid action name!");
};

const InteractiveGrid = () => {
  const [layout, dispatch] = useReducer(layoutReducer, initState);

  return (
    <main
      className="boundarize-app"
      style={{ background: `${colors.backgroundApp}` }}
    >
      <div className="boundarize-app--container">
        <div
          className="boundarize-app__layout"
          style={{
            background: `${colors.backgroundSecondary}`,
            border: `1px solid ${colors.borderNormal}`,
          }}
        >
          <ResizeBounding
            height={layout.a.height}
            minHeight={layout.a.minHeight}
            maxHeight={layout.a.maxHeight}
            directions="b"
            style={{ borderBottom: borderStyle }}
            updateHeight={(height) => {
              dispatch({ type: ActionTypes.SET_A_HEIGHT, payload: height });
            }}
          >
            <UIInnerBlock title={layout.a.title}>
              <UISizeField
                height={layout.a.height}
                updateHeight={(height) => {
                  layout.a.height = height;
                }}
              />
            </UIInnerBlock>
          </ResizeBounding>
          <ResizeBounding
            directions="''"
            style={{ display: "flex", height: "100%" }}
          >
            <ResizeBounding
              width={layout.b.width}
              min-width={layout.b.minWidth}
              max-width={layout.b.maxWidth}
              directions="'r'"
              style={{ display: "flex", borderRight: borderStyle }}
              updateWidth={(width) => {
                dispatch({ type: ActionTypes.SET_B_WIDTH, payload: width });
              }}
            >
              <UIInnerBlock title={layout.b.title}>
                <UISizeField
                  width={layout.b.width}
                  updateWidth={(width) => {
                    layout.b.width = width;
                  }}
                />
              </UIInnerBlock>
            </ResizeBounding>
            <UIInnerBlock title={layout.c.title}>
              <UISizeField />
            </UIInnerBlock>
            <ResizeBounding
              width={layout.d.width}
              min-width={layout.d.minWidth}
              max-width={layout.d.maxWidth}
              directions="'l'"
              style={{ borderLeft: borderStyle }}
              updateWidth={(width) => {
                dispatch({ type: ActionTypes.SET_D_WIDTH, payload: width });
              }}
            >
              <UIInnerBlock title={layout.d.title}>
                <UISizeField
                  width={layout.d.width}
                  updateWidth={(width) => {
                    layout.d.width = width;
                  }}
                />
              </UIInnerBlock>
            </ResizeBounding>
          </ResizeBounding>
          <ResizeBounding
            height={layout.e.height}
            min-height={layout.e.minHeight}
            max-height={layout.e.maxHeight}
            directions="'t'"
            style={{
              display: "flex",
              width: "100%",
              borderTop: borderStyle,
            }}
            updateHeight={(height) => {
              dispatch({ type: ActionTypes.SET_E_HEIGHT, payload: height });
            }}
          >
            <ResizeBounding
              width={layout.e.width}
              min-width={layout.e.minWidth}
              max-width={layout.e.maxWidth}
              directions="'r'"
              style={{ borderRight: borderStyle }}
              updateWidth={(width) => {
                dispatch({ type: ActionTypes.SET_E_WIDTH, payload: width });
              }}
            >
              <UIInnerBlock title={layout.e.title}>
                <UISizeField
                  width={layout.e.width}
                  height={layout.e.height}
                  updateWidth={(width) => {
                    layout.e.width = width;
                  }}
                  updateHeight={(height) => {
                    layout.e.height = height;
                  }}
                />
              </UIInnerBlock>
            </ResizeBounding>
            <ResizeBounding
              directions="''"
              style={{ display: "flex", width: "100%" }}
            >
              <UIInnerBlock title={layout.f.title}>
                <UISizeField
                  height={layout.e.height}
                  updateHeight={(height) => {
                    dispatch({
                      type: ActionTypes.SET_E_HEIGHT,
                      payload: height,
                    });
                  }}
                />
              </UIInnerBlock>
            </ResizeBounding>
          </ResizeBounding>
        </div>
      </div>
    </main>
  );
};

export default InteractiveGrid;
