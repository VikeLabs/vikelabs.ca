export const config = {
  buckets: {
    projects: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/projects`,
  },
  deepDirtyChecker: {
    isDirty: [
      { label: "Title", controlName: "title", deepCheck: false },
      {
        label: "Description",
        controlName: "description",
        deepCheck: true,
        orderMatters: true,
      },
      {
        label: "Open Positions",
        controlName: "recruitingFor",
        deepCheck: true,
        orderMatters: true,
      },
      { label: "Stack", controlName: "stack", deepCheck: true, orderMatters: true },
      { label: "Links", controlName: "links", deepCheck: true, orderMatters: true },
      { label: "Images", controlName: "imageUrls", deepCheck: true, orderMatters: true },
      {
        label: "Team Members",
        controlName: "members",
        deepCheck: true,
        orderMatters: true,
      },
    ],
    needsApproval: [
      { label: "Title", controlName: "title" },
      { label: "Description", controlName: "description", deepCheck: true },
      { label: "Open Positions", controlName: "recruitingFor", deepCheck: true },
      { label: "Stack", controlName: "stack", deepCheck: true },
      { label: "Links", controlName: "links", deepCheck: true },
      { label: "Images", controlName: "imageUrls", deepCheck: true },
      // TODO: Need to add "label" to Members array for ApprovalNotice
      // { label: "Members", controlName: "members", deepCheck: true },
    ],
  },
  formError: {
    title: "Title is required",
    recruiting: "This is required since you set your 'Recruiting?' switch to on.",
    description: "Description is required",
    images: "Images are required",
    members: "Project Members are required",
    submit: "Your changes have some errors. Fix them before continuing.",
  },
};
