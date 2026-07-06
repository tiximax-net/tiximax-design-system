// tweaks-app.jsx — TIXIMAX Design System accent switcher.
// Sets data-accent on <html>; tiximax-deck.css remaps the accent token.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "gold"
}/*EDITMODE-END*/;

function TweaksApp() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-accent", t.accent);
  }, [t.accent]);

  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="アクセントカラー" />
      <TweakColor
        label="差し色"
        value={t.accent === "red" ? "#CD3913" : "#DFA930"}
        options={["#DFA930", "#CD3913"]}
        onChange={(hex) => setTweak("accent", hex === "#CD3913" ? "red" : "gold")}
      />
    </TweaksPanel>
  );
}

ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<TweaksApp />);
