import { Burger, Container, createStyles, Group, Header, MediaQuery, Paper, Transition } from '@mantine/core';
import { useBooleanToggle } from '@mantine/hooks';
import { NavLink } from '@remix-run/react';
import { ThemeButton } from './themeButton';

const HEADER_HEIGHT = 64;
const HEADER_MARGIN_BOTTOM = HEADER_HEIGHT / 2;

const useStyles = createStyles((theme) => ({
  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',
    fontSize: theme.fontSizes.lg,
  },

  link: {
    display: 'block',
    padding: theme.spacing.sm,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.dark[6],
    fontSize: theme.fontSizes.lg,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
  },

  linkActive: {
    '&, &:hover': {
      backgroundColor:
        theme.colorScheme === 'dark' ? theme.fn.rgba(theme.colors[theme.primaryColor][9], 0.25) : theme.colors[theme.primaryColor][0],
      color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 3 : 7],
    },
  },
}));

interface NavbarProps {
  links: { path: string; label: string }[];
}

export function NavigationBar({ links }: NavbarProps) {
  const [opened, toggleOpened] = useBooleanToggle(false);
  const { classes, cx } = useStyles();

  const navLinks = links.map((link) => (
    <NavLink key={link.label} to={link.path} className={({ isActive }) => (isActive ? cx(classes.link, classes.linkActive) : classes.link)}>
      {link.label}
    </NavLink>
  ));

  return (
    <Header height={HEADER_HEIGHT} mb={HEADER_MARGIN_BOTTOM} className={'relative z-50'}>
      <Container className={'flex justify-between items-center h-full'} fluid={true}>
        <h1>Smartender</h1>
        <MediaQuery smallerThan='sm' styles={{ display: 'none' }}>
          <Group spacing={6}>
            <>{navLinks}</>
            <ThemeButton />
          </Group>
        </MediaQuery>

        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Group>
            <ThemeButton />
            <Burger opened={opened} onClick={() => toggleOpened()} size='md' />
          </Group>
        </MediaQuery>

        <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
          <Transition transition='slide-left' duration={250} mounted={opened}>
            {(styles) => (
              <Paper className={classes.dropdown} withBorder style={styles} onClick={() => toggleOpened(false)}>
                {navLinks}
              </Paper>
            )}
          </Transition>
        </MediaQuery>
      </Container>
    </Header>
  );
}
