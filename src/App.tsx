import { useState } from "react";
import "./App.css";
import Select, { SelectOption } from "./components/Select";

function App() {
  const options = [
    { value: "1", label: "HTML " },
    { value: "2", label: "CSS " },
    { value: "3", label: "JavaScript " },
    { value: "5", label: "React " },
    { value: "6", label: "Next " },
    { value: "7", label: "MongoDB " },
    { value: "8", label: "TypeScript " },
  ];
  const [value, setValue] = useState<SelectOption[]>([options[0]]);
  const [value1, setValue1] = useState<SelectOption | undefined>(options[0]);

  return (
    <>
      <Select
        multiple
        value={value}
        options={options}
        onChange={(o) => setValue(o)}
      />
      <br />
      <Select value={value1} options={options} onChange={(o) => setValue1(o)} />
    </>
  );
}

export default App;
