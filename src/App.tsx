import {
  AppShell,
  Header,
  Title,
  Center,
  useMantineTheme,
  Group,
  Switch,
  MantineProvider,
  ColorSchemeProvider,
  ColorScheme,
  Image,
} from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconSun, IconMoonStars } from "@tabler/icons-react";
import Calculator from "./components/Calculator";

export default function App() {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "color-scheme",
    defaultValue: "dark",
  });
  const toggleColorScheme = () =>
    setColorScheme((current) => (current === "dark" ? "light" : "dark"));
  const theme = useMantineTheme();
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider
        theme={{ colorScheme }}
        withGlobalStyles
        withNormalizeCSS
      >
        <AppShell
          padding="md"
          header={
            <Header height={56}>
              <Center
                h={56}
                mx="auto"
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Title
                  order={3}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    height={40}
                    width="auto"
                    fit="contain"
                    radius="md"
                    src="./icon.svg"
                    alt="Logo"
                  />{" "}
                  Reactive Calculator
                </Title>
                <Group position="center" my={30}>
                  <Switch
                    checked={colorScheme === "dark"}
                    onChange={toggleColorScheme}
                    size="lg"
                    onLabel={
                      <IconSun
                        color={theme.white}
                        size="1.25rem"
                        stroke={1.5}
                      />
                    }
                    offLabel={
                      <IconMoonStars
                        color={theme.colors.gray[6]}
                        size="1.25rem"
                        stroke={1.5}
                      />
                    }
                  />
                </Group>
              </Center>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Calculator />
        </AppShell>
      </MantineProvider>
    </ColorSchemeProvider>
  );
}
