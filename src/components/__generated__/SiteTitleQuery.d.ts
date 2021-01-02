/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SiteTitleQuery
// ====================================================

export interface SiteTitleQuery_site_siteMetadata {
  github: string | null;
  discord: string | null;
  linkedin: string | null;
  facebook: string | null;
  instagram: string | null;
  discordInviteURL: string | null;
}

export interface SiteTitleQuery_site {
  siteMetadata: SiteTitleQuery_site_siteMetadata | null;
}

export interface SiteTitleQuery {
  site: SiteTitleQuery_site | null;
}
