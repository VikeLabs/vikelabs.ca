/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ProjectsPageQuery
// ====================================================

export interface ProjectsPageQuery_allMarkdownRemark_nodes_frontmatter {
  title: string | null;
  description: string | null;
}

export interface ProjectsPageQuery_allMarkdownRemark_nodes {
  frontmatter: ProjectsPageQuery_allMarkdownRemark_nodes_frontmatter | null;
}

export interface ProjectsPageQuery_allMarkdownRemark {
  nodes: ProjectsPageQuery_allMarkdownRemark_nodes[];
}

export interface ProjectsPageQuery {
  allMarkdownRemark: ProjectsPageQuery_allMarkdownRemark;
}
