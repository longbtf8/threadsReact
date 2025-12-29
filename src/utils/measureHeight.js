export const measureHeight = ({ variable, setHeight }) => {
  const resizeObserver = new ResizeObserver((entries) => {
    const height = entries[0]?.contentRect?.height;
    setHeight(height);
  });
  resizeObserver.observe(variable);
  return () => resizeObserver.disconnect();
};
