export const TextSVGFilter = () => {
  return (
    <svg width={0} height={0} aria-hidden="true">
      <filter id="titleEffects">
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0 1"></feFuncA>
        </feComponentTransfer>
      </filter>
    </svg>
  );
};
