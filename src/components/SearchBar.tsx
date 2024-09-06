import React from 'react';
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  onClear: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, onClear }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    onSearch(event.target.value);
  };

  const handleClear = () => {
    setInputValue("");
    onClear();
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        height: "100%",
        padding: "1rem",
      }}
    >
      <div style={{ flex: 1 }}>
        <Input
          style={{ width: "95%" }}
          value={inputValue}
          placeholder="Search for movies..."
          onChange={handleChange}
        />
      </div>
      <Button onClick={handleClear} style={{ cursor: "pointer" }} >Clear</Button>
    </div>
  );
};

export default SearchBar;
