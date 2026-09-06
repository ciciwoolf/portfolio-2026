import { useTheme } from '../theme/ThemeProvider';

export default function Lights() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <>
      {/* Ambient light - base illumination */}
      <ambientLight
        intensity={isDark ? 0.8 : 0.5}
        color={isDark ? '#4a4a6e' : '#f5f5f5'}
      />

      {/* Window light - sun in light mode, moon in dark mode */}
      <spotLight
        position={[-12, 10, 5]}
        target-position={[0, 0, 0]}
        intensity={isDark ? 3.0 : 4.0}
        angle={Math.PI / 3.5}
        penumbra={0.8}
        color={isDark ? '#c8d5e6' : '#fff4e6'} // Cool moonlight vs warm sunlight
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        distance={30}
      />

      {/* Subtle fill light to soften shadows */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.8 : 1.8}
        color={isDark ? '#04f1f9ff' : '#ffffff'}
      />
    </>
  );
}
