import React from "react";

type ButtonGroupProps = {
  options: Record<string, string>;
  selected: string;
  onChange: (newValue: string) => void;
};

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  options,
  selected,
  onChange,
}) => {
  return (
    <div>
      {Object.entries(options).map(([optionId, optionLabel]) => (
        <button
          type="button"
          key={optionId}
          onClick={(e) => {
            e.preventDefault();
            onChange(optionId);
          }}
        >
          {optionLabel}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
