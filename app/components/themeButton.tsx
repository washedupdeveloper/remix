import { ActionIcon, Box, Center, Group, MediaQuery, SegmentedControl, useMantineColorScheme } from '@mantine/core';
import { Moon, Sun } from 'tabler-icons-react';

export function ThemeButton() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Group position='right'>
      <MediaQuery smallerThan={'sm'} styles={{ display: 'none' }}>
        <SegmentedControl
          ml={'md'}
          value={colorScheme}
          onChange={() => {
            toggleColorScheme();
          }}
          data={[
            {
              value: 'light',
              label: (
                <Center>
                  <Sun size={16} />
                  <Box ml={8}>Light</Box>
                </Center>
              ),
            },
            {
              value: 'dark',
              label: (
                <Center>
                  <Moon size={16} />
                  <Box ml={8}>Dark</Box>
                </Center>
              ),
            },
          ]}
        />
      </MediaQuery>

      <MediaQuery largerThan={'sm'} styles={{ display: 'none' }}>
        <ActionIcon
          mr={'md'}
          onClick={() => toggleColorScheme()}
          sx={(theme) => ({
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
          })}
        >
          {colorScheme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
        </ActionIcon>
      </MediaQuery>
    </Group>
  );
}
