import React from 'react';
import * as GiIcons from 'react-icons/gi';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as FaIcons from 'react-icons/fa';
import * as ImIcons from 'react-icons/im';

export const SidebarData = [
  {
    title: 'Overview',
    path: '/overview',
    icon: <AiIcons.AiFillHome />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Purpose',
        path: '/overview/purpose',
        icon: <FaIcons.FaLightbulb />
      },
      {
        title: 'Stakeholders',
        path: '/overview/revenue',
        icon: <GiIcons.GiTeamUpgrade />
      },
      {
        title: 'Team',
        path: '/overview/team',
        icon: <IoIcons.IoIosPeople />
      }
    ]
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: <FaIcons.FaBook />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Dashboard',
        path: '/reports/dashboard',
        icon: <RiIcons.RiDashboardFill/>,
        cName: 'sub-nav'
      },
      {
        title: 'Maps',
        path: '/reports/maps',
        icon: <FaIcons.FaMapMarkedAlt />,
        cName: 'sub-nav'
      },
      {
        title: 'Guidance Notes',
        path: '/reports/guidance',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Documents',
    path: '/docs',
    icon: <RiIcons.RiArchiveDrawerFill />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Mandatory',
        path: '/docs/mandatory',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Templates',
        path: '/docs/templates',
        icon: <ImIcons.ImInsertTemplate />,
        cName: 'sub-nav'
      },
      {
        title: 'Designs',
        path: '/docs/designs',
        icon: <IoIcons.IoMdBuild />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Runway',
    path: '/runway',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Selection',
        path: '/runway/selection',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Gateway Sign-off',
        path: '/runway/gateway',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Guidance Notes',
        path: '/runway/notes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'FWP',
    path: '/fwp',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: '2021/22',
        path: '/fwp/fwp_21',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: '2022/23',
        path: '/fwp/fwp_22',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: '2023/24',
        path: '/fwp/fwp_23',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Quality Assurance',
    path: '/qa',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'QLDC H&S',
        path: '/qa/qldc_hs',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Stantec H&S',
        path: '/qa/stantec_hs',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Standards',
        path: '/qa/standards',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Guidance Notes',
        path: '/qa/notes',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  },
  {
    title: 'Continuous Improvement',
    path: '/ci',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'PACE Repository',
        path: '/ci/pace',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'KPI Dashboard',
        path: '/ci/kpi',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Imp. Opportunities',
        path: '/ci/register',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      }
    ]
  }
];
