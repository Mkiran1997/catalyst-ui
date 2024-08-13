'use client'

import { Avatar } from '@/components/avatar'
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown'
import { SignInButton, SignedIn, SignedOut, UserButton, SignOutButton } from '@clerk/nextjs'

import { Navbar, NavbarItem, NavbarSection, NavbarSpacer } from '@/components/navbar'
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar'
import { SidebarLayout } from '@/components/sidebar-layout'

import {
  ArrowRightStartOnRectangleIcon,
  ChevronDownIcon,
  Cog8ToothIcon,
  PlusIcon,
} from '@heroicons/react/16/solid'





function AccountDropdownMenu({ anchor }) {
  return (
    <DropdownMenu className="min-w-64" anchor={anchor}>

      <DropdownItem href="#">
        <ArrowRightStartOnRectangleIcon />
        <DropdownLabel><SignOutButton /></DropdownLabel>
      </DropdownItem>
    </DropdownMenu>
  )
}

export function ApplicationLayout({ events, children }) {
  return (
    <SidebarLayout
      navbar={
        <Navbar>
          <NavbarSpacer />
          <NavbarSection>
            <Dropdown>
              <DropdownButton as={NavbarItem}>
                <Avatar src="/users/erica.jpg" square />
              </DropdownButton>
              <AccountDropdownMenu anchor="bottom end" />
            </Dropdown>
          </NavbarSection>
        </Navbar>
      }
      sidebar={
        <Sidebar>
          <SidebarHeader>
            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <Avatar src="/teams/catalyst.svg" />
                <SidebarLabel>Catalyst</SidebarLabel>
                <ChevronDownIcon />
              </DropdownButton>
              <DropdownMenu className="min-w-80 lg:min-w-64" anchor="bottom start">
                <DropdownItem href="/settings">
                  <Cog8ToothIcon />
                  <DropdownLabel>Settings</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <Avatar slot="icon" src="/teams/catalyst.svg" />
                  <DropdownLabel>Catalyst</DropdownLabel>
                </DropdownItem>
                <DropdownItem href="#">
                  <Avatar slot="icon" initials="BE" className="bg-purple-500 text-white" />
                  <DropdownLabel>Big Events</DropdownLabel>
                </DropdownItem>
                <DropdownDivider />
                <DropdownItem href="#">
                  <PlusIcon />
                  <DropdownLabel>New team&hellip;</DropdownLabel>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </SidebarHeader>

          <SidebarBody>
            <SidebarSection>
              {/* <SidebarItem href="/orders" current={pathname.startsWith('/orders')}>
                <TicketIcon />
                <SidebarLabel>Orders</SidebarLabel>
              </SidebarItem> */}
            </SidebarSection>
          </SidebarBody>

          <SidebarFooter className="max-lg:hidden">

            <Dropdown>
              <DropdownButton as={SidebarItem}>
                <span className="flex min-w-0 items-center gap-3">
                  <SignedOut>
                    <SignInButton />
                  </SignedOut>
                  <SignedIn>
                    <UserButton />
                    <SignOutButton redirectUrl='/'/>
                  </SignedIn>
                </span>
              </DropdownButton>
            </Dropdown>
          </SidebarFooter>
        </Sidebar>
      }
    >
      {children}
    </SidebarLayout>
  )
}
