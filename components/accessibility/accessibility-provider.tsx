"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface AccessibilityContextType {
  isDyslexicFont: boolean;
  fontSize: number;
  toggleDyslexicFont: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
}

const AccessibilityContext = createContext<
  AccessibilityContextType | undefined
>(undefined);

const FONT_SIZES = [1, 1.1, 1.2, 1.3, 1.4, 1.5];

export function AccessibilityProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDyslexicFont, setIsDyslexicFont] = useState(false);
  const [fontSizeIndex, setFontSizeIndex] = useState(0);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedDyslexic = localStorage.getItem("accessibility-dyslexic");
    const savedFontSize = localStorage.getItem("accessibility-font-size");

    if (savedDyslexic === "true") {
      setIsDyslexicFont(true);
    }

    if (savedFontSize) {
      const index = FONT_SIZES.indexOf(parseFloat(savedFontSize));
      if (index !== -1) {
        setFontSizeIndex(index);
      }
    }
  }, []);

  // Apply dyslexic font class to document
  useEffect(() => {
    if (isDyslexicFont) {
      document.documentElement.classList.add("dyslexic");
    } else {
      document.documentElement.classList.remove("dyslexic");
    }
    localStorage.setItem("accessibility-dyslexic", isDyslexicFont.toString());
  }, [isDyslexicFont]);

  // Apply font size to document
  useEffect(() => {
    const fontSize = FONT_SIZES[fontSizeIndex];
    document.documentElement.style.fontSize = `${fontSize * 16}px`;
    localStorage.setItem("accessibility-font-size", fontSize.toString());
  }, [fontSizeIndex]);

  const toggleDyslexicFont = () => {
    setIsDyslexicFont(!isDyslexicFont);
  };

  const increaseFontSize = () => {
    if (fontSizeIndex < FONT_SIZES.length - 1) {
      setFontSizeIndex(fontSizeIndex + 1);
    }
  };

  const decreaseFontSize = () => {
    if (fontSizeIndex > 0) {
      setFontSizeIndex(fontSizeIndex - 1);
    }
  };

  return (
    <AccessibilityContext.Provider
      value={{
        isDyslexicFont,
        fontSize: FONT_SIZES[fontSizeIndex],
        toggleDyslexicFont,
        increaseFontSize,
        decreaseFontSize,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error(
      "useAccessibility must be used within an AccessibilityProvider"
    );
  }
  return context;
}
