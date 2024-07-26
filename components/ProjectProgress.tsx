import { styled } from "nativewind";
import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import * as Animatable from "react-native-animatable";

const StyledView = styled(View);

export default function Progress({ progress }: { progress: number }) {
  const [width, setWidth] = useState(0);
  const [shouldUseValue, setShouldUseValue] = useState(false);

  const barWidth = 2;
  const gap = 2;

  const bars = Math.floor(width / (barWidth + gap));
  const containerRef = useRef(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShouldUseValue(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <StyledView
      ref={containerRef}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setWidth(width);
      }}
      className="relative flex h-[12px] w-full min-w-4 flex-wrap gap-[2px] overflow-hidden"
    >
      {Array.from(Array(bars)).map((_, index) => {
        const highlight = shouldUseValue ? index / bars < progress / 100 : 0;
        const animation = highlight ? "fadeIn" : "fadeOut";
        const delay = highlight ? index * 24 : 0;

        return (
          <Animatable.View
            key={`bar_${index}`}
            animation={animation}
            delay={delay}
            duration={highlight ? 75 : 300}
            style={[
              styles.bar,
              highlight ? styles.highlightedBar : styles.defaultBar,
            ]}
          />
        );
      })}
    </StyledView>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: "100%",
    width: 2,
    borderRadius: 1,
  },
  highlightedBar: {
    backgroundColor: "rgb(191, 219, 254)", // bg-blue-100
  },
  defaultBar: {
    backgroundColor: "rgba(39, 39, 39, 0.3)", // bg-zinc-900/30
  },
});
