// Generate stable random heights for the waveform
const waveformHeights = useMemo(() => Array.from({ length: 20 }, () => Math.random() * 80 + 20), []);
