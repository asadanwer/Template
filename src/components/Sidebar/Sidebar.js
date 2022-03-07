import React, { useState, useEffect } from "react";
import { Drawer, IconButton, List } from "@material-ui/core";
import {
  Home as HomeIcon,
  NotificationsNone as NotificationsIcon,
  FormatSize as TypographyIcon,
  FilterNone as UIElementsIcon,
  BorderAll as TableIcon,
  QuestionAnswer as SupportIcon,
  LibraryBooks as LibraryIcon,
  HelpOutline as FAQIcon,
  ArrowBack as ArrowBackIcon,
  LockOpen,
  Add,
  ArrowDropDown,
} from "@material-ui/icons";
import { MovingIcon } from "@material-ui/icons";
import { useTheme } from "@material-ui/styles";
import { withRouter } from "react-router-dom";
import classNames from "classnames";

// styles
import useStyles from "./styles";

// components
import SidebarLink from "./components/SidebarLink/SidebarLink";
import Dot from "./components/Dot";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

const structure = [
  { id: 0, label: "Home", link: "/app/dashboard", icon: <HomeIcon /> },
  {
    id: 1,
    label: "My Insight",
    link: "/app/typography",
    icon: <NotificationsIcon />,
    children: [
      { label: "My Dashboard", link: "/app/ui/icons" },
      { label: "My Reports", link: "/app/ui/charts" },
    ],
  },
  { id: 2, label: "Data Shop", link: "/app/tables", icon: <TableIcon /> },
  {
    id: 3,
    label: (
      <>
        <span>
          <>Request Permission</>
          <ArrowDropDown />
        </span>
      </>
    ),
    link: "/app/notifications",
    icon: <LockOpen />,
    children: [
      { label: "Request Dashboard", link: "/app/ui/icons" },
      { label: "Request Reported", link: "/app/ui/charts" },
    ],
  },
  {
    id: 4,
    label: (
      <>
        <>New Request</>
        <ArrowDropDown />
      </>
    ),
    link: "/app/notifications",
    icon: <Add />,
    children: [
      { label: "Request New Dashboard", link: "/app/ui/icons" },
      { label: "Request New Report", link: "/app/ui/charts" },
    ],
  },
  { id: 6, type: "divider" },
  {
    id: 5,
    label: "Ask Us",
    link: "/app/notifications",
    icon: <Add />,
  },
];

function Sidebar({ location }) {
  var classes = useStyles();
  var theme = useTheme();

  // global
  var { isSidebarOpened } = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local
  var [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener("resize", handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener("resize", handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? "permanent" : "temporary"}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: isSidebarOpened,
        [classes.drawerClose]: !isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: isSidebarOpened,
          [classes.drawerClose]: !isSidebarOpened,
        }),
      }}
      open={isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch)}>
          <ArrowBackIcon
            classes={{
              root: classNames(classes.headerIcon, classes.headerIconCollapse),
            }}
          />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          <SidebarLink
            key={link.id}
            location={location}
            isSidebarOpened={isSidebarOpened}
            {...link}
          />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    var windowWidth = window.innerWidth;
    var breakpointWidth = theme.breakpoints.values.md;
    var isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
