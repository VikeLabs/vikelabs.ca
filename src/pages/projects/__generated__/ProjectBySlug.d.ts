/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectBySlug
// ====================================================

export interface ProjectBySlug_markdownRemark_frontmatter {
  title: string | null;
  description: string | null;
}

export interface ProjectBySlug_markdownRemark {
  id: string;
  excerpt: string | null;
  html: string | null;
  frontmatter: ProjectBySlug_markdownRemark_frontmatter | null;
}

export interface ProjectBySlug {
  markdownRemark: ProjectBySlug_markdownRemark | null;
}

export interface ProjectBySlugVariables {
  id: string;
}
