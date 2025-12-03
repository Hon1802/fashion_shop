import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import { useDispatch } from 'react-redux';
import { useGetAdminInfo } from '../../../auth/login/hook/useGetAdminInfo';
import { useGetGroupPolicesUser } from '../../../auth/login/hook/useGetGroupPoliciesUser';
import { setPolicies } from '../../../auth/login/login.slice';
import { HEADER, NAVBAR } from '../../../config';
import { setAdminInfo } from '../../../profile/common/reducers/admin-profile.slice';
import useCollapseDrawer from '../../hooks/useCollapseDrawer';
import useDeepEffect from '../../hooks/useDeepEffect';
import DashboardHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';

// ----------------------------------------------------------------------

type MainStyleProps = {
  collapseClick: boolean;
};

const MainStyle = styled('main', {
  shouldForwardProp: (prop) => prop !== 'collapseClick',
})<MainStyleProps>(({ collapseClick, theme }) => ({
  flexGrow: 1,
  paddingTop: HEADER.MOBILE_HEIGHT + 24,
  paddingBottom: HEADER.MOBILE_HEIGHT + 24,
  [theme.breakpoints.up('lg')]: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    paddingBottom: HEADER.DASHBOARD_DESKTOP_HEIGHT + 24,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH}px)`,
    transition: theme.transitions.create('margin-left', {
      duration: theme.transitions.duration.shorter,
    }),
    ...(collapseClick && {
      marginLeft: NAVBAR.DASHBOARD_COLLAPSE_WIDTH,
    }),
  },
}));

// ----------------------------------------------------------------------

export default function DashboardLayout() {
  const dispatch = useDispatch();

  const { useDeepCompareEffect } = useDeepEffect();

  const { collapseClick, isCollapse } = useCollapseDrawer();
  const { data: policies } = useGetGroupPolicesUser();
  const { data: adminInfo } = useGetAdminInfo();

  useDeepCompareEffect(() => {
    if (adminInfo) {
      dispatch(setAdminInfo(adminInfo));
    }
  }, [adminInfo]);

  useDeepCompareEffect(() => {
    const groupPolicies = policies?.groupPolicies || {};
    dispatch(setPolicies(groupPolicies));
  }, [policies]);

  const [open, setOpen] = useState(false);

  return (
    <Box
      sx={{
        display: { lg: 'flex' },
        minHeight: { lg: 1 },
      }}
    >
      <DashboardHeader isCollapse={isCollapse} onOpenSidebar={() => setOpen(true)} />

      <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />

      <MainStyle collapseClick={collapseClick}>
        <Outlet />
      </MainStyle>
    </Box>
  );
}
