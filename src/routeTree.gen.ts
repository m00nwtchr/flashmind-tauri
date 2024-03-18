/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as LoginProviderImport } from './routes/login.$provider'
import { Route as AuthenticatedNavImport } from './routes/_authenticated/_nav'
import { Route as AuthenticatedNavIndexImport } from './routes/_authenticated/_nav/index'
import { Route as AuthenticatedNavSettingsImport } from './routes/_authenticated/_nav/settings'
import { Route as AuthenticatedNavCardIdImport } from './routes/_authenticated/_nav/card.$id'

// Create/Update Routes

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const LoginProviderRoute = LoginProviderImport.update({
  path: '/login/$provider',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedNavRoute = AuthenticatedNavImport.update({
  id: '/_nav',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedNavIndexRoute = AuthenticatedNavIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedNavRoute,
} as any)

const AuthenticatedNavSettingsRoute = AuthenticatedNavSettingsImport.update({
  path: '/settings',
  getParentRoute: () => AuthenticatedNavRoute,
} as any)

const AuthenticatedNavCardIdRoute = AuthenticatedNavCardIdImport.update({
  path: '/card/$id',
  getParentRoute: () => AuthenticatedNavRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_nav': {
      preLoaderRoute: typeof AuthenticatedNavImport
      parentRoute: typeof AuthenticatedImport
    }
    '/login/$provider': {
      preLoaderRoute: typeof LoginProviderImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_nav/settings': {
      preLoaderRoute: typeof AuthenticatedNavSettingsImport
      parentRoute: typeof AuthenticatedNavImport
    }
    '/_authenticated/_nav/': {
      preLoaderRoute: typeof AuthenticatedNavIndexImport
      parentRoute: typeof AuthenticatedNavImport
    }
    '/_authenticated/_nav/card/$id': {
      preLoaderRoute: typeof AuthenticatedNavCardIdImport
      parentRoute: typeof AuthenticatedNavImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AuthenticatedRoute.addChildren([
    AuthenticatedNavRoute.addChildren([
      AuthenticatedNavSettingsRoute,
      AuthenticatedNavIndexRoute,
      AuthenticatedNavCardIdRoute,
    ]),
  ]),
  LoginProviderRoute,
])

/* prettier-ignore-end */
