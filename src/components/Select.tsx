import { useState, useRef, useEffect } from "react";
import styles from "./Select.module.css";

export type SelectOption = {
  label: string;
  value: string | number;
};
type SingleSelectProps = {
  multiple?: false;
  value?: SelectOption;
  onChange: (value: SelectOption | undefined) => void;
};
type MultipleSelectProps = {
  multiple: true;
  value: SelectOption[];
  onChange: (value: SelectOption[]) => void;
};
type SelectProps = {
  options: SelectOption[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const clearOptions = () => {
    multiple ? onChange([]) : onChange(undefined);
  };

  const SelectOptions = (option: SelectOption) => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
      if (option !== value) onChange(option);
    }
  };

  const isSelected = (option: SelectOption) => {
    return multiple ? value.includes(option) : option === value;
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target != containerRef.current) return;
      switch (e.code) {
        case "Enter":
        case "Space":
          setOpen((prev) => !prev);
          if (open) SelectOptions(options[0]);
          break;
        case "Escape":
          setOpen(false);
      }
    };
    containerRef.current?.addEventListener("keydown", handler);
    return () => {
      containerRef.current?.removeEventListener("keydown", handler);
    };
  }, [open, options]);

  return (
    <div
      ref={containerRef}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((prev) => !prev)}
      className={styles.container}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  SelectOptions(v);
                }}
                className={styles.badge}
              >
                {v.label}
                <span className={styles["clear-btn"]}>&times;</span>
              </button>
            ))
          : value?.label}
      </span>
      <button
        onClick={(e) => {
          e.stopPropagation();
          clearOptions();
        }}
        className={styles["clear-btn"]}
      >
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${open ? styles.show : " "}`}>
        {options.map((op) => (
          <li
            onClick={() => {
              SelectOptions(op);
            }}
            className={`${styles.option} ${
              isSelected(op) ? styles.selected : " "
            }`}
            key={op.value}
          >
            {op.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
