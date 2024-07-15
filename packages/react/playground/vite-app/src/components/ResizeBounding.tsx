import ResizeBoundingComponent, { type Props } from "react-resize-bounding";

const ResizeBounding = (props: Props) => {
  return (
    <ResizeBoundingComponent
      {...props}
      options={{
        knob: {
          show: true,
        },
      }}
    >
      {props.children}
    </ResizeBoundingComponent>
  );
};

export default ResizeBounding;
